@extends('layouts.dashboard')

@section('title', 'Notifications')

@section('content')
<div class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <div class="flex items-center justify-between">
                    <h3 class="font-medium text-black dark:text-white">Notifications</h3>
                    <form action="{{ route('vendor.notifications.mark-read') }}" method="POST">
                        @csrf
                        @method('PATCH')
                        <button type="submit" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90">
                            Mark All Read
                        </button>
                    </form>
                </div>
            </div>

            <!-- Notifications List -->
            <div class="p-6.5">
                @if($notifications->count() > 0)
                    <div class="space-y-4">
                        @foreach($notifications as $notification)
                            <div class="flex items-start space-x-4 p-4 rounded-lg border {{ $notification->is_read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200' }}">
                                <div class="flex-shrink-0">
                                    @if($notification->type === 'order_status')
                                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                            </svg>
                                        </div>
                                    @elseif($notification->type === 'product_approved')
                                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                            </svg>
                                        </div>
                                    @else
                                        <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h10a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                    @endif
                                </div>
                                
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between">
                                        <h4 class="text-sm font-medium text-gray-900">{{ $notification->title }}</h4>
                                        <span class="text-xs text-gray-500">{{ $notification->created_at->diffForHumans() }}</span>
                                    </div>
                                    <p class="mt-1 text-sm text-gray-600">{{ $notification->message }}</p>
                                    @if($notification->action_url)
                                        <a href="{{ $notification->action_url }}" class="mt-2 inline-flex text-sm text-blue-600 hover:text-blue-800">
                                            View Details →
                                        </a>
                                    @endif
                                </div>
                                
                                @if(!$notification->is_read)
                                    <div class="flex-shrink-0">
                                        <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    </div>
                                @endif
                            </div>
                        @endforeach
                    </div>
                    
                    <div class="mt-6">
                        {{ $notifications->links() }}
                    </div>
                @else
                    <div class="text-center py-12">
                        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h10a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 class="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                        <p class="mt-1 text-sm text-gray-500">You're all caught up! No new notifications.</p>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection