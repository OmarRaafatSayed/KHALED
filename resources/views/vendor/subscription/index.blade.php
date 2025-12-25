@extends('layouts.dashboard')

@section('title', 'Subscription Management')

@section('content')
<div class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-9">
        <!-- Current Subscription -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">Current Subscription</h3>
            </div>
            
            <div class="p-6.5">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center p-6 bg-blue-50 rounded-lg">
                        <h4 class="text-2xl font-bold text-blue-600">{{ $subscription->name }}</h4>
                        <p class="text-gray-600 mt-2">${{ number_format($subscription->price, 2) }}/month</p>
                    </div>
                    
                    <div class="text-center p-6 bg-green-50 rounded-lg">
                        <h4 class="text-lg font-semibold text-green-600">Products Limit</h4>
                        <p class="text-2xl font-bold text-green-800">{{ $subscription->product_limit }}</p>
                        <p class="text-sm text-gray-600">{{ $vendor->products()->count() }} used</p>
                    </div>
                    
                    <div class="text-center p-6 {{ $vendor->subscription_expires_at->isPast() ? 'bg-red-50' : 'bg-yellow-50' }} rounded-lg">
                        <h4 class="text-lg font-semibold {{ $vendor->subscription_expires_at->isPast() ? 'text-red-600' : 'text-yellow-600' }}">
                            {{ $vendor->subscription_expires_at->isPast() ? 'Expired' : 'Expires' }}
                        </h4>
                        <p class="text-2xl font-bold {{ $vendor->subscription_expires_at->isPast() ? 'text-red-800' : 'text-yellow-800' }}">
                            {{ $vendor->subscription_expires_at->format('M d, Y') }}
                        </p>
                        <p class="text-sm text-gray-600">{{ $vendor->subscription_expires_at->diffForHumans() }}</p>
                    </div>
                </div>
                
                <!-- Features -->
                <div class="mt-6">
                    <h5 class="font-medium text-black dark:text-white mb-4">Current Plan Features:</h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        @if($subscription->features)
                            @foreach($subscription->features as $feature)
                                <div class="flex items-center space-x-2">
                                    <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-gray-700">{{ $feature }}</span>
                                </div>
                            @endforeach
                        @endif
                    </div>
                </div>
            </div>
        </div>

        <!-- Available Plans -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">Upgrade Your Plan</h3>
            </div>
            
            <div class="p-6.5">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    @foreach($availableSubscriptions as $plan)
                        <div class="border rounded-lg p-6 {{ $plan->id === $subscription->id ? 'border-blue-500 bg-blue-50' : 'border-gray-200' }}">
                            <div class="text-center">
                                <h4 class="text-xl font-bold text-gray-900">{{ $plan->name }}</h4>
                                <p class="text-3xl font-bold text-blue-600 mt-2">${{ number_format($plan->price, 2) }}</p>
                                <p class="text-gray-600">per month</p>
                            </div>
                            
                            <div class="mt-6">
                                <ul class="space-y-3">
                                    <li class="flex items-center">
                                        <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span class="text-sm text-gray-600">{{ $plan->product_limit }} Products</span>
                                    </li>
                                    @if($plan->features)
                                        @foreach($plan->features as $feature)
                                            <li class="flex items-center">
                                                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                                </svg>
                                                <span class="text-sm text-gray-600">{{ $feature }}</span>
                                            </li>
                                        @endforeach
                                    @endif
                                </ul>
                            </div>
                            
                            <div class="mt-6">
                                @if($plan->id === $subscription->id)
                                    <button class="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed" disabled>
                                        Current Plan
                                    </button>
                                @else
                                    <form action="{{ route('vendor.subscription.upgrade') }}" method="POST">
                                        @csrf
                                        <input type="hidden" name="subscription_id" value="{{ $plan->id }}">
                                        <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                            {{ $plan->price > $subscription->price ? 'Upgrade' : 'Downgrade' }}
                                        </button>
                                    </form>
                                @endif
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        <!-- Subscription History -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">Subscription Status</h3>
            </div>
            
            <div class="p-6.5">
                <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p class="font-medium text-gray-900">Subscription Status</p>
                            <p class="text-sm text-gray-600">Current plan status and billing</p>
                        </div>
                        <div class="text-right">
                            <span class="inline-flex px-3 py-1 text-sm font-medium rounded-full {{ $vendor->subscription_expires_at->isPast() ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800' }}">
                                {{ $vendor->subscription_expires_at->isPast() ? 'Expired' : 'Active' }}
                            </span>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p class="font-medium text-gray-900">Next Billing Date</p>
                            <p class="text-sm text-gray-600">Your next payment is due</p>
                        </div>
                        <div class="text-right">
                            <p class="font-medium text-gray-900">{{ $vendor->subscription_expires_at->format('M d, Y') }}</p>
                            <p class="text-sm text-gray-600">${{ number_format($subscription->price, 2) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection