@extends('layouts.dashboard')

@section('title', 'إضافة قسم جديد')

@section('content')
<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-title-md2 font-bold text-black dark:text-white">إضافة قسم جديد</h2>
    </div>

    <div class="grid grid-cols-5 gap-8">
        <div class="col-span-5 xl:col-span-3">
            <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div class="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 class="font-medium text-black dark:text-white">معلومات القسم</h3>
                </div>
                <div class="p-7">
                    <form action="{{ route('superadmin.categories.store') }}" method="POST">
                        @csrf
                        
                        <div class="mb-5.5">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="name">
                                اسم القسم
                            </label>
                            <input
                                class="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="أدخل اسم القسم"
                                required
                            />
                        </div>

                        <div class="mb-5.5">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="slug">
                                الرابط (Slug)
                            </label>
                            <input
                                class="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="slug"
                                id="slug"
                                placeholder="category-slug"
                                required
                            />
                        </div>

                        <div class="mb-5.5">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="parent_id">
                                القسم الأب
                            </label>
                            <select
                                class="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                name="parent_id"
                                id="parent_id"
                            >
                                <option value="">قسم رئيسي</option>
                                @foreach($parentCategories as $category)
                                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="mb-5.5">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="description">
                                الوصف
                            </label>
                            <textarea
                                class="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                name="description"
                                id="description"
                                rows="4"
                                placeholder="وصف القسم (اختياري)"
                            ></textarea>
                        </div>

                        <div class="mb-5.5">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="sort_order">
                                ترتيب العرض
                            </label>
                            <input
                                class="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="number"
                                name="sort_order"
                                id="sort_order"
                                placeholder="0"
                                min="0"
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
                                class="flex justify-center rounded bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
                                type="submit"
                            >
                                حفظ القسم
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection