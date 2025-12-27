<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\VendorController;
use App\Http\Controllers\Api\ReviewController;

// Authentication Routes
Route::post('/register', [AuthController::class, 'register'])->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class);
Route::post('/login', [AuthController::class, 'login'])->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class);

// Public API Routes
Route::prefix('v1')->group(function () {
    // Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/featured', [ProductController::class, 'featured']);
    Route::get('/products/search', [ProductController::class, 'search']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::get('/categories', [ProductController::class, 'categories']);
    
    // Reviews (public read)
    Route::get('/products/{productId}/reviews', [ReviewController::class, 'index']);
});

// Protected API Routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    Route::prefix('v1')->group(function () {
        // Orders (Customer)
        Route::get('/orders', [OrderController::class, 'index']);
        Route::get('/orders/{id}', [OrderController::class, 'show']);
        Route::post('/orders', [OrderController::class, 'store']);
        Route::patch('/orders/{id}/cancel', [OrderController::class, 'cancel']);
        
        // Reviews (Customer)
        Route::post('/reviews', [ReviewController::class, 'store']);
        Route::patch('/reviews/{id}', [ReviewController::class, 'update']);
        Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
        Route::get('/my-reviews', [ReviewController::class, 'myReviews']);
        
        // Vendor routes
        Route::middleware('vendor')->prefix('vendor')->group(function () {
            Route::get('/dashboard', [VendorController::class, 'dashboard']);
            Route::get('/profile', [VendorController::class, 'profile']);
            Route::patch('/profile', [VendorController::class, 'updateProfile']);
            
            // Vendor Products
            Route::get('/products', [VendorController::class, 'products']);
            Route::post('/products', [VendorController::class, 'storeProduct']);
            Route::patch('/products/{id}', [VendorController::class, 'updateProduct']);
            
            // Vendor Orders
            Route::get('/orders', [VendorController::class, 'orders']);
            Route::patch('/orders/{id}/status', [VendorController::class, 'updateOrderStatus']);
        });
    });
});