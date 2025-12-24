<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use App\Models\ProductReview;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'pending_vendors' => Vendor::where('is_approved', false)->count(),
            'active_vendors' => Vendor::where('is_active', true)->count(),
            'pending_products' => Product::where('status', 'draft')->count(),
            'active_products' => Product::where('status', 'active')->count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'processing_orders' => Order::where('status', 'processing')->count(),
        ];

        $pendingVendors = Vendor::with('user')
            ->where('is_approved', false)
            ->latest()
            ->take(5)
            ->get();

        $pendingProducts = Product::with(['vendor.user', 'category'])
            ->where('status', 'draft')
            ->latest()
            ->take(10)
            ->get();

        return view('admin.dashboard', compact('stats', 'pendingVendors', 'pendingProducts'));
    }

    // Vendor Management
    public function vendors()
    {
        $vendors = Vendor::with(['user', 'subscription'])
            ->when(request('status'), function($query, $status) {
                if ($status === 'pending') {
                    return $query->where('is_approved', false);
                } elseif ($status === 'active') {
                    return $query->where('is_approved', true)->where('is_active', true);
                } elseif ($status === 'inactive') {
                    return $query->where('is_active', false);
                }
            })
            ->paginate(20);

        return view('admin.vendors.index', compact('vendors'));
    }

    public function showVendor(Vendor $vendor)
    {
        $vendor->load(['user', 'subscription', 'products', 'orders']);
        return view('admin.vendors.show', compact('vendor'));
    }

    public function approveVendor(Vendor $vendor)
    {
        $vendor->update(['is_approved' => true]);
        
        // إرسال إشعار للتاجر
        // Notification logic here
        
        return back()->with('success', 'Vendor approved successfully');
    }

    public function rejectVendor(Vendor $vendor, Request $request)
    {
        $request->validate(['reason' => 'required|string']);
        
        $vendor->update([
            'is_approved' => false,
            'is_active' => false
        ]);
        
        // إرسال إشعار بسبب الرفض
        // Notification logic here
        
        return back()->with('success', 'Vendor rejected');
    }

    // Product Moderation
    public function products()
    {
        $products = Product::with(['vendor.user', 'category'])
            ->when(request('status'), function($query, $status) {
                return $query->where('status', $status);
            })
            ->when(request('vendor'), function($query, $vendorId) {
                return $query->where('vendor_id', $vendorId);
            })
            ->paginate(20);

        $vendors = Vendor::with('user')->get();
        
        return view('admin.products.index', compact('products', 'vendors'));
    }

    public function showProduct(Product $product)
    {
        $product->load(['vendor.user', 'category', 'variants', 'reviews.user']);
        return view('admin.products.show', compact('product'));
    }

    public function approveProduct(Product $product)
    {
        $product->update(['status' => 'active']);
        return back()->with('success', 'Product approved successfully');
    }

    public function rejectProduct(Product $product, Request $request)
    {
        $request->validate(['reason' => 'required|string']);
        
        $product->update(['status' => 'inactive']);
        
        // إرسال إشعار للتاجر بسبب الرفض
        // Notification logic here
        
        return back()->with('success', 'Product rejected');
    }

    // Order Management
    public function orders()
    {
        $orders = Order::with(['user', 'vendor.user', 'items.product'])
            ->when(request('status'), function($query, $status) {
                return $query->where('status', $status);
            })
            ->when(request('vendor'), function($query, $vendorId) {
                return $query->where('vendor_id', $vendorId);
            })
            ->latest()
            ->paginate(20);

        $vendors = Vendor::with('user')->get();
        
        return view('admin.orders.index', compact('orders', 'vendors'));
    }

    public function showOrder(Order $order)
    {
        $order->load(['user', 'vendor.user', 'items.product']);
        return view('admin.orders.show', compact('order'));
    }

    public function updateOrderStatus(Order $order, Request $request)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,processing,shipped,delivered,cancelled'
        ]);

        $order->update(['status' => $request->status]);
        
        if ($request->status === 'shipped') {
            $order->update(['shipped_at' => now()]);
        } elseif ($request->status === 'delivered') {
            $order->update(['delivered_at' => now()]);
        }

        return back()->with('success', 'Order status updated successfully');
    }

    // Review Management
    public function reviews()
    {
        $reviews = ProductReview::with(['product', 'user'])
            ->when(request('status') === 'pending', function($query) {
                return $query->where('is_approved', false);
            })
            ->when(request('status') === 'approved', function($query) {
                return $query->where('is_approved', true);
            })
            ->latest()
            ->paginate(20);

        return view('admin.reviews.index', compact('reviews'));
    }

    public function approveReview(ProductReview $review)
    {
        $review->update(['is_approved' => true]);
        return back()->with('success', 'Review approved successfully');
    }

    public function rejectReview(ProductReview $review)
    {
        $review->delete();
        return back()->with('success', 'Review rejected and deleted');
    }
}