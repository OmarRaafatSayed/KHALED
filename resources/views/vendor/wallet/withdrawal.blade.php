@extends('layouts.dashboard')

@section('title', 'طلب سحب')

@section('content')
<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-title-md2 font-bold text-black dark:text-white">طلب سحب</h2>
    </div>

    <div class="grid grid-cols-5 gap-8">
        <div class="col-span-5 xl:col-span-3">
            <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div class="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 class="font-medium text-black dark:text-white">معلومات السحب</h3>
                </div>
                <div class="p-7">
                    <form action="{{ route('vendor.wallet.withdrawal.submit') }}" method="POST">
                        @csrf
                        
                        <div class="mb-5.5">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="amount">
                                المبلغ المطلوب سحبه
                            </label>
                            <input
                                class="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="number"
                                name="amount"
                                id="amount"
                                placeholder="أدخل المبلغ"
                                min="10"
                                max="{{ $wallet->balance }}"
                                step="0.01"
                                required
                            />
                            <p class="mt-1 text-sm text-gray-500">الحد الأدنى للسحب: $10.00</p>
                            <p class="mt-1 text-sm text-gray-500">الرصيد المتاح: ${{ number_format($wallet->balance, 2) }}</p>
                        </div>

                        <div class="mb-5.5">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="bank_name">
                                اسم البنك
                            </label>
                            <input
                                class="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="bank_name"
                                id="bank_name"
                                placeholder="أدخل اسم البنك"
                                required
                            />
                        </div>

                        <div class="mb-5.5">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="account_number">
                                رقم الحساب
                            </label>
                            <input
                                class="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="account_number"
                                id="account_number"
                                placeholder="أدخل رقم الحساب"
                                required
                            />
                        </div>

                        <div class="mb-5.5">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="account_holder_name">
                                اسم صاحب الحساب
                            </label>
                            <input
                                class="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="account_holder_name"
                                id="account_holder_name"
                                placeholder="أدخل اسم صاحب الحساب"
                                required
                            />
                        </div>

                        <div class="flex justify-end gap-4.5">
                            <button
                                class="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="button"
                                onclick="history.back()"
                            >
                                إلغاء
                            </button>
                            <button
                                class="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                            >
                                إرسال طلب السحب
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-span-5 xl:col-span-2">
            <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div class="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 class="font-medium text-black dark:text-white">معلومات مهمة</h3>
                </div>
                <div class="p-7">
                    <div class="mb-4">
                        <h4 class="font-medium text-black dark:text-white mb-2">شروط السحب:</h4>
                        <ul class="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>الحد الأدنى للسحب: $10.00</li>
                            <li>يتم معالجة الطلبات خلال 24-48 ساعة</li>
                            <li>قد تطبق رسوم تحويل من البنك</li>
                            <li>تأكد من صحة بيانات الحساب البنكي</li>
                        </ul>
                    </div>
                    
                    <div class="mb-4">
                        <h4 class="font-medium text-black dark:text-white mb-2">حالة الرصيد:</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>الرصيد المتاح:</span>
                                <span class="font-medium">${{ number_format($wallet->balance, 2) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>الرصيد المعلق:</span>
                                <span class="font-medium">${{ number_format($wallet->pending_balance, 2) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection