<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title') - TailAdmin Marketplace</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
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
                        Dashboard
                    </a>
                    <a href="{{ route('superadmin.users') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Users
                    </a>
                    <a href="{{ route('superadmin.vendors') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Vendors
                    </a>
                    <a href="{{ route('superadmin.subscriptions') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Subscriptions
                    </a>
                    <a href="{{ route('superadmin.integrations.payment-gateways') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Payment Gateways
                    </a>
                    <a href="{{ route('superadmin.integrations.shipping-providers') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Shipping Providers
                    </a>
                    <a href="{{ route('superadmin.system.settings') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        System Settings
                    </a>
                    <a href="{{ route('superadmin.content.blog-posts') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Blog Posts
                    </a>
                    <a href="{{ route('superadmin.content.hero-slides') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Hero Slides
                    </a>
                    <a href="{{ route('superadmin.content.static-pages') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Static Pages
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
                        Dashboard
                    </a>
                    <a href="{{ route('vendor.products') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Products
                    </a>
                    <a href="{{ route('vendor.orders') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Orders
                    </a>
                    <a href="{{ route('vendor.store.settings') }}" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Store Settings
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
                                Logout
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