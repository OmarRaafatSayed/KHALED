@extends('layouts.dashboard')

@section('title', 'سجل السحوبات')

@section('content')
<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-title-md2 font-bold text-black dark:text-white">سجل السحوبات</h2>
        <a href="{{ route('vendor.wallet.withdrawal') }}" class="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90">
            طلب سحب جديد
        </a>
    </div>

    <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div class="px-4 py-6 md:px-6 xl:px-7.5">
            <h4 class="text-xl font-semibold text-black dark:text-white">طلبات السحب</h4>
        </div>

        @forelse($withdrawals as $withdrawal)
        <div class="border-t border-stroke px-4 py-4.5 dark:border-strokedark">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <h5 class="font-medium text-black dark:text-white">${{ number_format($withdrawal->amount, 2) }}</h5>
                        <span class="inline-flex rounded-full px-3 py-1 text-xs font-medium
                            @if($withdrawal->status === 'pending') bg-warning bg-opacity-10 text-warning
                            @elseif($withdrawal->status === 'approved') bg-success bg-opacity-10 text-success
                            @else bg-danger bg-opacity-10 text-danger @endif">
                            @if($withdrawal->status === 'pending') معلق
                            @elseif($withdrawal->status === 'approved') موافق عليه
                            @else مرفوض @endif
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        البنك: {{ $withdrawal->bank_name }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        رقم الحساب: {{ $withdrawal->account_number }}
                    </p>
                    <p class="text-xs text-gray-500">{{ $withdrawal->created_at->format('Y-m-d H:i') }}</p>
                    @if($withdrawal->admin_notes)
                    <p class="text-xs text-red-500 mt-1">{{ $withdrawal->admin_notes }}</p>
                    @endif
                </div>
            </div>
        </div>
        @empty
        <div class="px-4 py-6 text-center">
            <p class="text-gray-500">لا توجد طلبات سحب</p>
        </div>
        @endforelse
    </div>

    @if($withdrawals->hasPages())
    <div class="mt-6">
        {{ $withdrawals->links() }}
    </div>
    @endif
</div>
@endsection