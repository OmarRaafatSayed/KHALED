@extends('layouts.dashboard')

@section('title', __('dashboard.messages'))

@section('content')
<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-title-md2 font-bold text-black dark:text-white">{{ __('dashboard.messages') }}</h2>
    </div>

    <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div class="px-4 py-6 md:px-6 xl:px-7.5">
            <h4 class="text-xl font-semibold text-black dark:text-white">المحادثات</h4>
        </div>

        @forelse($conversations as $conversation)
        <div class="border-t border-stroke px-4 py-4.5 dark:border-strokedark">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span class="text-sm font-medium">
                            {{ substr($conversation->sender_id == auth()->id() ? $conversation->receiver->name : $conversation->sender->name, 0, 2) }}
                        </span>
                    </div>
                    <div>
                        <h5 class="font-medium text-black dark:text-white">
                            {{ $conversation->sender_id == auth()->id() ? $conversation->receiver->name : $conversation->sender->name }}
                        </h5>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            {{ Str::limit($conversation->message, 50) }}
                        </p>
                        <p class="text-xs text-gray-500">
                            {{ $conversation->created_at->diffForHumans() }}
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    @if(!$conversation->is_read && $conversation->receiver_id == auth()->id())
                        <span class="inline-flex h-2 w-2 rounded-full bg-primary"></span>
                    @endif
                    <a href="{{ route('vendor.messages.show', $conversation->sender_id == auth()->id() ? $conversation->receiver_id : $conversation->sender_id) }}" 
                       class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700">
                        {{ __('dashboard.view') }}
                    </a>
                </div>
            </div>
        </div>
        @empty
        <div class="px-4 py-6 text-center">
            <p class="text-gray-500">{{ __('dashboard.no_data') }}</p>
        </div>
        @endforelse
    </div>
</div>
@endsection