@extends('layouts.dashboard')

@section('title', 'إدارة الأقسام')

@section('content')
<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-title-md2 font-bold text-black dark:text-white">إدارة الأقسام</h2>
        <a href="{{ route('superadmin.categories.create') }}" class="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90">
            إضافة قسم جديد
        </a>
    </div>

    <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div class="px-4 py-6 md:px-6 xl:px-7.5">
            <h4 class="text-xl font-semibold text-black dark:text-white">قائمة الأقسام</h4>
        </div>

        <div class="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div class="col-span-2 flex items-center">
                <p class="font-medium">اسم القسم</p>
            </div>
            <div class="col-span-2 hidden items-center sm:flex">
                <p class="font-medium">القسم الأب</p>
            </div>
            <div class="col-span-1 flex items-center">
                <p class="font-medium">المنتجات</p>
            </div>
            <div class="col-span-1 flex items-center">
                <p class="font-medium">الحالة</p>
            </div>
            <div class="col-span-2 flex items-center">
                <p class="font-medium">الإجراءات</p>
            </div>
        </div>

        @forelse($categories as $category)
        <div class="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div class="col-span-2 flex items-center">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <p class="text-sm text-black dark:text-white">{{ $category->name }}</p>
                </div>
            </div>
            <div class="col-span-2 hidden items-center sm:flex">
                <p class="text-sm text-black dark:text-white">
                    {{ $category->parent ? $category->parent->name : 'قسم رئيسي' }}
                </p>
            </div>
            <div class="col-span-1 flex items-center">
                <p class="text-sm text-black dark:text-white">{{ $category->products_count }}</p>
            </div>
            <div class="col-span-1 flex items-center">
                <span class="inline-flex rounded-full px-3 py-1 text-xs font-medium
                    {{ $category->is_active ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger' }}">
                    {{ $category->is_active ? 'نشط' : 'غير نشط' }}
                </span>
            </div>
            <div class="col-span-2 flex items-center gap-2">
                <a href="{{ route('superadmin.categories.edit', $category) }}" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:bg-opacity-90">
                    تعديل
                </a>
                <form action="{{ route('superadmin.categories.toggle', $category) }}" method="POST" class="inline">
                    @csrf
                    @method('PATCH')
                    <button type="submit" class="inline-flex items-center justify-center rounded-md {{ $category->is_active ? 'bg-warning' : 'bg-success' }} px-4 py-2 text-center text-sm font-medium text-white hover:bg-opacity-90">
                        {{ $category->is_active ? 'إلغاء تفعيل' : 'تفعيل' }}
                    </button>
                </form>
                @if($category->products_count == 0)
                <form action="{{ route('superadmin.categories.delete', $category) }}" method="POST" class="inline" onsubmit="return confirm('هل أنت متأكد من حذف هذا القسم؟')">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="inline-flex items-center justify-center rounded-md bg-danger px-4 py-2 text-center text-sm font-medium text-white hover:bg-opacity-90">
                        حذف
                    </button>
                </form>
                @endif
            </div>
        </div>
        @empty
        <div class="px-4 py-6 text-center">
            <p class="text-gray-500">لا توجد أقسام حتى الآن</p>
        </div>
        @endforelse
    </div>

    @if($categories->hasPages())
    <div class="mt-6">
        {{ $categories->links() }}
    </div>
    @endif
</div>
@endsection