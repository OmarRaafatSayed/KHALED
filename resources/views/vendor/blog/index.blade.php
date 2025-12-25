@extends('layouts.dashboard')

@section('title', 'Blog Posts')

@section('content')
<div class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <div class="flex items-center justify-between">
                    <h3 class="font-medium text-black dark:text-white">My Blog Posts</h3>
                    <a href="{{ route('vendor.blog.create') }}" 
                        class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-blue-700">
                        Write New Post
                    </a>
                </div>
            </div>

            <!-- Posts List -->
            <div class="p-6.5">
                @if($posts->count() > 0)
                    <div class="space-y-6">
                        @foreach($posts as $post)
                            <div class="border rounded-lg p-6">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ $post->title }}</h4>
                                        @if($post->excerpt)
                                            <p class="text-gray-600 mb-3">{{ $post->excerpt }}</p>
                                        @endif
                                        <div class="flex items-center space-x-4 text-sm text-gray-500">
                                            <span>{{ $post->created_at->format('M d, Y') }}</span>
                                            <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full 
                                                {{ $post->status === 'published' ? 'bg-green-100 text-green-800' : 
                                                   ($post->status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800') }}">
                                                {{ ucfirst($post->status) }}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-center space-x-2 ml-4">
                                        <a href="{{ route('vendor.blog.edit', $post) }}" 
                                           class="text-sm px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200">
                                            Edit
                                        </a>
                                        
                                        <form action="{{ route('vendor.blog.delete', $post) }}" method="POST" class="inline" 
                                              onsubmit="return confirm('Are you sure you want to delete this post?')">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="text-sm px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    
                    <div class="mt-6">
                        {{ $posts->links() }}
                    </div>
                @else
                    <div class="text-center py-12">
                        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                            </svg>
                        </div>
                        <h3 class="mt-2 text-sm font-medium text-gray-900">No blog posts</h3>
                        <p class="mt-1 text-sm text-gray-500">Get started by writing your first blog post.</p>
                        <div class="mt-6">
                            <a href="{{ route('vendor.blog.create') }}" 
                               class="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                                Write New Post
                            </a>
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection