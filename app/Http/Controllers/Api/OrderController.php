<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = auth()->user()->orders()
            ->with(['vendor.user', 'items.product'])
            ->when($request->status, function($query, $status) {
                return $query->where('status', $status);
            })
            ->latest()
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $orders->items(),
            'pagination' => [
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.variant_id' => 'nullable|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|array',
            'billing_address' => 'required|array',
        ]);

        $subtotal = 0;
        $orderItems = [];

        // Calculate totals and prepare order items
        foreach ($request->items as $item) {
            $product = Product::find($item['product_id']);
            
            if ($product->status !== 'active') {
                return response()->json([
                    'success' => false,
                    'message' => "Product {$product->name} is not available"
                ], 400);
            }

            $price = $product->price;
            $total = $price * $item['quantity'];
            $subtotal += $total;

            $orderItems[] = [
                'product_id' => $product->id,
                'product_variant_id' => $item['variant_id'] ?? null,
                'quantity' => $item['quantity'],
                'price' => $price,
                'total' => $total,
                'product_snapshot' => [
                    'name' => $product->name,
                    'price' => $product->price,
                    'images' => $product->images,
                ]
            ];
        }

        // Group by vendor
        $vendorOrders = [];
        foreach ($orderItems as $item) {
            $product = Product::find($item['product_id']);
            $vendorId = $product->vendor_id;
            
            if (!isset($vendorOrders[$vendorId])) {
                $vendorOrders[$vendorId] = [
                    'items' => [],
                    'subtotal' => 0
                ];
            }
            
            $vendorOrders[$vendorId]['items'][] = $item;
            $vendorOrders[$vendorId]['subtotal'] += $item['total'];
        }

        $createdOrders = [];

        // Create separate orders for each vendor
        foreach ($vendorOrders as $vendorId => $vendorOrder) {
            $order = Order::create([
                'user_id' => auth()->id(),
                'vendor_id' => $vendorId,
                'order_number' => 'ORD-' . strtoupper(Str::random(8)),
                'status' => 'pending',
                'payment_status' => 'pending',
                'shipping_status' => 'pending',
                'subtotal' => $vendorOrder['subtotal'],
                'tax_amount' => 0,
                'shipping_amount' => 0,
                'discount_amount' => 0,
                'total_amount' => $vendorOrder['subtotal'],
                'currency' => 'USD',
                'shipping_address' => $request->shipping_address,
                'billing_address' => $request->billing_address,
            ]);

            // Create order items
            foreach ($vendorOrder['items'] as $item) {
                $order->items()->create($item);
            }

            $createdOrders[] = $order->load(['vendor.user', 'items.product']);
        }

        return response()->json([
            'success' => true,
            'message' => 'Orders created successfully',
            'data' => $createdOrders
        ], 201);
    }

    public function show(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }

        $order->load(['vendor.user', 'items.product']);

        return response()->json([
            'success' => true,
            'data' => $order
        ]);
    }

    public function cancel(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }

        if (!in_array($order->status, ['pending', 'confirmed'])) {
            return response()->json([
                'success' => false,
                'message' => 'Order cannot be cancelled'
            ], 400);
        }

        $order->update(['status' => 'cancelled']);

        return response()->json([
            'success' => true,
            'message' => 'Order cancelled successfully'
        ]);
    }
}