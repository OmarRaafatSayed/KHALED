@extends('layouts.dashboard')

@section('title', 'Vendor Dashboard')

@section('content')
<div class="p-6">
    <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ auth()->user()->vendor->store_name }} Dashboard</h1>
    </div>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-2 bg-blue-100 rounded-lg">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Total Products</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $stats['total_products'] }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-2 bg-green-100 rounded-lg">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Active Products</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $stats['active_products'] }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-2 bg-yellow-100 rounded-lg">
                    <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Pending Orders</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $stats['pending_orders'] }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-2 bg-purple-100 rounded-lg">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Monthly Sales</p>
                    <p class="text-2xl font-bold text-gray-900">${{ number_format($stats['monthly_sales'], 2) }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Subscription Info -->
    @if($stats['subscription_expired'] || $stats['subscription_expires_in'] <= 7)
        <div class="{{ $stats['subscription_expired'] ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200' }} border rounded-md p-4 mb-6">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 {{ $stats['subscription_expired'] ? 'text-red-400' : 'text-yellow-400' }}" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3">
                    <h3 class="text-sm font-medium {{ $stats['subscription_expired'] ? 'text-red-800' : 'text-yellow-800' }}">
                        {{ $stats['subscription_expired'] ? 'Subscription Expired' : 'Subscription Expiring Soon' }}
                    </h3>
                    <div class="mt-2 text-sm {{ $stats['subscription_expired'] ? 'text-red-700' : 'text-yellow-700' }}">
                        <p>
                            @if($stats['subscription_expired'])
                                Your subscription has expired. Please renew to continue using all features.
                            @else
                                Your subscription expires in {{ $stats['subscription_expires_in'] }} days. Consider renewing soon.
                            @endif
                        </p>
                        <a href="{{ route('vendor.subscription') }}" class="font-medium underline hover:no-underline">
                            Manage Subscription →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    @endif

    <!-- Quick Actions -->
    <div class="mb-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="{{ route('vendor.products.create') }}" class="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
                <div class="text-blue-600 mb-2">
                    <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                </div>
                <p class="text-sm font-medium text-gray-900">Add Product</p>
            </a>
            
            <a href="{{ route('vendor.orders') }}" class="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
                <div class="text-green-600 mb-2">
                    <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                </div>
                <p class="text-sm font-medium text-gray-900">View Orders</p>
            </a>
            
            <a href="{{ route('vendor.wallet') }}" class="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
                <div class="text-purple-600 mb-2">
                    <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                </div>
                <p class="text-sm font-medium text-gray-900">Wallet</p>
                <p class="text-xs text-gray-500">${{ number_format($stats['wallet_balance'], 2) }}</p>
            </a>
            
            <a href="{{ route('vendor.messages') }}" class="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow relative">
                <div class="text-orange-600 mb-2">
                    <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                </div>
                <p class="text-sm font-medium text-gray-900">Messages</p>
                @if($stats['unread_messages'] > 0)
                    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{{ $stats['unread_messages'] }}</span>
                @endif
            </a>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <a href="{{ route('vendor.jobs') }}" class="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
                <div class="text-indigo-600 mb-2">
                    <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6"></path>
                    </svg>
                </div>
                <p class="text-sm font-medium text-gray-900">Jobs</p>
                <p class="text-xs text-gray-500">{{ $stats['active_jobs'] }} active</p>
            </a>
            <a href="{{ route('vendor.reviews') }}" class="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
                <div class="text-yellow-600 mb-2">
                    <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                    </svg>
                </div>
                <p class="text-sm font-medium text-gray-900">Reviews</p>
            </a>
            
            <a href="{{ route('vendor.notifications') }}" class="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow relative">
                <div class="text-red-600 mb-2">
                    <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h10a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <p class="text-sm font-medium text-gray-900">Notifications</p>
                @if($stats['unread_notifications'] > 0)
                    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{{ $stats['unread_notifications'] }}</span>
                @endif
            </a>
            
            <a href="{{ route('vendor.store.settings') }}" class="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
                <div class="text-gray-600 mb-2">
                    <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
                <p class="text-sm font-medium text-gray-900">Store Settings</p>
            </a>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
            <a href="{{ route('vendor.subscription') }}" class="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
                <div class="text-indigo-600 mb-2">
                    <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                </div>
                <p class="text-sm font-medium text-gray-900">Subscription</p>
            </a>
            
            <a href="{{ route('vendor.reports') }}" class="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
                <div class="text-green-600 mb-2">
                    <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                </div>
                <p class="text-sm font-medium text-gray-900">Reports</p>
            </a>
            
            <a href="{{ route('vendor.blog') }}" class="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
                <div class="text-indigo-600 mb-2">
                    <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                </div>
                <p class="text-sm font-medium text-gray-900">Blog Posts</p>
            </a>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">Recent Orders</h3>
            </div>
            <div class="p-6">
                @if($recentOrders->count() > 0)
                    <div class="space-y-4">
                        @foreach($recentOrders->take(5) as $order)
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">#{{ $order->order_number }}</p>
                                    <p class="text-sm text-gray-500">{{ $order->user->name }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm font-medium text-gray-900">${{ number_format($order->total_amount, 2) }}</p>
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full 
                                        @if($order->status === 'delivered') bg-green-100 text-green-800
                                        @elseif($order->status === 'pending') bg-yellow-100 text-yellow-800
                                        @else bg-blue-100 text-blue-800 @endif">
                                        {{ ucfirst($order->status) }}
                                    </span>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    <div class="mt-4">
                        <a href="{{ route('vendor.orders') }}" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                            View all orders →
                        </a>
                    </div>
                @else
                    <p class="text-gray-500">No orders yet</p>
                @endif
            </div>
        </div>

        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">Top Products</h3>
            </div>
            <div class="p-6">
                @if($topProducts->count() > 0)
                    <div class="space-y-4">
                        @foreach($topProducts as $product)
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">{{ $product->name }}</p>
                                    <p class="text-sm text-gray-500">${{ number_format($product->price, 2) }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm font-medium text-gray-900">{{ $product->order_items_count ?? 0 }} sold</p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    <div class="mt-4">
                        <a href="{{ route('vendor.products') }}" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                            View all products →
                        </a>
                    </div>
                @else
                    <p class="text-gray-500">No products yet</p>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection