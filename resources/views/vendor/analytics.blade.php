@extends('layouts.dashboard')

@section('title', 'التحليلات')

@section('content')
<div class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">التحليلات</h3>
            </div>

            <div class="p-6.5">
                <!-- Sales Chart -->
                <div class="mb-8">
                    <h4 class="mb-4 text-lg font-medium text-black dark:text-white">المبيعات خلال آخر 30 يوم</h4>
                    <div class="h-64 bg-gray-50 dark:bg-gray-800 rounded flex items-center justify-center">
                        <p class="text-gray-500">رسم بياني للمبيعات (يتطلب Chart.js)</p>
                    </div>
                </div>

                <!-- Top Products -->
                <div>
                    <h4 class="mb-4 text-lg font-medium text-black dark:text-white">أفضل المنتجات مبيعاً</h4>
                    @if($topProducts->count() > 0)
                        <div class="overflow-x-auto">
                            <table class="w-full table-auto">
                                <thead>
                                    <tr class="bg-gray-2 text-left dark:bg-meta-4">
                                        <th class="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                                            المنتج
                                        </th>
                                        <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                            الكمية المباعة
                                        </th>
                                        <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                            السعر
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($topProducts as $product)
                                        <tr>
                                            <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                <p class="text-black dark:text-white font-medium">{{ $product->name }}</p>
                                            </td>
                                            <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                <p class="text-black dark:text-white">{{ $product->order_items_sum_quantity ?? 0 }}</p>
                                            </td>
                                            <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                <p class="text-black dark:text-white">${{ number_format($product->price, 2) }}</p>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    @else
                        <div class="text-center py-8">
                            <p class="text-gray-500">لا توجد بيانات مبيعات بعد</p>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection