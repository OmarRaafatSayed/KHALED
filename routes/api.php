<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\VendorController;
use App\Http\Controllers\Api\ProductTemplateController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\DiscountController;
use App\Http\Controllers\Api\NotificationController;

// Public API Routes
Route::prefix('v1')->group(function () {
    // Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/featured', [ProductController::class, 'featured']);
    Route::get('/products/{product}', [ProductController::class, 'show']);
    Route::get('/categories', [ProductController::class, 'categories']);
    
    // Vendors
    Route::get('/vendors', [VendorController::class, 'index']);
    Route::get('/vendors/{vendor}', [VendorController::class, 'show']);
    Route::get('/vendors/{vendor}/products', [VendorController::class, 'products']);
    
    // Product Templates
    Route::get('/templates', [ProductTemplateController::class, 'index']);
    Route::get('/templates/{template}', [ProductTemplateController::class, 'show']);
    Route::get('/templates/{template}/fields', [ProductTemplateController::class, 'getFields']);
    
    // Reviews
    Route::get('/reviews', [ReviewController::class, 'index']);
    
    // Discounts
    Route::get('/discounts/active', [DiscountController::class, 'getActiveDiscounts']);
    Route::post('/discounts/validate', [DiscountController::class, 'validateCode']);
});

// Protected API Routes
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    // User info
    Route::get('/user', function (Request $request) {
        return response()->json([
            'success' => true,
            'data' => $request->user()->load('roles')
        ]);
    });
    
    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
    Route::patch('/orders/{order}/cancel', [OrderController::class, 'cancel']);
    
    // Reviews
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::post('/reviews/{review}/helpful', [ReviewController::class, 'addHelpfulVote']);
    Route::post('/reviews/{review}/reply', [ReviewController::class, 'reply']);
    
    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);
    Route::patch('/notifications/{notification}/read', [NotificationController::class, 'markAsRead']);
    Route::patch('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead']);
});

// Vendor API Routes
Route::middleware(['auth:sanctum', 'vendor'])->prefix('v1/vendor')->group(function () {
    // Vendor dashboard stats
    Route::get('/stats', function () {
        $vendor = auth()->user()->vendor;
        
        $stats = [
            'total_products' => $vendor->products()->count(),
            'active_products' => $vendor->products()->where('status', 'active')->count(),
            'draft_products' => $vendor->products()->where('status', 'draft')->count(),
            'total_orders' => $vendor->orders()->count(),
            'pending_orders' => $vendor->orders()->where('status', 'pending')->count(),
            'monthly_sales' => $vendor->orders()
                ->where('payment_status', 'paid')
                ->whereMonth('created_at', now()->month)
                ->sum('total_amount'),
        ];
        
        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    });
    
    // Vendor orders
    Route::get('/orders', function (Request $request) {
        $vendor = auth()->user()->vendor;
        
        $orders = $vendor->orders()
            ->with(['user', 'items.product'])
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
    });
});

// Admin API Routes
Route::middleware(['auth:sanctum', 'role:admin,super-admin'])->prefix('v1/admin')->group(function () {
    // Admin dashboard stats
    Route::get('/stats', function () {
        $stats = [
            'pending_vendors' => \App\Models\Vendor::where('is_approved', false)->count(),
            'active_vendors' => \App\Models\Vendor::where('is_active', true)->count(),
            'pending_products' => \App\Models\Product::where('status', 'draft')->count(),
            'active_products' => \App\Models\Product::where('status', 'active')->count(),
            'total_orders' => \App\Models\Order::count(),
            'pending_orders' => \App\Models\Order::where('status', 'pending')->count(),
        ];
        
        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    });
    
    // Pending vendors
    Route::get('/vendors/pending', function () {
        $vendors = \App\Models\Vendor::with('user')
            ->where('is_approved', false)
            ->latest()
            ->paginate(20);
            
        return response()->json([
            'success' => true,
            'data' => $vendors->items(),
            'pagination' => [
                'current_page' => $vendors->currentPage(),
                'last_page' => $vendors->lastPage(),
                'per_page' => $vendors->perPage(),
                'total' => $vendors->total(),
            ]
        ]);
    });
    
    // Pending products
    Route::get('/products/pending', function () {
        $products = \App\Models\Product::with(['vendor.user', 'category'])
            ->where('status', 'draft')
            ->latest()
            ->paginate(20);
            
        return response()->json([
            'success' => true,
            'data' => $products->items(),
            'pagination' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ]
        ]);
    });
});