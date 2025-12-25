@extends('layouts.dashboard')

@section('title', 'إعدادات المتجر')

@section('content')
<div class="mx-auto max-w-4xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">إعدادات المتجر</h3>
            </div>
            
            <form action="{{ route('vendor.store.update') }}" method="POST">
                @csrf
                @method('PATCH')
                <div class="p-6.5">
                    <div class="mb-4.5">
                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            اسم المتجر *
                        </label>
                        <input type="text" name="store_name" value="{{ $vendor->store_name }}" required
                            class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            placeholder="اسم المتجر" />
                    </div>

                    <div class="mb-4.5">
                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            وصف المتجر
                        </label>
                        <textarea name="store_description" rows="4"
                            class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            placeholder="وصف المتجر">{{ $vendor->store_description }}</textarea>
                    </div>

                    <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div class="w-full xl:w-1/2">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                رقم الهاتف
                            </label>
                            <input type="text" name="phone" value="{{ $vendor->phone }}"
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                placeholder="+966 50 123 4567" />
                        </div>

                        <div class="w-full xl:w-1/2">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                المدينة
                            </label>
                            <input type="text" name="city" value="{{ $vendor->city }}"
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                placeholder="الرياض" />
                        </div>
                    </div>

                    <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div class="w-full xl:w-1/2">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                البلد
                            </label>
                            <input type="text" name="country" value="{{ $vendor->country }}"
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                placeholder="السعودية" />
                        </div>
                    </div>

                    <div class="mb-6">
                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            العنوان
                        </label>
                        <textarea name="address" rows="3"
                            class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            placeholder="العنوان الكامل">{{ $vendor->address }}</textarea>
                    </div>

                    <button type="submit"
                        class="flex w-full justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90">
                        حفظ التغييرات
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection