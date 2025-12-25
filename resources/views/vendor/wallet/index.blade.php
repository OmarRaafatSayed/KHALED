@extends('layouts.dashboard')

@section('title', __('dashboard.wallet'))

@section('content')
<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-title-md2 font-bold text-black dark:text-white">{{ __('dashboard.wallet') }}</h2>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-6">
        <div class="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="mt-4 flex items-end justify-between">
                <div>
                    <h4 class="text-title-md font-bold text-black dark:text-white">
                        ${{ number_format($wallet->balance, 2) }}
                    </h4>
                    <span class="text-sm font-medium">{{ __('dashboard.available_balance') }}</span>
                </div>
            </div>
        </div>

        <div class="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="mt-4 flex items-end justify-between">
                <div>
                    <h4 class="text-title-md font-bold text-black dark:text-white">
                        ${{ number_format($wallet->pending_balance, 2) }}
                    </h4>
                    <span class="text-sm font-medium">{{ __('dashboard.pending_balance') }}</span>
                </div>
            </div>
        </div>

        <div class="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="mt-4 flex items-end justify-between">
                <div>
                    <h4 class="text-title-md font-bold text-black dark:text-white">
                        ${{ number_format($wallet->total_earnings, 2) }}
                    </h4>
                    <span class="text-sm font-medium">{{ __('dashboard.total_earnings') }}</span>
                </div>
            </div>
        </div>

        <div class="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="mt-4 flex items-end justify-between">
                <div>
                    <h4 class="text-title-md font-bold text-black dark:text-white">
                        ${{ number_format($wallet->total_withdrawn, 2) }}
                    </h4>
                    <span class="text-sm font-medium">{{ __('dashboard.total_withdrawn') }}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="mb-6 flex gap-4">
        <a href="{{ route('vendor.wallet.withdrawal') }}" class="inline-flex items-center justify-center rounded-md bg-blue-600 px-10 py-4 text-center font-medium text-white hover:bg-blue-700">
            {{ __('dashboard.withdrawal_request') }}
        </a>
        <a href="{{ route('vendor.wallet.withdrawals') }}" class="inline-flex items-center justify-center rounded-md border-2 border-blue-600 px-10 py-4 text-center font-medium text-blue-600 hover:bg-blue-50">
            {{ __('dashboard.withdrawal_history') }}
        </a>
    </div>

    <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div class="px-4 py-6 md:px-6 xl:px-7.5">
            <h4 class="text-xl font-semibold text-black dark:text-white">آخر المعاملات</h4>
        </div>

        @forelse($transactions as $transaction)
        <div class="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark">
            <div class="col-span-2 flex items-center">
                <p class="text-sm text-black dark:text-white">
                    @if($transaction->type === 'credit')
                        <span class="text-meta-3">إيداع</span>
                    @else
                        <span class="text-meta-1">سحب</span>
                    @endif
                </p>
            </div>
            <div class="col-span-2 flex items-center">
                <p class="text-sm text-black dark:text-white">
                    ${{ number_format($transaction->amount, 2) }}
                </p>
            </div>
            <div class="col-span-2 flex items-center">
                <p class="text-sm text-black dark:text-white">
                    {{ $transaction->description }}
                </p>
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