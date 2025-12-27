@extends('layouts.dashboard')

@section('title', 'Job Listings')

@section('content')
<div class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">Job Listings Management</h3>
            </div>

            <!-- Jobs List -->
            <div class="p-6.5">
                <div class="text-center py-12">
                    <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No job listings found</h3>
                    <p class="mt-1 text-sm text-gray-500">Job listings will appear here when available.</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection