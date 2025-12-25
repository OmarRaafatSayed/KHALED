@extends('layouts.dashboard')

@section('title', 'Financial Reports')

@section('content')
<div class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-9">
        <!-- Monthly Revenue Chart -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">Monthly Revenue</h3>
            </div>
            
            <div class="p-6.5">
                @if($monthlyRevenue->count() > 0)
                    <div class="overflow-x-auto">
                        <table class="w-full table-auto">
                            <thead>
                                <tr class="bg-gray-2 text-left dark:bg-meta-4">
                                    <th class="px-4 py-4 font-medium text-black dark:text-white">Month</th>
                                    <th class="px-4 py-4 font-medium text-black dark:text-white">Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($monthlyRevenue as $revenue)
                                    <tr>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white">
                                                {{ DateTime::createFromFormat('!m', $revenue->month)->format('F') }} {{ $revenue->year }}
                                            </p>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white font-medium">
                                                ${{ number_format($revenue->revenue, 2) }}
                                            </p>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @else
                    <div class="text-center py-12">
                        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No revenue data</h3>
                        <p class="mt-1 text-sm text-gray-500">Start selling to see your revenue reports.</p>
                    </div>
                @endif
            </div>
        </div>

        <!-- Top Products -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">Top Selling Products</h3>
            </div>
            
            <div class="p-6.5">
                @if($topProducts->count() > 0)
                    <div class="overflow-x-auto">
                        <table class="w-full table-auto">
                            <thead>
                                <tr class="bg-gray-2 text-left dark:bg-meta-4">
                                    <th class="px-4 py-4 font-medium text-black dark:text-white">Product</th>
                                    <th class="px-4 py-4 font-medium text-black dark:text-white">Quantity Sold</th>
                                    <th class="px-4 py-4 font-medium text-black dark:text-white">Total Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($topProducts as $product)
                                    <tr>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white font-medium">{{ $product->name }}</p>
                                            <p class="text-sm text-gray-500">${{ number_format($product->price, 2) }}</p>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white">{{ $product->order_items_sum_quantity ?? 0 }}</p>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white font-medium">
                                                ${{ number_format($product->order_items_sum_price ?? 0, 2) }}
                                            </p>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @else
                    <div class="text-center py-12">
                        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No sales data</h3>
                        <p class="mt-1 text-sm text-gray-500">Your product sales will appear here once you start selling.</p>
                    </div>
                @endif
            </div>
        </div>

        <!-- Summary Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div class="p-6 text-center">
                    <h4 class="text-2xl font-bold text-blue-600">
                        ${{ number_format($monthlyRevenue->sum('revenue'), 2) }}
                    </h4>
                    <p class="text-gray-600 mt-2">Total Revenue</p>
                </div>
            </div>
            
            <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div class="p-6 text-center">
                    <h4 class="text-2xl font-bold text-green-600">
                        {{ $topProducts->sum('order_items_sum_quantity') }}
                    </h4>
                    <p class="text-gray-600 mt-2">Total Units Sold</p>
                </div>
            </div>
            
            <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div class="p-6 text-center">
                    <h4 class="text-2xl font-bold text-purple-600">
                        {{ $monthlyRevenue->count() }}
                    </h4>
                    <p class="text-gray-600 mt-2">Active Months</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection