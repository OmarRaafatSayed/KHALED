<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\Order;
use App\Models\Vendor;
use Illuminate\Http\Request;
use App\Services\MediaService;

class VendorController extends BaseApiController
{
    protected MediaService $mediaService;

    public function __construct(MediaService $mediaService)
    {
        $this->mediaService = $mediaService;
    }

    public function dashboard(Request $request)
    {
        $vendor = $request->user()->vendor;

        $stats = [
            'total_products' => $vendor->products()->count(),
            'active_products' => $vendor->products()->where('status', 'active')->count(),
            'pending_orders' => $vendor->orders()->where('status', 'pending')->count(),
            'monthly_sales' => $vendor->orders()
                ->where('payment_status', 'paid')
                ->whereMonth('created_at', now()->month)
                ->sum('total_amount'),
            'total_revenue' => $vendor->orders()
                ->where('payment_status', 'paid')
                ->sum('total_amount')
        ];

        return $this->success($stats, 'Dashboard data retrieved successfully');
    }

    public function products(Request $request)
    {
        $vendor = $request->user()->vendor;
        
        $products = $vendor->products()
            ->with(['category', 'variants'])
            ->when($request->status, function($query, $status) {
                return $query->where('status', $status);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return $this->paginated($products, 'Products retrieved successfully');
    }

    public function storeProduct(Request $request)
    {
        $vendor = $request->user()->vendor;

        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0.01',
            'compare_price' => 'nullable|numeric|min:0|gt:price',
            'quantity' => 'required|integer|min:0',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $slug = \Illuminate\Support\Str::slug($request->name) . '-' . \Illuminate\Support\Str::random(6);
        
        $images = [];
        if ($request->hasFile('images')) {
            $images = $this->mediaService->uploadProductImages($request->file('images'), $slug);
        }

        $product = $vendor->products()->create([
            'name' => $request->name,
            'slug' => $slug,
            'category_id' => $request->category_id,
            'description' => $request->description,
            'short_description' => $request->short_description,
            'sku' => 'SKU-' . strtoupper(\Illuminate\Support\Str::random(8)),
            'price' => $request->price,
            'compare_price' => $request->compare_price,
            'quantity' => $request->quantity,
            'images' => $images,
            'status' => 'pending'
        ]);

        return $this->success($product, 'Product created successfully', 201);
    }

    public function updateProduct($id, Request $request)
    {
        $vendor = $request->user()->vendor;
        $product = $vendor->products()->findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0.01',
            'compare_price' => 'nullable|numeric|min:0|gt:price',
            'quantity' => 'required|integer|min:0'
        ]);

        $product->update($request->only([
            'name', 'category_id', 'description', 'short_description',
            'price', 'compare_price', 'quantity'
        ]));

        return $this->success($product, 'Product updated successfully');
    }

    public function orders(Request $request)
    {
        $vendor = $request->user()->vendor;
        
        $orders = $vendor->orders()
            ->with(['user', 'items.product'])
            ->when($request->status, function($query, $status) {
                return $query->where('status', $status);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return $this->paginated($orders, 'Orders retrieved successfully');
    }

    public function updateOrderStatus($id, Request $request)
    {
        $vendor = $request->user()->vendor;
        $order = $vendor->orders()->findOrFail($id);

        $request->validate([
            'status' => 'required|in:confirmed,processing,shipped,delivered'
        ]);

        $order->update(['status' => $request->status]);

        if ($request->status === 'shipped') {
            $order->update(['shipped_at' => now()]);
        } elseif ($request->status === 'delivered') {
            $order->update(['delivered_at' => now()]);
        }

        return $this->success($order, 'Order status updated successfully');
    }

    public function profile(Request $request)
    {
        $vendor = $request->user()->vendor->load('subscription');
        return $this->success($vendor, 'Vendor profile retrieved successfully');
    }

    public function updateProfile(Request $request)
    {
        $vendor = $request->user()->vendor;

        $request->validate([
            'store_name' => 'required|string|max:255',
            'store_description' => 'nullable|string',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'country' => 'nullable|string'
        ]);

        $vendor->update($request->only([
            'store_name', 'store_description', 'phone',
            'address', 'city', 'country'
        ]));

        return $this->success($vendor, 'Profile updated successfully');
    }
}