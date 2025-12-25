@extends('layouts.dashboard')

@section('title', 'Discount Management')

@section('content')
<div class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">All Discounts</h3>
            </div>

            <!-- Discounts Table -->
            <div class="p-6.5">
                @if($discounts->count() > 0)
                    <div class="overflow-x-auto">
                        <table class="w-full table-auto">
                            <thead>
                                <tr class="bg-gray-2 text-left dark:bg-meta-4">
                                    <th class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                        Vendor
                                    </th>
                                    <th class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                        Discount Name
                                    </th>
                                    <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                        Code
                                    </th>
                                    <th class="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                                        Value
                                    </th>
                                    <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                        Usage
                                    </th>
                                    <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                        Status
                                    </th>
                                    <th class="px-4 py-4 font-medium text-black dark:text-white">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($discounts as $discount)
                                    <tr>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white font-medium">{{ $discount->vendor->user->name }}</p>
                                            <p class="text-sm text-gray-500">{{ $discount->vendor->store_name }}</p>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white font-medium">{{ $discount->name }}</p>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">{{ $discount->code }}</code>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white">
                                                @if($discount->type === 'percentage')
                                                    {{ $discount->value }}%
                                                @else
                                                    ${{ number_format($discount->value, 2) }}
                                                @endif
                                            </p>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white">
                                                {{ $discount->used_count }}
                                                @if($discount->usage_limit)
                                                    / {{ $discount->usage_limit }}
                                                @endif
                                            </p>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            @if($discount->is_active)
                                                <span class="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                                                    Active
                                                </span>
                                            @else
                                                <span class="inline-flex rounded-full bg-danger bg-opacity-10 px-3 py-1 text-sm font-medium text-danger">
                                                    Inactive
                                                </span>
                                            @endif
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <form action="{{ route('superadmin.discounts.toggle', $discount) }}" method="POST" class="inline">
                                                @csrf
                                                @method('PATCH')
                                                <button type="submit" class="hover:text-primary">
                                                    @if($discount->is_active)
                                                        Disable
                                                    @else
                                                        Enable
                                                    @endif
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="mt-6">
                        {{ $discounts->links() }}
                    </div>
                @else
                    <div class="text-center py-12">
                        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No discounts found</h3>
                        <p class="mt-1 text-sm text-gray-500">No vendors have created discounts yet.</p>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection