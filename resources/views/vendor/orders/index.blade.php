@extends('layouts.dashboard')

@section('title', 'الطلبات')

@section('content')
<div class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">الطلبات</h3>
            </div>

            <!-- Orders Table -->
            <div class="p-6.5">
                @if($orders->count() > 0)
                    <div class="overflow-x-auto">
                        <table class="w-full table-auto">
                            <thead>
                                <tr class="bg-gray-2 text-left dark:bg-meta-4">
                                    <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                        رقم الطلب
                                    </th>
                                    <th class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                        العميل
                                    </th>
                                    <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                        المبلغ
                                    </th>
                                    <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                        الحالة
                                    </th>
                                    <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                        التاريخ
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($orders as $order)
                                    <tr>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white font-medium">#{{ $order->order_number }}</p>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white">{{ $order->user->name }}</p>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white">${{ number_format($order->total_amount, 2) }}</p>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <span class="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                                                {{ $order->status }}
                                            </span>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white">{{ $order->created_at->format('Y-m-d') }}</p>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @else
                    <div class="text-center py-12">
                        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">لا توجد طلبات</h3>
                        <p class="mt-1 text-sm text-gray-500">لم تتلق أي طلبات بعد.</p>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection