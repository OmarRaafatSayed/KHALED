<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Vendor;
use App\Models\Product;
use App\Models\Order;
use App\Models\Subscription;
use App\Models\Role;
use App\Models\Category;
use App\Models\Job;
use App\Models\WithdrawalRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SuperAdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'total_vendors' => Vendor::count(),
            'active_vendors' => Vendor::where('is_active', true)->count(),
            'pending_vendors' => Vendor::where('is_approved', false)->count(),
            'total_products' => Product::count(),
            'active_products' => Product::where('status', 'active')->count(),
            'total_orders' => Order::count(),
            'total_revenue' => Order::where('payment_status', 'paid')->sum('total_amount'),
            'monthly_revenue' => Order::where('payment_status', 'paid')
                ->whereMonth('created_at', now()->month)
                ->sum('total_amount'),
        ];

        $recentOrders = Order::with(['user', 'vendor'])
            ->latest()
            ->take(10)
            ->get();

        $topVendors = Vendor::withCount('products')
            ->with('user')
            ->orderBy('products_count', 'desc')
            ->take(10)
            ->get();

        return view('superadmin.dashboard', compact('stats', 'recentOrders', 'topVendors'));
    }

    // User Management
    public function users()
    {
        $users = User::with('roles')->paginate(20);
        return view('superadmin.users.index', compact('users'));
    }

    public function createUser()
    {
        $roles = Role::all();
        return view('superadmin.users.create', compact('roles'));
    }

    public function storeUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'roles' => 'required|array'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'is_active' => $request->boolean('is_active', true)
        ]);

        $user->roles()->sync($request->roles);

        return redirect()->route('superadmin.users')->with('success', 'User created successfully');
    }

    // Vendor Management
    public function vendors()
    {
        $vendors = Vendor::with(['user', 'subscription'])
            ->paginate(20);
        return view('superadmin.vendors.index', compact('vendors'));
    }

    public function approveVendor(Vendor $vendor)
    {
        $vendor->update(['is_approved' => true]);
        return back()->with('success', 'Vendor approved successfully');
    }

    public function toggleVendorStatus(Vendor $vendor)
    {
        $vendor->update(['is_active' => !$vendor->is_active]);
        return back()->with('success', 'Vendor status updated');
    }

    // Subscription Management
    public function subscriptions()
    {
        $subscriptions = Subscription::withCount('vendors')->get();
        return view('superadmin.subscriptions.index', compact('subscriptions'));
    }

    public function createSubscription()
    {
        return view('superadmin.subscriptions.create');
    }

    public function storeSubscription(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:subscriptions',
            'price' => 'required|numeric|min:0',
            'duration_days' => 'required|integer|min:1',
            'product_limit' => 'required|integer|min:1',
            'features' => 'array'
        ]);

        Subscription::create($request->all());

        return redirect()->route('superadmin.subscriptions')->with('success', 'Subscription created successfully');
    }

    // Financial Reports
    public function financialReports()
    {
        $monthlyRevenue = Order::select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('MONTH(created_at) as month'),
            DB::raw('SUM(total_amount) as revenue')
        )
        ->where('payment_status', 'paid')
        ->groupBy('year', 'month')
        ->orderBy('year', 'desc')
        ->orderBy('month', 'desc')
        ->take(12)
        ->get();

        $subscriptionRevenue = DB::table('vendors')
            ->join('subscriptions', 'vendors.subscription_id', '=', 'subscriptions.id')
            ->select('subscriptions.name', DB::raw('COUNT(*) as count'), DB::raw('SUM(subscriptions.price) as revenue'))
            ->groupBy('subscriptions.id', 'subscriptions.name')
            ->get();

        return view('superadmin.reports.financial', compact('monthlyRevenue', 'subscriptionRevenue'));
    }

    // System Settings
    public function settings()
    {
        return view('superadmin.settings');
    }

    // Payment Gateways
    public function paymentGateways()
    {
        $gateways = \App\Models\PaymentGateway::orderBy('sort_order')->get();
        return view('superadmin.integrations.payment-gateways', compact('gateways'));
    }

    // Shipping Providers
    public function shippingProviders()
    {
        $providers = \App\Models\ShippingProvider::orderBy('sort_order')->get();
        return view('superadmin.integrations.shipping-providers', compact('providers'));
    }

    // System Settings Management
    public function systemSettings()
    {
        $settings = \App\Models\SystemSetting::all()->groupBy('group');
        return view('superadmin.system.settings', compact('settings'));
    }

    public function updateSystemSettings(Request $request)
    {
        foreach ($request->settings as $key => $value) {
            \App\Models\SystemSetting::set($key, $value);
        }

        return back()->with('success', 'Settings updated successfully');
    }

    // Content Management
    public function blogPosts()
    {
        $posts = \App\Models\BlogPost::with('author')->latest()->paginate(20);
        return view('superadmin.content.blog-posts', compact('posts'));
    }

    public function staticPages()
    {
        $pages = \App\Models\StaticPage::orderBy('sort_order')->get();
        return view('superadmin.content.static-pages', compact('pages'));
    }

    public function heroSlides()
    {
        $slides = \App\Models\HeroSlide::orderBy('sort_order')->get();
        return view('superadmin.content.hero-slides', compact('slides'));
    }

    public function blogComments()
    {
        $comments = \App\Models\BlogComment::with(['post', 'user'])
            ->latest()
            ->paginate(20);
        return view('superadmin.content.blog-comments', compact('comments'));
    }

    public function updateHeroSettings(Request $request)
    {
        // Save slider settings to system settings
        \App\Models\SystemSetting::set('hero_slide_duration', $request->slide_duration);
        \App\Models\SystemSetting::set('hero_transition_effect', $request->transition_effect);
        
        return back()->with('success', 'Slider settings updated successfully');
    }

    public function storeHeroSlide(Request $request)
    {
        $request->validate([
            'business_name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'business_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1024'
        ]);

        $data = $request->only([
            'business_name', 'title', 'subtitle', 'description',
            'button_text', 'button_url', 'sort_order'
        ]);
        
        $data['is_active'] = $request->boolean('is_active');
        
        // Handle image upload
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('hero-slides', 'public');
        }
        
        if ($request->hasFile('business_logo')) {
            $data['business_logo'] = $request->file('business_logo')->store('hero-slides/logos', 'public');
        }

        \App\Models\HeroSlide::create($data);
        
        return back()->with('success', 'Hero slide created successfully');
    }

    // Product Templates Management
    public function productTemplates()
    {
        $templates = \App\Models\ProductTemplate::orderBy('sort_order')->paginate(20);
        return view('superadmin.templates.index', compact('templates'));
    }

    public function createTemplate()
    {
        return view('superadmin.templates.create');
    }

    public function storeTemplate(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:product_templates',
            'description' => 'nullable|string',
            'fields' => 'required|array',
            'validation_rules' => 'array'
        ]);

        \App\Models\ProductTemplate::create($request->all());
        
        return redirect()->route('superadmin.templates.index')
            ->with('success', 'Template created successfully');
    }

    public function editTemplate(\App\Models\ProductTemplate $template)
    {
        return view('superadmin.templates.edit', compact('template'));
    }

    public function updateTemplate(Request $request, \App\Models\ProductTemplate $template)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:product_templates,slug,' . $template->id,
            'description' => 'nullable|string',
            'fields' => 'required|array',
            'validation_rules' => 'array'
        ]);

        $template->update($request->all());
        
        return redirect()->route('superadmin.templates.index')
            ->with('success', 'Template updated successfully');
    }

    public function deleteTemplate(\App\Models\ProductTemplate $template)
    {
        $template->delete();
        
        return back()->with('success', 'Template deleted successfully');
    }

    // Discount Management
    public function discounts()
    {
        $discounts = \App\Models\Discount::with('vendor.user')
            ->latest()
            ->paginate(20);
        return view('superadmin.discounts.index', compact('discounts'));
    }

    public function toggleDiscount(\App\Models\Discount $discount)
    {
        $discount->update(['is_active' => !$discount->is_active]);
        return back()->with('success', 'Discount status updated');
    }

    // Categories Management
    public function categories()
    {
        $categories = Category::withCount('products')
            ->orderBy('sort_order')
            ->paginate(20);
        return view('superadmin.categories.index', compact('categories'));
    }

    public function createCategory()
    {
        $parentCategories = Category::whereNull('parent_id')->get();
        return view('superadmin.categories.create', compact('parentCategories'));
    }

    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
            'sort_order' => 'nullable|integer'
        ]);

        Category::create($request->all());
        return redirect()->route('superadmin.categories')->with('success', 'Category created successfully');
    }

    public function editCategory(Category $category)
    {
        $parentCategories = Category::whereNull('parent_id')->where('id', '!=', $category->id)->get();
        return view('superadmin.categories.edit', compact('category', 'parentCategories'));
    }

    public function updateCategory(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories,slug,' . $category->id,
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
            'sort_order' => 'nullable|integer'
        ]);

        $category->update($request->all());
        return redirect()->route('superadmin.categories')->with('success', 'Category updated successfully');
    }

    public function deleteCategory(Category $category)
    {
        if ($category->products()->count() > 0) {
            return back()->with('error', 'Cannot delete category with products');
        }
        
        $category->delete();
        return back()->with('success', 'Category deleted successfully');
    }

    public function toggleCategory(Category $category)
    {
        $category->update(['is_active' => !$category->is_active]);
        return back()->with('success', 'Category status updated');
    }

    // Product Approval
    public function pendingProducts()
    {
        $products = Product::where('status', 'draft')
            ->with(['vendor.user', 'category'])
            ->latest()
            ->paginate(20);
        return view('superadmin.products.pending', compact('products'));
    }

    public function approveProduct(Product $product)
    {
        $product->update(['status' => 'active']);
        return back()->with('success', 'Product approved successfully');
    }

    public function rejectProduct(Product $product, Request $request)
    {
        $request->validate(['reason' => 'required|string']);
        
        $product->update([
            'status' => 'rejected',
            'rejection_reason' => $request->reason
        ]);
        
        return back()->with('success', 'Product rejected');
    }

    // Jobs Management
    public function jobs()
    {
        $jobs = Job::with(['vendor.user'])
            ->latest()
            ->paginate(20);
        return view('superadmin.jobs.index', compact('jobs'));
    }

    public function approveJob(Job $job)
    {
        $job->update(['status' => 'active']);
        return back()->with('success', 'Job approved successfully');
    }

    public function rejectJob(Job $job, Request $request)
    {
        $request->validate(['reason' => 'required|string']);
        
        $job->update([
            'status' => 'rejected',
            'rejection_reason' => $request->reason
        ]);
        
        return back()->with('success', 'Job rejected');
    }

    // Wallet Management
    public function withdrawalRequests()
    {
        $withdrawals = WithdrawalRequest::with(['vendor.user'])
            ->latest()
            ->paginate(20);
        return view('superadmin.withdrawals.index', compact('withdrawals'));
    }

    public function approveWithdrawal(WithdrawalRequest $withdrawal)
    {
        $withdrawal->update([
            'status' => 'approved',
            'processed_at' => now()
        ]);
        
        // تحديث رصيد المحفظة
        $wallet = $withdrawal->vendor->wallet;
        $wallet->decrement('pending_balance', $withdrawal->amount);
        $wallet->increment('total_withdrawn', $withdrawal->amount);
        
        return back()->with('success', 'Withdrawal approved successfully');
    }

    public function rejectWithdrawal(WithdrawalRequest $withdrawal, Request $request)
    {
        $request->validate(['reason' => 'required|string']);
        
        $withdrawal->update([
            'status' => 'rejected',
            'admin_notes' => $request->reason,
            'processed_at' => now()
        ]);
        
        // إرجاع المبلغ للرصيد المتاح
        $wallet = $withdrawal->vendor->wallet;
        $wallet->increment('balance', $withdrawal->amount);
        $wallet->decrement('pending_balance', $withdrawal->amount);
        
        return back()->with('success', 'Withdrawal rejected');
    }
}