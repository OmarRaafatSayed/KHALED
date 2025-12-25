@extends('layouts.dashboard')

@section('title', 'الخصومات')

@section('content')
<div class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <div class="flex items-center justify-between">
                    <h3 class="font-medium text-black dark:text-white">الخصومات</h3>
                    <a href="{{ route('vendor.discounts.create') }}" 
                        class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-blue-700">
                        إضافة خصم جديد
                    </a>
                </div>
            </div>

            <!-- Discounts Table -->
            <div class="p-6.5">
                @if($discounts->count() > 0)
                    <div class="overflow-x-auto">
                        <table class="w-full table-auto">
                            <thead>
                                <tr class="bg-gray-2 text-left dark:bg-meta-4">
                                    <th class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                        اسم الخصم
                                    </th>
                                    <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                        الكود
                                    </th>
                                    <th class="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                                        القيمة
                                    </th>
                                    <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                        الاستخدام
                                    </th>
                                    <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                        الحالة
                                    </th>
                                    <th class="px-4 py-4 font-medium text-black dark:text-white">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($discounts as $discount)
                                    <tr>
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
                                            @if($discount->is_active && $discount->isValid())
                                                <span class="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                                                    نشط
                                                </span>
                                            @else
                                                <span class="inline-flex rounded-full bg-danger bg-opacity-10 px-3 py-1 text-sm font-medium text-danger">
                                                    غير نشط
                                                </span>
                                            @endif
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <div class="flex items-center space-x-2">
                                                <form action="{{ route('vendor.discounts.toggle', $discount) }}" method="POST" class="inline">
                                                    @csrf
                                                    @method('PATCH')
                                                    <button type="submit" class="text-sm px-3 py-1 rounded {{ $discount->is_active ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200' }}">
                                                        @if($discount->is_active)
                                                            إيقاف
                                                        @else
                                                            تفعيل
                                                        @endif
                                                    </button>
                                                </form>
                                                
                                                <a href="{{ route('vendor.discounts.edit', $discount) }}" class="text-sm px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200">
                                                    تعديل
                                                </a>
                                                
                                                <form action="{{ route('vendor.discounts.delete', $discount) }}" method="POST" class="inline" onsubmit="return confirm('هل أنت متأكد من حذف هذا الخصم؟')">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="text-sm px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
                                                        حذف
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @else
                    <div class="text-center py-12">
                        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">لا توجد خصومات</h3>
                        <p class="mt-1 text-sm text-gray-500">ابدأ بإضافة خصم جديد.</p>
                        <div class="mt-6">
                            <a href="{{ route('vendor.discounts.create') }}" 
                               class="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                                إضافة خصم جديد
                            </a>
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection