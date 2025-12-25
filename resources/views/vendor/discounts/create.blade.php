@extends('layouts.dashboard')

@section('title', 'إضافة خصم جديد')

@section('content')
<div class="mx-auto max-w-4xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">إضافة خصم جديد</h3>
            </div>
            
            <form action="{{ route('vendor.discounts.store') }}" method="POST">
                @csrf
                <div class="p-6.5">
                    <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <!-- اسم الخصم -->
                        <div class="w-full xl:w-1/2">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                اسم الخصم *
                            </label>
                            <input type="text" name="name" required
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                placeholder="مثل: خصم العملاء الجدد" />
                        </div>

                        <!-- كود الخصم -->
                        <div class="w-full xl:w-1/2">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                كود الخصم *
                            </label>
                            <input type="text" name="code" required
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                placeholder="مثل: NEW10" />
                        </div>
                    </div>

                    <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <!-- نوع الخصم -->
                        <div class="w-full xl:w-1/3">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                نوع الخصم *
                            </label>
                            <select name="type" required
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white">
                                <option value="percentage">نسبة مئوية</option>
                                <option value="fixed">مبلغ ثابت</option>
                            </select>
                        </div>

                        <!-- قيمة الخصم -->
                        <div class="w-full xl:w-1/3">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                قيمة الخصم *
                            </label>
                            <input type="number" name="value" step="0.01" min="0" required
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                placeholder="10" />
                        </div>

                        <!-- الحد الأدنى -->
                        <div class="w-full xl:w-1/3">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                الحد الأدنى للطلب
                            </label>
                            <input type="number" name="min_amount" step="0.01" min="0"
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                placeholder="100" />
                        </div>
                    </div>

                    <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <!-- الحد الأقصى للخصم -->
                        <div class="w-full xl:w-1/2">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                الحد الأقصى للخصم
                            </label>
                            <input type="number" name="max_discount" step="0.01" min="0"
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                placeholder="50" />
                        </div>

                        <!-- عدد مرات الاستخدام -->
                        <div class="w-full xl:w-1/2">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                عدد مرات الاستخدام
                            </label>
                            <input type="number" name="usage_limit" min="1"
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                placeholder="100" />
                        </div>
                    </div>

                    <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <!-- تاريخ البداية -->
                        <div class="w-full xl:w-1/2">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                تاريخ البداية *
                            </label>
                            <input type="datetime-local" name="starts_at" required
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white" />
                        </div>

                        <!-- تاريخ الانتهاء -->
                        <div class="w-full xl:w-1/2">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                تاريخ الانتهاء *
                            </label>
                            <input type="datetime-local" name="expires_at" required
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white" />
                        </div>
                    </div>

                    <!-- أزرار الحفظ -->
                    <div class="flex gap-4">
                        <a href="{{ route('vendor.discounts') }}" 
                           class="flex w-full justify-center rounded bg-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-400">
                            إلغاء
                        </a>
                        <button type="submit"
                            class="flex w-full justify-center rounded bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700">
                            حفظ الخصم
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection