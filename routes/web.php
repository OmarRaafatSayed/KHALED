<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SuperAdmin\SuperAdminController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Vendor\VendorController;
use App\Http\Controllers\Vendor\VendorSetupController;
use App\Http\Controllers\Vendor\WalletController;
use App\Http\Controllers\Vendor\MessageController;
use App\Http\Controllers\Vendor\JobController;
use App\Http\Controllers\Auth\AuthController;

// Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    
    // Vendor Setup Routes
    Route::get('/vendor/setup', [VendorSetupController::class, 'show'])->name('vendor.setup');
    Route::post('/vendor/setup', [VendorSetupController::class, 'store']);
    Route::get('/vendor/pending', [VendorSetupController::class, 'pending'])->name('vendor.pending');
});

// Super Admin Routes
Route::middleware(['auth', 'role:super-admin'])->prefix('superadmin')->name('superadmin.')->group(function () {
    Route::get('/dashboard', [SuperAdminController::class, 'dashboard'])->name('dashboard');
    
    // User Management
    Route::get('/users', [SuperAdminController::class, 'users'])->name('users');
    Route::get('/users/create', [SuperAdminController::class, 'createUser'])->name('users.create');
    Route::post('/users', [SuperAdminController::class, 'storeUser'])->name('users.store');
    
    // Vendor Management
    Route::get('/vendors', [SuperAdminController::class, 'vendors'])->name('vendors');
    Route::patch('/vendors/{vendor}/approve', [SuperAdminController::class, 'approveVendor'])->name('vendors.approve');
    Route::patch('/vendors/{vendor}/toggle-status', [SuperAdminController::class, 'toggleVendorStatus'])->name('vendors.toggle-status');
    
    // Subscription Management
    Route::get('/subscriptions', [SuperAdminController::class, 'subscriptions'])->name('subscriptions');
    Route::get('/subscriptions/create', [SuperAdminController::class, 'createSubscription'])->name('subscriptions.create');
    Route::post('/subscriptions', [SuperAdminController::class, 'storeSubscription'])->name('subscriptions.store');
    
    // Financial Reports
    Route::get('/reports/financial', [SuperAdminController::class, 'financialReports'])->name('reports.financial');
    
    // Settings
    Route::get('/settings', [SuperAdminController::class, 'settings'])->name('settings');
    
    // Integrations
    Route::get('/integrations/payment-gateways', [SuperAdminController::class, 'paymentGateways'])->name('integrations.payment-gateways');
    Route::get('/integrations/shipping-providers', [SuperAdminController::class, 'shippingProviders'])->name('integrations.shipping-providers');
    
    // System Settings
    Route::get('/system/settings', [SuperAdminController::class, 'systemSettings'])->name('system.settings');
    Route::patch('/system/settings', [SuperAdminController::class, 'updateSystemSettings'])->name('system.settings.update');
    
    // Content Management
    Route::get('/content/blog-posts', [SuperAdminController::class, 'blogPosts'])->name('content.blog-posts');
    Route::get('/content/static-pages', [SuperAdminController::class, 'staticPages'])->name('content.static-pages');
    Route::get('/content/hero-slides', [SuperAdminController::class, 'heroSlides'])->name('content.hero-slides');
    Route::post('/content/hero-slides/settings', [SuperAdminController::class, 'updateHeroSettings'])->name('content.hero-slides.settings');
    Route::post('/content/hero-slides', [SuperAdminController::class, 'storeHeroSlide'])->name('content.hero-slides.store');
    Route::get('/content/blog-comments', [SuperAdminController::class, 'blogComments'])->name('content.blog-comments');
    
    // Categories Management
    Route::get('/categories', [SuperAdminController::class, 'categories'])->name('categories');
    Route::get('/categories/create', [SuperAdminController::class, 'createCategory'])->name('categories.create');
    Route::post('/categories', [SuperAdminController::class, 'storeCategory'])->name('categories.store');
    Route::get('/categories/{category}/edit', [SuperAdminController::class, 'editCategory'])->name('categories.edit');
    Route::patch('/categories/{category}', [SuperAdminController::class, 'updateCategory'])->name('categories.update');
    Route::delete('/categories/{category}', [SuperAdminController::class, 'deleteCategory'])->name('categories.delete');
    Route::patch('/categories/{category}/toggle', [SuperAdminController::class, 'toggleCategory'])->name('categories.toggle');
    
    // Product Approval
    Route::get('/products/pending', [SuperAdminController::class, 'pendingProducts'])->name('products.pending');
    Route::patch('/products/{product}/approve', [SuperAdminController::class, 'approveProduct'])->name('products.approve');
    Route::patch('/products/{product}/reject', [SuperAdminController::class, 'rejectProduct'])->name('products.reject');
    
    // Jobs Management
    Route::get('/jobs', [SuperAdminController::class, 'jobs'])->name('jobs');
    Route::patch('/jobs/{job}/approve', [SuperAdminController::class, 'approveJob'])->name('jobs.approve');
    Route::patch('/jobs/{job}/reject', [SuperAdminController::class, 'rejectJob'])->name('jobs.reject');
    
    // Wallet Management
    Route::get('/withdrawals', [SuperAdminController::class, 'withdrawalRequests'])->name('withdrawals');
    Route::patch('/withdrawals/{withdrawal}/approve', [SuperAdminController::class, 'approveWithdrawal'])->name('withdrawals.approve');
    Route::patch('/withdrawals/{withdrawal}/reject', [SuperAdminController::class, 'rejectWithdrawal'])->name('withdrawals.reject');
    
    // Product Templates Management
    Route::get('/templates', [SuperAdminController::class, 'productTemplates'])->name('templates.index');
    Route::get('/templates/create', [SuperAdminController::class, 'createTemplate'])->name('templates.create');
    Route::post('/templates', [SuperAdminController::class, 'storeTemplate'])->name('templates.store');
    Route::get('/templates/{template}/edit', [SuperAdminController::class, 'editTemplate'])->name('templates.edit');
    Route::patch('/templates/{template}', [SuperAdminController::class, 'updateTemplate'])->name('templates.update');
    Route::delete('/templates/{template}', [SuperAdminController::class, 'deleteTemplate'])->name('templates.delete');
    
    // Discount Management
    Route::get('/discounts', [SuperAdminController::class, 'discounts'])->name('discounts');
    Route::patch('/discounts/{discount}/toggle', [SuperAdminController::class, 'toggleDiscount'])->name('discounts.toggle');
});

// Admin Routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    
    // Vendor Management
    Route::get('/vendors', [AdminController::class, 'vendors'])->name('vendors');
    Route::get('/vendors/{vendor}', [AdminController::class, 'showVendor'])->name('vendors.show');
    Route::patch('/vendors/{vendor}/approve', [AdminController::class, 'approveVendor'])->name('vendors.approve');
    Route::patch('/vendors/{vendor}/reject', [AdminController::class, 'rejectVendor'])->name('vendors.reject');
    
    // Product Moderation
    Route::get('/products', [AdminController::class, 'products'])->name('products');
    Route::get('/products/{product}', [AdminController::class, 'showProduct'])->name('products.show');
    Route::patch('/products/{product}/approve', [AdminController::class, 'approveProduct'])->name('products.approve');
    Route::patch('/products/{product}/reject', [AdminController::class, 'rejectProduct'])->name('products.reject');
    
    // Order Management
    Route::get('/orders', [AdminController::class, 'orders'])->name('orders');
    Route::get('/orders/{order}', [AdminController::class, 'showOrder'])->name('orders.show');
    Route::patch('/orders/{order}/status', [AdminController::class, 'updateOrderStatus'])->name('orders.update-status');
    
    // Review Management
    Route::get('/reviews', [AdminController::class, 'reviews'])->name('reviews');
    Route::patch('/reviews/{review}/approve', [AdminController::class, 'approveReview'])->name('reviews.approve');
    Route::delete('/reviews/{review}', [AdminController::class, 'rejectReview'])->name('reviews.reject');
});

// Vendor Routes
Route::middleware(['auth', 'vendor'])->prefix('vendor')->name('vendor.')->group(function () {
    Route::get('/dashboard', [VendorController::class, 'dashboard'])->name('dashboard');
    
    // Store Management
    Route::get('/store/settings', [VendorController::class, 'storeSettings'])->name('store.settings');
    Route::patch('/store', [VendorController::class, 'updateStore'])->name('store.update');
    
    // Product Management
    Route::get('/products', [VendorController::class, 'products'])->name('products');
    Route::get('/products/create', [VendorController::class, 'createProduct'])->name('products.create');
    Route::post('/products', [VendorController::class, 'storeProduct'])->name('products.store');
    Route::get('/products/{product}', [VendorController::class, 'showProduct'])->name('products.show');
    Route::get('/products/{product}/edit', [VendorController::class, 'editProduct'])->name('products.edit');
    Route::patch('/products/{product}', [VendorController::class, 'updateProduct'])->name('products.update');
    
    // Order Management
    Route::get('/orders', [VendorController::class, 'orders'])->name('orders');
    Route::get('/orders/{order}', [VendorController::class, 'showOrder'])->name('orders.show');
    Route::patch('/orders/{order}/status', [VendorController::class, 'updateOrderStatus'])->name('orders.update-status');
    
    // Analytics
    Route::get('/analytics', [VendorController::class, 'analytics'])->name('analytics');
    
    // Discounts
    Route::get('/discounts', [VendorController::class, 'discounts'])->name('discounts');
    Route::get('/discounts/create', [VendorController::class, 'createDiscount'])->name('discounts.create');
    Route::post('/discounts', [VendorController::class, 'storeDiscount'])->name('discounts.store');
    Route::get('/discounts/{discount}/edit', [VendorController::class, 'editDiscount'])->name('discounts.edit');
    Route::patch('/discounts/{discount}', [VendorController::class, 'updateDiscount'])->name('discounts.update');
    Route::delete('/discounts/{discount}', [VendorController::class, 'deleteDiscount'])->name('discounts.delete');
    Route::patch('/discounts/{discount}/toggle', [VendorController::class, 'toggleDiscount'])->name('discounts.toggle');
    
    // Product Templates AJAX
    Route::get('/templates/{template}/fields', function(\App\Models\ProductTemplate $template) {
        return response()->json([
            'success' => true,
            'fields' => $template->getFieldsForForm()
        ]);
    })->name('templates.fields');
    
    // Reviews Management
    Route::get('/reviews', [VendorController::class, 'reviews'])->name('reviews');
    Route::patch('/reviews/{review}/approve', [VendorController::class, 'approveReview'])->name('reviews.approve');
    Route::post('/reviews/{review}/reply', [VendorController::class, 'replyToReview'])->name('reviews.reply');
    
    // Notifications
    Route::get('/notifications', [VendorController::class, 'notifications'])->name('notifications');
    Route::patch('/notifications/mark-read', [VendorController::class, 'markNotificationsRead'])->name('notifications.mark-read');
    
    // Subscription Management
    Route::get('/subscription', [VendorController::class, 'subscription'])->name('subscription');
    Route::post('/subscription/upgrade', [VendorController::class, 'upgradeSubscription'])->name('subscription.upgrade');
    
    // Financial Reports
    Route::get('/reports', [VendorController::class, 'reports'])->name('reports');
    
    // Blog Management
    Route::get('/blog', [VendorController::class, 'blog'])->name('blog');
    Route::get('/blog/create', [VendorController::class, 'createBlogPost'])->name('blog.create');
    Route::post('/blog', [VendorController::class, 'storeBlogPost'])->name('blog.store');
    Route::get('/blog/{post}/edit', [VendorController::class, 'editBlogPost'])->name('blog.edit');
    Route::patch('/blog/{post}', [VendorController::class, 'updateBlogPost'])->name('blog.update');
    Route::delete('/blog/{post}', [VendorController::class, 'deleteBlogPost'])->name('blog.delete');
    
    // Wallet Management
    Route::get('/wallet', [WalletController::class, 'index'])->name('wallet');
    Route::get('/wallet/withdrawal', [WalletController::class, 'requestWithdrawal'])->name('wallet.withdrawal');
    Route::post('/wallet/withdrawal', [WalletController::class, 'submitWithdrawal'])->name('wallet.withdrawal.submit');
    Route::get('/wallet/withdrawals', [WalletController::class, 'withdrawalHistory'])->name('wallet.withdrawals');
    
    // Messages
    Route::get('/messages', [MessageController::class, 'index'])->name('messages');
    Route::get('/messages/{user}', [MessageController::class, 'show'])->name('messages.show');
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');
    Route::get('/messages/unread/count', [MessageController::class, 'unreadCount'])->name('messages.unread-count');
    
    // Jobs Management
    Route::get('/jobs', [JobController::class, 'index'])->name('jobs');
    Route::get('/jobs/create', [JobController::class, 'create'])->name('jobs.create');
    Route::post('/jobs', [JobController::class, 'store'])->name('jobs.store');
    Route::get('/jobs/{job}', [JobController::class, 'show'])->name('jobs.show');
    Route::get('/jobs/{job}/edit', [JobController::class, 'edit'])->name('jobs.edit');
    Route::patch('/jobs/{job}', [JobController::class, 'update'])->name('jobs.update');
    Route::delete('/jobs/{job}', [JobController::class, 'destroy'])->name('jobs.destroy');
    Route::patch('/jobs/{job}/toggle-status', [JobController::class, 'toggleStatus'])->name('jobs.toggle-status');
});

