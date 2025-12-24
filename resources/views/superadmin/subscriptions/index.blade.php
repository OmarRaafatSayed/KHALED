@extends('layouts.dashboard')

@section('title', 'Subscriptions Management')

@section('content')
<div class="p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Subscriptions Management</h1>
        <a href="{{ route('superadmin.subscriptions.create') }}" 
           class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            Add New Plan
        </a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        @foreach($subscriptions as $subscription)
            <div class="bg-white rounded-lg shadow-md border {{ $subscription->slug === 'professional' ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200' }}">
                @if($subscription->slug === 'professional')
                    <div class="bg-indigo-500 text-white text-center py-2 rounded-t-lg">
                        <span class="text-sm font-medium">Most Popular</span>
                    </div>
                @endif
                
                <div class="p-6">
                    <div class="text-center">
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $subscription->name }}</h3>
                        <div class="mb-4">
                            <span class="text-3xl font-bold text-gray-900">${{ number_format($subscription->price, 0) }}</span>
                            <span class="text-gray-500">{{ $subscription->price > 0 ? '/month' : '' }}</span>
                        </div>
                        <p class="text-sm text-gray-600 mb-4">{{ $subscription->description }}</p>
                    </div>

                    <div class="space-y-3 mb-6">
                        <div class="flex items-center text-sm">
                            <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-gray-700">
                                {{ $subscription->product_limit == -1 ? 'Unlimited' : $subscription->product_limit }} products
                            </span>
                        </div>
                        
                        @if($subscription->features)
                            @foreach($subscription->features as $feature)
                                <div class="flex items-center text-sm">
                                    <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-gray-700">{{ $feature }}</span>
                                </div>
                            @endforeach
                        @endif
                    </div>

                    <div class="border-t pt-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm text-gray-600">Active Vendors:</span>
                            <span class="text-sm font-medium text-gray-900">{{ $subscription->vendors_count }}</span>
                        </div>
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-sm text-gray-600">Status:</span>
                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full 
                                {{ $subscription->is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                {{ $subscription->is_active ? 'Active' : 'Inactive' }}
                            </span>
                        </div>
                        
                        <div class="flex space-x-2">
                            <button class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded text-sm font-medium">
                                Edit
                            </button>
                            <button class="flex-1 {{ $subscription->is_active ? 'bg-red-100 hover:bg-red-200 text-red-800' : 'bg-green-100 hover:bg-green-200 text-green-800' }} py-2 px-3 rounded text-sm font-medium">
                                {{ $subscription->is_active ? 'Disable' : 'Enable' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>

    @if($subscriptions->isEmpty())
        <div class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No subscription plans</h3>
            <p class="mt-1 text-sm text-gray-500">Get started by creating a new subscription plan.</p>
            <div class="mt-6">
                <a href="{{ route('superadmin.subscriptions.create') }}" 
                   class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Add Subscription Plan
                </a>
            </div>
        </div>
    @endif
</div>
@endsection