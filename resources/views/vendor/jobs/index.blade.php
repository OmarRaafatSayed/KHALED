@extends('layouts.dashboard')

@section('title', __('dashboard.jobs'))

@section('content')
<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-title-md2 font-bold text-black dark:text-white">إدارة {{ __('dashboard.jobs') }}</h2>
        <a href="{{ route('vendor.jobs.create') }}" class="inline-flex items-center justify-center rounded-md bg-blue-600 px-10 py-4 text-center font-medium text-white hover:bg-blue-700">
            {{ __('dashboard.add') }} وظيفة جديدة
        </a>
    </div>

    <!-- Filter -->
    <div class="mb-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div class="px-4 py-4">
            <form method="GET" class="flex gap-4">
                <select name="status" class="rounded border border-stroke bg-gray px-4 py-2 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white">
                    <option value="">جميع الحالات</option>
                    <option value="draft" {{ request('status') == 'draft' ? 'selected' : '' }}>{{ __('dashboard.draft') }}</option>
                    <option value="active" {{ request('status') == 'active' ? 'selected' : '' }}>{{ __('dashboard.active') }}</option>
                    <option value="closed" {{ request('status') == 'closed' ? 'selected' : '' }}>مغلقة</option>
                    <option value="rejected" {{ request('status') == 'rejected' ? 'selected' : '' }}>{{ __('dashboard.rejected') }}</option>
                </select>
                <button type="submit" class="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
                    {{ __('dashboard.filter') }}
                </button>
            </form>
        </div>
    </div>

    <!-- Jobs List -->
    <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div class="px-4 py-6 md:px-6 xl:px-7.5">
            <h4 class="text-xl font-semibold text-black dark:text-white">قائمة {{ __('dashboard.jobs') }}</h4>
        </div>

        @forelse($jobs as $job)
        <div class="border-t border-stroke px-4 py-4.5 dark:border-strokedark">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <h5 class="font-medium text-black dark:text-white">{{ $job->title }}</h5>
                        <span class="inline-flex rounded-full px-3 py-1 text-xs font-medium
                            @if($job->status === 'active') bg-success bg-opacity-10 text-success
                            @elseif($job->status === 'draft') bg-warning bg-opacity-10 text-warning
                            @elseif($job->status === 'closed') bg-danger bg-opacity-10 text-danger
                            @else bg-gray-100 text-gray-600 @endif">
                            @if($job->status === 'active') {{ __('dashboard.active') }}
                            @elseif($job->status === 'draft') {{ __('dashboard.draft') }}
                            @elseif($job->status === 'closed') مغلقة
                            @else {{ __('dashboard.rejected') }} @endif
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">{{ $job->location }} • {{ ucfirst($job->type) }}</p>
                    @if($job->salary_min && $job->salary_max)
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        الراتب: ${{ number_format($job->salary_min) }} - ${{ number_format($job->salary_max) }}
                    </p>
                    @endif
                    <p class="text-xs text-gray-500">تم النشر: {{ $job->created_at->diffForHumans() }}</p>
                    @if($job->expires_at)
                    <p class="text-xs text-gray-500">تنتهي: {{ $job->expires_at->format('Y-m-d') }}</p>
                    @endif
                </div>
                <div class="flex items-center gap-2">
                    <a href="{{ route('vendor.jobs.show', $job) }}" class="inline-flex items-center justify-center rounded-md border-2 border-blue-600 px-4 py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50">
                        {{ __('dashboard.view') }}
                    </a>
                    <a href="{{ route('vendor.jobs.edit', $job) }}" class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700">
                        {{ __('dashboard.edit') }}
                    </a>
                    @if($job->status === 'active')
                    <form action="{{ route('vendor.jobs.toggle-status', $job) }}" method="POST" class="inline">
                        @csrf
                        @method('PATCH')
                        <button type="submit" class="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-orange-700">
                            إغلاق
                        </button>
                    </form>
                    @elseif($job->status === 'closed')
                    <form action="{{ route('vendor.jobs.toggle-status', $job) }}" method="POST" class="inline">
                        @csrf
                        @method('PATCH')
                        <button type="submit" class="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-700">
                            {{ __('dashboard.activate') }}
                        </button>
                    </form>
                    @endif
                </div>
            </div>
        </div>
        @empty
        <div class="px-4 py-6 text-center">
            <p class="text-gray-500">{{ __('dashboard.no_data') }}</p>
            <a href="{{ route('vendor.jobs.create') }}" class="mt-4 inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-center font-medium text-white hover:bg-blue-700">
                {{ __('dashboard.add') }} أول وظيفة
            </a>
        </div>
        @endforelse
    </div>

    <!-- Pagination -->
    @if($jobs->hasPages())
    <div class="mt-6">
        {{ $jobs->links() }}
    </div>
    @endif
</div>
@endsection