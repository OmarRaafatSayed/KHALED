@extends('layouts.dashboard')

@section('title', 'تعديل الخصم')

@section('content')
<div class="mx-auto max-w-4xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">تعديل الخصم</h3>
            </div>

            <!-- Form -->
            <form action="{{ route('vendor.discounts.update', $discount) }}" method="POST" class="p-6.5">
                @csrf
                @method('PATCH')
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Discount Name -->
                    <div>
                        <label class="mb-2.5 block text-black dark:text-white">اسم الخصم</label>
                        <input type="text" name="name" value="{{ old('name', $discount->name) }}" 
                               class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" 
                               required>
                        @error('name')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Discount Code -->
                    <div>
                        <label class="mb-2.5 block text-black dark:text-white">كود الخصم</label>
                        <input type="text" name="code" value="{{ old('code', $discount->code) }}" 
                               class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" 
                               required>
                        @error('code')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Discount Type -->
                    <div>
                        <label class="mb-2.5 block text-black dark:text-white">نوع الخصم</label>
                        <select name="type" class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required>
                            <option value="percentage" {{ old('type', $discount->type) === 'percentage' ? 'selected' : '' }}>نسبة مئوية</option>
                            <option value="fixed" {{ old('type', $discount->type) === 'fixed' ? 'selected' : '' }}>مبلغ ثابت</option>
                        </select>
                        @error('type')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Discount Value -->
                    <div>
                        <label class="mb-2.5 block text-black dark:text-white">قيمة الخصم</label>
                        <input type="number" name="value" value="{{ old('value', $discount->value) }}" step="0.01" min="0" 
                               class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" 
                               required>
                        @error('value')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Minimum Amount -->
                    <div>
                        <label class="mb-2.5 block text-black dark:text-white">الحد الأدنى للطلب</label>
                        <input type="number" name="min_amount" value="{{ old('min_amount', $discount->min_amount) }}" step="0.01" min="0" 
                               class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                        @error('min_amount')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Usage Limit -->
                    <div>
                        <label class="mb-2.5 block text-black dark:text-white">حد الاستخدام</label>
                        <input type="number" name="usage_limit" value="{{ old('usage_limit', $discount->usage_limit) }}" min="1" 
                               class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                        @error('usage_limit')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Start Date -->
                    <div>
                        <label class="mb-2.5 block text-black dark:text-white">تاريخ البداية</label>
                        <input type="datetime-local" name="starts_at" value="{{ old('starts_at', $discount->starts_at->format('Y-m-d\TH:i')) }}" 
                               class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" 
                               required>
                        @error('starts_at')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- End Date -->
                    <div>
                        <label class="mb-2.5 block text-black dark:text-white">تاريخ الانتهاء</label>
                        <input type="datetime-local" name="expires_at" value="{{ old('expires_at', $discount->expires_at->format('Y-m-d\TH:i')) }}" 
                               class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" 
                               required>
                        @error('expires_at')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <!-- Submit Buttons -->
                <div class="flex items-center justify-end space-x-4 mt-6">
                    <a href="{{ route('vendor.discounts') }}" 
                       class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-gray-300 px-6 py-3 text-center font-medium text-gray-700 hover:bg-gray-400">
                        إلغاء
                    </a>
                    <button type="submit" 
                            class="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-center font-medium text-white hover:bg-blue-700">
                        تحديث الخصم
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection