@extends('layouts.dashboard')

@section('title', 'Write New Post')

@section('content')
<div class="mx-auto max-w-4xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">Write New Blog Post</h3>
            </div>

            <!-- Form -->
            <form action="{{ route('vendor.blog.store') }}" method="POST" enctype="multipart/form-data" class="p-6.5">
                @csrf
                
                <!-- Title -->
                <div class="mb-4.5">
                    <label class="mb-2.5 block text-black dark:text-white">Post Title *</label>
                    <input type="text" name="title" value="{{ old('title') }}" 
                           class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" 
                           placeholder="Enter post title" required>
                    @error('title')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Excerpt -->
                <div class="mb-4.5">
                    <label class="mb-2.5 block text-black dark:text-white">Excerpt</label>
                    <textarea name="excerpt" rows="3" 
                              class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" 
                              placeholder="Brief description of your post">{{ old('excerpt') }}</textarea>
                    @error('excerpt')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Featured Image -->
                <div class="mb-4.5">
                    <label class="mb-2.5 block text-black dark:text-white">Featured Image</label>
                    <input type="file" name="featured_image" accept="image/*" 
                           class="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary">
                    @error('featured_image')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Content -->
                <div class="mb-6">
                    <label class="mb-2.5 block text-black dark:text-white">Content *</label>
                    <textarea name="content" rows="15" 
                              class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" 
                              placeholder="Write your blog post content here..." required>{{ old('content') }}</textarea>
                    @error('content')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Submit Buttons -->
                <div class="flex items-center justify-end space-x-4">
                    <a href="{{ route('vendor.blog') }}" 
                       class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-gray-300 px-6 py-3 text-center font-medium text-gray-700 hover:bg-gray-400">
                        Cancel
                    </a>
                    <button type="submit" 
                            class="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-center font-medium text-white hover:bg-blue-700">
                        Publish Post
                    </button>
                </div>
                
                <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p class="text-sm text-yellow-800">
                        <strong>Note:</strong> Your post will be submitted for admin review before being published on the platform.
                    </p>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection