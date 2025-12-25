<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductTemplate;
use App\Models\Order;
use App\Models\Category;
use App\Models\Vendor;
use App\Services\ProductTemplateService;
use App\Services\MediaService;
use App\Services\DiscountService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VendorController extends Controller
{
    protected ProductTemplateService $templateService;
    protected MediaService $mediaService;
    protected DiscountService $discountService;
    protected NotificationService $notificationService;

    public function __construct(
        ProductTemplateService $templateService, 
        MediaService $mediaService,
        DiscountService $discountService,
        NotificationService $notificationService
    ) {
        $this->templateService = $templateService;
        $this->mediaService = $mediaService;
        $this->discountService = $discountService;
        $this->notificationService = $notificationService;
    }
    public function dashboard()
    {
        $vendor = auth()->user()->vendor;
        $wallet = $vendor->wallet ?? $vendor->wallet()->create();
        
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
            'products_left' => $vendor->subscription->product_limit - $vendor->products()->count(),
            'unread_notifications' => \App\Models\Notification::where('user_id', auth()->id())
                ->where('is_read', false)
                ->count(),
            'pending_reviews' => \App\Models\ProductReview::whereHas('product', function($q) use ($vendor) {
                $q->where('vendor_id', $vendor->id);
            })->where('is_approved', false)->count(),
            'subscription_expires_in' => $vendor->subscription_expires_at->diffInDays(now()),
            'subscription_expired' => $vendor->subscription_expires_at->isPast(),
            'wallet_balance' => $wallet->balance,
            'pending_balance' => $wallet->pending_balance,
            'total_earnings' => $wallet->total_earnings,
            'unread_messages' => \App\Models\Message::where('receiver_id', auth()->id())
                ->where('is_read', false)
                ->count(),
            'active_jobs' => $vendor->jobs()->where('status', 'active')->count(),
        ];

        $recentOrders = $vendor->orders()
            ->with(['user', 'items.product'])
            ->latest()
            ->take(10)
            ->get();

        $topProducts = $vendor->products()
            ->withCount('orderItems')
            ->orderBy('order_items_count', 'desc')
            ->take(5)
            ->get();

        return view('vendor.dashboard', compact('stats', 'recentOrders', 'topProducts'));
    }

    // Store Management
    public function storeSettings()
    {
        $vendor = auth()->user()->vendor;
        return view('vendor.store.settings', compact('vendor'));
    }

    public function updateStore(Request $request)
    {
        $vendor = auth()->user()->vendor;
        
        $request->validate([
            'store_name' => 'required|string|max:255',
            'store_description' => 'nullable|string',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'country' => 'nullable|string',
        ]);

        $vendor->update($request->only([
            'store_name', 'store_description', 'phone', 
            'address', 'city', 'country'
        ]));

        return back()->with('success', 'Store settings updated successfully');
    }

    // Product Management
    public function products()
    {
        $vendor = auth()->user()->vendor;
        
        $products = $vendor->products()
            ->with(['category', 'variants'])
            ->when(request('status'), function($query, $status) {
                return $query->where('status', $status);
            })
            ->when(request('category'), function($query, $categoryId) {
                return $query->where('category_id', $categoryId);
            })
            ->paginate(20);

        $categories = Category::where('is_active', true)->get();
        
        return view('vendor.products.index', compact('products', 'categories'));
    }

    public function createProduct()
    {
        $vendor = auth()->user()->vendor;
        
        // التحقق من حد المنتجات
        if ($vendor->subscription->product_limit > 0 && 
            $vendor->products()->count() >= $vendor->subscription->product_limit) {
            return redirect()->route('vendor.subscription')
                ->with('error', 'You have reached your product limit. Please upgrade your subscription.');
        }

        $categories = Category::where('is_active', true)->get();
        $templates = ProductTemplate::where('is_active', true)->orderBy('sort_order')->get();
        
        return view('vendor.products.create', compact('categories', 'templates'));
    }

    public function storeProduct(Request $request)
    {
        $vendor = auth()->user()->vendor;
        
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'template_id' => 'nullable|exists:product_templates,id',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0.01',
            'compare_price' => 'nullable|numeric|min:0|gt:price',
            'quantity' => 'required|integer|min:0',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'variant_options' => 'array'
        ]);

        $slug = Str::slug($request->name) . '-' . Str::random(6);
        
        // معالجة الصور
        $images = [];
        if ($request->hasFile('images')) {
            $images = $this->mediaService->uploadProductImages($request->file('images'), $slug);
        }

        // معالجة بيانات المتغيرات
        $variantOptionsData = [];
        if ($request->has('variant_options')) {
            foreach ($request->variant_options as $index => $option) {
                if (!empty($option['values_text'])) {
                    $values = [];
                    $lines = explode("\n", $option['values_text']);
                    foreach ($lines as $line) {
                        $line = trim($line);
                        if (!empty($line)) {
                            $values[] = [
                                'key' => strtolower(str_replace(' ', '_', $line)),
                                'label' => $line
                            ];
                        }
                    }
                    
                    if (!empty($values)) {
                        $variantOptionsData[] = [
                            'name' => $option['name'],
                            'type' => $option['type'],
                            'values' => $values,
                            'is_required' => isset($option['is_required']),
                            'sort_order' => $index
                        ];
                    }
                }
            }
        }

        $productData = [
            'name' => $request->name,
            'slug' => $slug,
            'category_id' => $request->category_id,
            'template_id' => $request->template_id,
            'description' => $request->description,
            'short_description' => $request->short_description,
            'sku' => 'SKU-' . strtoupper(Str::random(8)),
            'price' => $request->price,
            'compare_price' => $request->compare_price,
            'quantity' => $request->quantity,
            'images' => $images,
            'attributes' => $request->attributes ?? [],
            'template_data' => $request->template_data ?? [],
            'status' => 'draft'
        ];

        // التحقق من بيانات القالب
        if ($request->template_id) {
            $template = ProductTemplate::find($request->template_id);
            $this->templateService->validateTemplateData($request, $template);
        }

        $product = $vendor->products()->create($productData);

        // إنشاء خيارات المتغيرات
        if (!empty($variantOptionsData)) {
            $this->templateService->createVariantOptions($product, $variantOptionsData);
            
            // توليد المتغيرات تلقائياً
            $combinations = $this->templateService->generateVariantCombinations($product);
            if (!empty($combinations)) {
                $this->templateService->createVariantsFromCombinations($product, $combinations);
            }
        }

        return redirect()->route('vendor.products.show', $product)
            ->with('success', 'Product created successfully. It will be reviewed by our team.');
    }

    public function showProduct(Product $product)
    {
        // التأكد أن المنتج يخص التاجر الحالي
        if ($product->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }

        $product->load(['category', 'variants', 'reviews.user']);
        
        return view('vendor.products.show', compact('product'));
    }

    public function editProduct(Product $product)
    {
        if ($product->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }

        $categories = Category::where('is_active', true)->get();
        
        return view('vendor.products.edit', compact('product', 'categories'));
    }

    public function updateProduct(Request $request, Product $product)
    {
        if ($product->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
        ]);

        $product->update($request->only([
            'name', 'category_id', 'description', 'short_description',
            'price', 'compare_price', 'quantity', 'images', 'attributes'
        ]));

        return redirect()->route('vendor.products.show', $product)
            ->with('success', 'Product updated successfully');
    }

    // Order Management
    public function orders()
    {
        $vendor = auth()->user()->vendor;
        
        $orders = $vendor->orders()
            ->with(['user', 'items.product'])
            ->when(request('status'), function($query, $status) {
                return $query->where('status', $status);
            })
            ->latest()
            ->paginate(20);

        return view('vendor.orders.index', compact('orders'));
    }

    public function showOrder(Order $order)
    {
        if ($order->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }

        $order->load(['user', 'items.product']);
        
        return view('vendor.orders.show', compact('order'));
    }

    public function updateOrderStatus(Order $order, Request $request)
    {
        if ($order->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:confirmed,processing,shipped,delivered'
        ]);

        $order->update(['status' => $request->status]);
        
        if ($request->status === 'shipped') {
            $order->update(['shipped_at' => now()]);
        } elseif ($request->status === 'delivered') {
            $order->update(['delivered_at' => now()]);
        }

        return back()->with('success', 'Order status updated successfully');
    }

    // Analytics
    public function analytics()
    {
        $vendor = auth()->user()->vendor;
        
        // إحصائيات المبيعات
        $salesData = $vendor->orders()
            ->where('payment_status', 'paid')
            ->selectRaw('DATE(created_at) as date, SUM(total_amount) as total')
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->take(30)
            ->get();

        // أفضل المنتجات مبيعاً
        $topProducts = $vendor->products()
            ->withSum('orderItems', 'quantity')
            ->orderBy('order_items_sum_quantity', 'desc')
            ->take(10)
            ->get();

        return view('vendor.analytics', compact('salesData', 'topProducts'));
    }

    // Discount Management
    public function discounts()
    {
        $vendor = auth()->user()->vendor;
        
        $discounts = \App\Models\Discount::where('vendor_id', $vendor->id)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return view('vendor.discounts.index', compact('discounts'));
    }

    public function createDiscount()
    {
        return view('vendor.discounts.create');
    }

    public function storeDiscount(Request $request)
    {
        $vendor = auth()->user()->vendor;
        
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|unique:discounts',
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|numeric|min:0',
            'min_amount' => 'nullable|numeric|min:0',
            'max_discount' => 'nullable|numeric|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'starts_at' => 'required|date',
            'expires_at' => 'required|date|after:starts_at'
        ]);

        $data = $request->all();
        $data['vendor_id'] = $vendor->id;
        
        $this->discountService->createDiscount($data);

        return redirect()->route('vendor.discounts')
            ->with('success', 'Discount created successfully');
    }

    public function toggleDiscount(\App\Models\Discount $discount)
    {
        if ($discount->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }

        $discount->update(['is_active' => !$discount->is_active]);
        
        return back()->with('success', 'Discount status updated');
    }
    
    public function editDiscount(\App\Models\Discount $discount)
    {
        if ($discount->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }
        
        return view('vendor.discounts.edit', compact('discount'));
    }
    
    public function updateDiscount(Request $request, \App\Models\Discount $discount)
    {
        if ($discount->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }
        
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|unique:discounts,code,' . $discount->id,
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|numeric|min:0',
            'min_amount' => 'nullable|numeric|min:0',
            'max_discount' => 'nullable|numeric|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'starts_at' => 'required|date',
            'expires_at' => 'required|date|after:starts_at'
        ]);
        
        $discount->update($request->all());
        
        return redirect()->route('vendor.discounts')
            ->with('success', 'Discount updated successfully');
    }
    
    public function deleteDiscount(\App\Models\Discount $discount)
    {
        if ($discount->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }
        
        $discount->delete();
        
        return back()->with('success', 'Discount deleted successfully');
    }
    
    // Reviews Management
    public function reviews()
    {
        $vendor = auth()->user()->vendor;
        
        $reviews = \App\Models\ProductReview::whereHas('product', function($q) use ($vendor) {
            $q->where('vendor_id', $vendor->id);
        })->with(['product', 'user'])->latest()->paginate(20);
        
        return view('vendor.reviews.index', compact('reviews'));
    }
    
    public function approveReview(\App\Models\ProductReview $review)
    {
        if ($review->product->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }
        
        $review->update(['is_approved' => true]);
        return back()->with('success', 'Review approved successfully');
    }
    
    public function replyToReview(\App\Models\ProductReview $review, Request $request)
    {
        if ($review->product->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }
        
        $request->validate(['reply' => 'required|string|max:1000']);
        
        \App\Models\ReviewReply::create([
            'review_id' => $review->id,
            'user_id' => auth()->id(),
            'reply' => $request->reply
        ]);
        
        return back()->with('success', 'Reply added successfully');
    }
    
    // Notifications
    public function notifications()
    {
        $notifications = \App\Models\Notification::where('user_id', auth()->id())
            ->latest()
            ->paginate(20);
            
        return view('vendor.notifications.index', compact('notifications'));
    }
    
    public function markNotificationsRead()
    {
        \App\Models\Notification::where('user_id', auth()->id())
            ->where('is_read', false)
            ->update(['is_read' => true, 'read_at' => now()]);
            
        return back()->with('success', 'All notifications marked as read');
    }
    
    // Subscription Management
    public function subscription()
    {
        $vendor = auth()->user()->vendor;
        $subscription = $vendor->subscription;
        $availableSubscriptions = \App\Models\Subscription::where('is_active', true)->get();
        
        return view('vendor.subscription.index', compact('vendor', 'subscription', 'availableSubscriptions'));
    }
    
    public function upgradeSubscription(Request $request)
    {
        $vendor = auth()->user()->vendor;
        
        $request->validate([
            'subscription_id' => 'required|exists:subscriptions,id'
        ]);
        
        $newSubscription = \App\Models\Subscription::findOrFail($request->subscription_id);
        
        // تحديث اشتراك التاجر
        $vendor->update([
            'subscription_id' => $newSubscription->id,
            'subscription_expires_at' => now()->addDays($newSubscription->duration_days)
        ]);
        
        return back()->with('success', 'Subscription updated successfully! Your new plan is now active.');
    }
    
    // Financial Reports
    public function reports()
    {
        $vendor = auth()->user()->vendor;
        
        $monthlyRevenue = $vendor->orders()
            ->where('payment_status', 'paid')
            ->selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, SUM(total_amount) as revenue')
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->take(12)
            ->get();
            
        $topProducts = $vendor->products()
            ->withSum('orderItems', 'quantity')
            ->withSum('orderItems', 'price')
            ->orderBy('order_items_sum_quantity', 'desc')
            ->take(10)
            ->get();
            
        return view('vendor.reports.index', compact('monthlyRevenue', 'topProducts'));
    }
    
    // Blog Management
    public function blog()
    {
        $vendor = auth()->user()->vendor;
        
        $posts = \App\Models\BlogPost::where('author_id', auth()->id())
            ->latest()
            ->paginate(20);
            
        return view('vendor.blog.index', compact('posts'));
    }
    
    public function createBlogPost()
    {
        return view('vendor.blog.create');
    }
    
    public function storeBlogPost(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        
        $data = $request->only(['title', 'content', 'excerpt']);
        $data['author_id'] = auth()->id();
        $data['slug'] = \Illuminate\Support\Str::slug($request->title) . '-' . \Illuminate\Support\Str::random(6);
        $data['status'] = 'pending'; // يحتاج موافقة الأدمن
        
        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('blog', 'public');
        }
        
        \App\Models\BlogPost::create($data);
        
        return redirect()->route('vendor.blog')
            ->with('success', 'Blog post created successfully. It will be reviewed by admin.');
    }
    
    public function editBlogPost(\App\Models\BlogPost $post)
    {
        if ($post->author_id !== auth()->id()) {
            abort(403);
        }
        
        return view('vendor.blog.edit', compact('post'));
    }
    
    public function updateBlogPost(Request $request, \App\Models\BlogPost $post)
    {
        if ($post->author_id !== auth()->id()) {
            abort(403);
        }
        
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        
        $data = $request->only(['title', 'content', 'excerpt']);
        $data['status'] = 'pending'; // يحتاج موافقة مرة أخرى بعد التعديل
        
        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('blog', 'public');
        }
        
        $post->update($data);
        
        return redirect()->route('vendor.blog')
            ->with('success', 'Blog post updated successfully. It will be reviewed by admin.');
    }
    
    public function deleteBlogPost(\App\Models\BlogPost $post)
    {
        if ($post->author_id !== auth()->id()) {
            abort(403);
        }
        
        $post->delete();
        
        return back()->with('success', 'Blog post deleted successfully.');
    }
}