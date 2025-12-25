<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title') - TailAdmin Marketplace</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @if(app()->getLocale() === 'ar')
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .rtl { direction: rtl; }
        .text-right { text-align: right; }
        .mr-auto { margin-left: auto; margin-right: 0; }
        .ml-auto { margin-right: auto; margin-left: 0; }
    </style>
    @endif
</head>
<body class="bg-gray-100">
    <div class="min-h-screen flex">
        <!-- Sidebar -->
        <div class="w-64 bg-white shadow-lg">
            <div class="p-6">
                <h2 class="text-xl font-bold text-gray-800">TailAdmin</h2>
            </div>
            
            <nav class="mt-6">
                @if(auth()->user()->isSuperAdmin())
                    <a href="{{ route('superadmin.dashboard') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.dashboard') }}
                    </a>
                    <a href="{{ route('superadmin.users') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.user_management') }}
                    </a>
                    <a href="{{ route('superadmin.vendors') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.vendors') }}
                    </a>
                    <a href="{{ route('superadmin.categories') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.categories') }}
                    </a>
                    <a href="{{ route('superadmin.products.pending') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.product_approval') }}
                    </a>
                    <a href="{{ route('superadmin.withdrawals') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.withdrawals') }}
                    </a>
                    <a href="{{ route('superadmin.jobs') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.jobs') }}
                    </a>
                    <a href="{{ route('superadmin.subscriptions') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.subscription') }}
                    </a>
                    <a href="{{ route('superadmin.system.settings') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.system_settings') }}
                    </a>
                    <a href="{{ route('superadmin.content.blog-posts') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.blog') }}
                    </a>
                @elseif(auth()->user()->isAdmin())
                    <a href="{{ route('admin.dashboard') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Dashboard
                    </a>
                    <a href="{{ route('admin.vendors') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Vendors
                    </a>
                    <a href="{{ route('admin.products') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Products
                    </a>
                    <a href="{{ route('admin.orders') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Orders
                    </a>
                @elseif(auth()->user()->isVendor())
                    <a href="{{ route('vendor.dashboard') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.dashboard') }}
                    </a>
                    <a href="{{ route('vendor.products') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.products') }}
                    </a>
                    <a href="{{ route('vendor.orders') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.orders') }}
                    </a>
                    <a href="{{ route('vendor.wallet') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.wallet') }}
                    </a>
                    <a href="{{ route('vendor.messages') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.messages') }}
                    </a>
                    <a href="{{ route('vendor.jobs') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.jobs') }}
                    </a>
                    <a href="{{ route('vendor.store.settings') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        {{ __('dashboard.store_settings') }}
                    </a>
                @endif
            </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col">
            <!-- Header -->
            <header class="bg-white shadow-sm border-b border-gray-200">
                <div class="flex justify-between items-center px-6 py-4">
                    <h1 class="text-2xl font-semibold text-gray-900">@yield('title')</h1>
                    
                    <div class="flex items-center space-x-4">
                        <span class="text-gray-700">{{ auth()->user()->name }}</span>
                        <form method="POST" action="{{ route('logout') }}" class="inline">
                            @csrf
                            <button type="submit" class="text-red-600 hover:text-red-800">
                                {{ __('dashboard.logout') }}
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <!-- Content -->
            <main class="flex-1 overflow-y-auto">
                @if(session('success'))
                    <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 m-6 rounded">
                        {{ session('success') }}
                    </div>
                @endif

                @if(session('error'))
                    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 m-6 rounded">
                        {{ session('error') }}
                    </div>
                @endif

                @yield('content')
            </main>
        </div>
    </div>
</body>
</html>