// Default Dashboard Route (will redirect based on user role)
Route::middleware('auth')->get('/', function () {
    $user = auth()->user();
    
    if ($user->isSuperAdmin()) {
        return redirect()->route('superadmin.dashboard');
    } elseif ($user->isAdmin()) {
        return redirect()->route('admin.dashboard');
    } elseif ($user->isVendor()) {
        return redirect()->route('vendor.dashboard');
    }
    
    return view('pages.dashboard.ecommerce', ['title' => 'Dashboard']);
})->name('dashboard');

// Original TailAdmin Routes (for demo purposes)
Route::prefix('demo')->group(function () {
    // calender pages
    Route::get('/calendar', function () {
        return view('pages.calender', ['title' => 'Calendar']);
    })->name('demo.calendar');
    
    // profile pages
    Route::get('/profile', function () {
        return view('pages.profile', ['title' => 'Profile']);
    })->name('demo.profile');
    
    // form pages
    Route::get('/form-elements', function () {
        return view('pages.form.form-elements', ['title' => 'Form Elements']);
    })->name('demo.form-elements');
    
    // tables pages
    Route::get('/basic-tables', function () {
        return view('pages.tables.basic-tables', ['title' => 'Basic Tables']);
    })->name('demo.basic-tables');
    
    // pages
    Route::get('/blank', function () {
        return view('pages.blank', ['title' => 'Blank']);
    })->name('demo.blank');
    
    // error pages
    Route::get('/error-404', function () {
        return view('pages.errors.error-404', ['title' => 'Error 404']);
    })->name('demo.error-404');
    
    // chart pages
    Route::get('/line-chart', function () {
        return view('pages.chart.line-chart', ['title' => 'Line Chart']);
    })->name('demo.line-chart');
    
    Route::get('/bar-chart', function () {
        return view('pages.chart.bar-chart', ['title' => 'Bar Chart']);
    })->name('demo.bar-chart');
    
    // ui elements pages
    Route::get('/alerts', function () {
        return view('pages.ui-elements.alerts', ['title' => 'Alerts']);
    })->name('demo.alerts');
    
    Route::get('/avatars', function () {
        return view('pages.ui-elements.avatars', ['title' => 'Avatars']);
    })->name('demo.avatars');
    
    Route::get('/badge', function () {
        return view('pages.ui-elements.badges', ['title' => 'Badges']);
    })->name('demo.badges');
    
    Route::get('/buttons', function () {
        return view('pages.ui-elements.buttons', ['title' => 'Buttons']);
    })->name('demo.buttons');
    
    Route::get('/image', function () {
        return view('pages.ui-elements.images', ['title' => 'Images']);
    })->name('demo.images');
    
    Route::get('/videos', function () {
        return view('pages.ui-elements.videos', ['title' => 'Videos']);
    })->name('demo.videos');
});