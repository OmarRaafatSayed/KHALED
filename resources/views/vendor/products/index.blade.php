@extends('layouts.dashboard')

@section('title', 'منتجاتي')

@section('content')
<div class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <div class="flex items-center justify-between">
                    <h3 class="font-medium text-black dark:text-white">منتجاتي</h3>
                    <a href="{{ route('vendor.products.create') }}" 
                        class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90">
                        إضافة منتج جديد
                    </a>
                </div>
            </div>

            <!-- Filters -->
            <div class="p-6.5 border-b border-stroke dark:border-strokedark">
                <form method="GET" class="flex flex-wrap gap-4">
                    <div class="flex-1 min-w-48">
                        <select name="status" class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white">
                            <option value="">جميع الحالات</option>
                            <option value="draft" {{ request('status') == 'draft' ? 'selected' : '' }}>مسودة</option>
                            <option value="pending" {{ request('status') == 'pending' ? 'selected' : '' }}>قيد المراجعة</option>
                            <option value="active" {{ request('status') == 'active' ? 'selected' : '' }}>نشط</option>
                            <option value="inactive" {{ request('status') == 'inactive' ? 'selected' : '' }}>غير نشط</option>
                        </select>
                    </div>
                    <div class="flex-1 min-w-48">
                        <select name="category" class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white">
                            <option value="">جميع الفئات</option>
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}" {{ request('category') == $category->id ? 'selected' : '' }}>
                                    {{ $category->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <button type="submit" class="rounded bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90">
                        فلترة
                    </button>
                </form>
            </div>

            <!-- Products Table -->
            <div class="p-6.5">
                @if($products->count() > 0)
                    <div class="overflow-x-auto">
                        <table class="w-full table-auto">
                            <thead>
                                <tr class="bg-gray-2 text-left dark:bg-meta-4">
                                    <th class="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                        المنتج
                                    </th>
                                    <th class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                        الفئة
                                    </th>
                                    <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                        السعر
                                    </th>
                                    <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                        الكمية
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
                                @foreach($products as $product)
                                    <tr>
                                        <td class="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                            <div class="flex items-center gap-3">
                                                @if(!empty($product->images))
                                                    <div class="h-12 w-12 rounded-md overflow-hidden">
                                                        <img src="{{ asset('storage/' . ($product->images[0]['paths']['thumbnail'] ?? $product->images[0]['paths']['original'])) }}" 
                                                             alt="{{ $product->name }}" class="h-full w-full object-cover">
                                                    </div>
                                                @else
                                                    <div class="h-12 w-12 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                        <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                        </svg>
                                                    </div>
                                                @endif
                                                <div>
                                                    <h5 class="font-medium text-black dark:text-white">
                                                        {{ $product->name }}
                                                    </h5>
                                                    <p class="text-sm text-gray-500">{{ $product->sku }}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white">{{ $product->category->name }}</p>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white">${{ number_format($product->price, 2) }}</p>
                                            @if($product->compare_price)
                                                <p class="text-sm text-gray-500 line-through">${{ number_format($product->compare_price, 2) }}</p>
                                            @endif
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p class="text-black dark:text-white">{{ $product->quantity }}</p>
                                            @if($product->variants->count() > 0)
                                                <p class="text-sm text-gray-500">{{ $product->variants->count() }} متغير</p>
                                            @endif
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            @switch($product->status)
                                                @case('active')
                                                    <span class="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                                                        نشط
                                                    </span>
                                                    @break
                                                @case('pending')
                                                    <span class="inline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning">
                                                        قيد المراجعة
                                                    </span>
                                                    @break
                                                @case('draft')
                                                    <span class="inline-flex rounded-full bg-gray bg-opacity-10 px-3 py-1 text-sm font-medium text-gray">
                                                        مسودة
                                                    </span>
                                                    @break
                                                @default
                                                    <span class="inline-flex rounded-full bg-danger bg-opacity-10 px-3 py-1 text-sm font-medium text-danger">
                                                        غير نشط
                                                    </span>
                                            @endswitch
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <div class="flex items-center space-x-3.5">
                                                <a href="{{ route('vendor.products.show', $product) }}" 
                                                   class="hover:text-primary">
                                                    <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                        <path d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.2031 8.99981 13.2031C13.1061 13.2031 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.79686 8.99981 4.79686C4.89356 4.79686 2.4748 7.95936 1.85605 8.99999Z"/>
                                                        <path d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 8.10938C8.50313 8.10938 8.10938 8.50313 8.10938 9C8.10938 9.49688 8.50313 9.89063 9 9.89063C9.49688 9.89063 9.89063 9.49688 9.89063 9C9.89063 8.50313 9.49688 8.10938 9 8.10938Z"/>
                                                    </svg>
                                                </a>
                                                <a href="{{ route('vendor.products.edit', $product) }}" 
                                                   class="hover:text-primary">
                                                    <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                        <path d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.2031 8.99981 13.2031C13.1061 13.2031 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.79686 8.99981 4.79686C4.89356 4.79686 2.4748 7.95936 1.85605 8.99999Z"/>
                                                    </svg>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="mt-6">
                        {{ $products->links() }}
                    </div>
                @else
                    <div class="text-center py-12">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">لا توجد منتجات</h3>
                        <p class="mt-1 text-sm text-gray-500">ابدأ بإضافة منتجك الأول.</p>
                        <div class="mt-6">
                            <a href="{{ route('vendor.products.create') }}" 
                               class="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90">
                                إضافة منتج جديد
                            </a>
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection