@extends('layouts.dashboard')

@section('title', 'إدارة المقالات')

@section('content')
<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-title-md2 font-bold text-black dark:text-white">إدارة المقالات</h2>
    </div>

    <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div class="px-4 py-6 md:px-6 xl:px-7.5">
            <h4 class="text-xl font-semibold text-black dark:text-white">قائمة المقالات</h4>
        </div>

        @forelse($posts as $post)
        <div class="border-t border-stroke px-4 py-4.5 dark:border-strokedark">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <h5 class="font-medium text-black dark:text-white">{{ $post->title }}</h5>
                        <span class="inline-flex rounded-full px-3 py-1 text-xs font-medium
                            @if($post->status === 'published') bg-success bg-opacity-10 text-success
                            @elseif($post->status === 'pending') bg-warning bg-opacity-10 text-warning
                            @else bg-danger bg-opacity-10 text-danger @endif">
                            @if($post->status === 'published') منشور
                            @elseif($post->status === 'pending') معلق
                            @else مسودة @endif
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        الكاتب: {{ $post->author->name }}
                    </p>
                    <p class="text-xs text-gray-500">{{ $post->created_at->format('Y-m-d H:i') }}</p>
                </div>
                <div class="flex items-center gap-2">
                    @if($post->status === 'pending')
                    <button class="inline-flex items-center justify-center rounded-md bg-success px-4 py-2 text-center text-sm font-medium text-white hover:bg-opacity-90">
                        نشر
                    </button>
                    <button class="inline-flex items-center justify-center rounded-md bg-danger px-4 py-2 text-center text-sm font-medium text-white hover:bg-opacity-90">
                        رفض
                    </button>
                    @endif
                </div>
            </div>
        </div>
        @empty
        <div class="px-4 py-6 text-center">
            <p class="text-gray-500">لا توجد مقالات</p>
        </div>
        @endforelse
    </div>

    @if($posts->hasPages())
    <div class="mt-6">
        {{ $posts->links() }}
    </div>
    @endif
</div>
@endsection