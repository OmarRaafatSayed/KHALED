@extends('layouts.dashboard')

@section('title', 'Admin Dashboard')

@section('content')
<div class="p-6">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-2 bg-orange-100 rounded-lg">
                    <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Pending Vendors</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $stats['pending_vendors'] }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-2 bg-blue-100 rounded-lg">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Pending Products</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $stats['pending_products'] }}</p>
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
                    <p class="text-sm font-medium text-gray-600">Processing Orders</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $stats['processing_orders'] }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">Pending Vendor Approvals</h3>
            </div>
            <div class="p-6">
                @if($pendingVendors->count() > 0)
                    <div class="space-y-4">
                        @foreach($pendingVendors as $vendor)
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">{{ $vendor->store_name }}</p>
                                    <p class="text-sm text-gray-500">{{ $vendor->user->name }}</p>
                                </div>
                                <div class="flex space-x-2">
                                    <a href="{{ route('admin.vendors.show', $vendor) }}" 
                                       class="text-blue-600 hover:text-blue-800 text-sm">View</a>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    <div class="mt-4">
                        <a href="{{ route('admin.vendors') }}" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                            View all pending vendors →
                        </a>
                    </div>
                @else
                    <p class="text-gray-500">No pending vendor approvals</p>
                @endif
            </div>
        </div>

        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">Products Awaiting Review</h3>
            </div>
            <div class="p-6">
                @if($pendingProducts->count() > 0)
                    <div class="space-y-4">
                        @foreach($pendingProducts->take(5) as $product)
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">{{ $product->name }}</p>
                                    <p class="text-sm text-gray-500">by {{ $product->vendor->store_name }}</p>
                                </div>
                                <div class="flex space-x-2">
                                    <a href="{{ route('admin.products.show', $product) }}" 
                                       class="text-blue-600 hover:text-blue-800 text-sm">Review</a>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    <div class="mt-4">
                        <a href="{{ route('admin.products') }}" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                            View all pending products →
                        </a>
                    </div>
                @else
                    <p class="text-gray-500">No products awaiting review</p>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection