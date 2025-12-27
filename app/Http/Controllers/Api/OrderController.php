<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends BaseApiController
{
    public function index(Request $request)
    {
        $orders = Order::with(['items.product', 'vendor.user'])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return $this->paginated($orders, 'Orders retrieved successfully');
    }

    public function show($id, Request $request)
    {
        $order = Order::with(['items.product', 'vendor.user'])
            ->where('user_id', $request->user()->id)
            ->findOrFail($id);

        return $this->success($order, 'Order retrieved successfully');
    }

    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.variant_id' => 'nullable|exists:product_variants,id',
            'shipping_address' => 'required|array',
            'payment_method' => 'required|string'
        ]);

        DB::beginTransaction();
        try {
            $totalAmount = 0;
            $orderItems = [];

            // Calculate total and prepare items
            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                if ($product->quantity < $item['quantity']) {
                    return $this->error("Insufficient stock for product: {$product->name}");
                }

                $price = $product->price;
                $subtotal = $price * $item['quantity'];
                $totalAmount += $subtotal;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $price,
                    'variant_id' => $item['variant_id'] ?? null
                ];

                // Update product quantity
                $product->decrement('quantity', $item['quantity']);
            }

            // Create order
            $order = Order::create([
                'user_id' => $request->user()->id,
                'vendor_id' => Product::find($request->items[0]['product_id'])->vendor_id,
                'order_number' => 'ORD-' . strtoupper(uniqid()),
                'status' => 'pending',
                'payment_status' => 'pending',
                'payment_method' => $request->payment_method,
                'subtotal' => $totalAmount,
                'tax_amount' => $totalAmount * 0.1, // 10% tax
                'shipping_cost' => 10, // Fixed shipping
                'total_amount' => $totalAmount + ($totalAmount * 0.1) + 10,
                'shipping_address' => $request->shipping_address,
                'billing_address' => $request->billing_address ?? $request->shipping_address
            ]);

            // Create order items
            foreach ($orderItems as $item) {
                $order->items()->create($item);
            }

            DB::commit();

            return $this->success(
                $order->load(['items.product', 'vendor.user']),
                'Order created successfully',
                201
            );

        } catch (\Exception $e) {
            DB::rollback();
            return $this->error('Failed to create order: ' . $e->getMessage());
        }
    }

    public function cancel($id, Request $request)
    {
        $order = Order::where('user_id', $request->user()->id)
            ->where('status', 'pending')
            ->findOrFail($id);

        $order->update(['status' => 'cancelled']);

        // Restore product quantities
        foreach ($order->items as $item) {
            $item->product->increment('quantity', $item->quantity);
        }

        return $this->success($order, 'Order cancelled successfully');
    }
}