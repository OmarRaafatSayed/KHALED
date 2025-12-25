@extends('layouts.dashboard')

@section('title', __('dashboard.product_approval'))

@section('content')
<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-title-md2 font-bold text-black dark:text-white">{{ __('dashboard.product_approval') }}</h2>
    </div>

    <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div class="px-4 py-6 md:px-6 xl:px-7.5">
            <h4 class="text-xl font-semibold text-black dark:text-white">المنتجات المعلقة</h4>
        </div>

        @forelse($products as $product)
        <div class="border-t border-stroke px-4 py-4.5 dark:border-strokedark">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <h5 class="font-medium text-black dark:text-white">{{ $product->name }}</h5>
                        <span class="inline-flex rounded-full px-3 py-1 text-xs font-medium bg-warning bg-opacity-10 text-warning">
                            {{ __('dashboard.pending') }}
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        التاجر: {{ $product->vendor->user->name }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        القسم: {{ $product->category->name }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        السعر: ${{ number_format($product->price, 2) }}
                    </p>
                    <p class="text-xs text-gray-500">تاريخ الإضافة: {{ $product->created_at->format('Y-m-d H:i') }}</p>
                </div>
                <div class="flex items-center gap-2">
                    <form action="{{ route('superadmin.products.approve', $product) }}" method="POST" class="inline">
                        @csrf
                        @method('PATCH')
                        <button type="submit" class="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-700" onclick="return confirm('هل أنت متأكد من الموافقة على هذا المنتج؟')">
                            {{ __('dashboard.approve') }}
                        </button>
                    </form>
                    <button onclick="showRejectModal({{ $product->id }})" class="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-700">
                        {{ __('dashboard.reject') }}
                    </button>
                </div>
            </div>
        </div>
        @empty
        <div class="px-4 py-6 text-center">
            <p class="text-gray-500">{{ __('dashboard.no_data') }}</p>
        </div>
        @endforelse
    </div>

    @if($products->hasPages())
    <div class="mt-6">
        {{ $products->links() }}
    </div>
    @endif
</div>

<!-- Reject Modal -->
<div id="rejectModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black bg-opacity-50">
    <div class="mx-4 w-full max-w-md rounded-lg bg-white p-6 dark:bg-boxdark">
        <h3 class="mb-4 text-lg font-medium text-black dark:text-white">رفض المنتج</h3>
        <form id="rejectForm" method="POST">
            @csrf
            @method('PATCH')
            <div class="mb-4">
                <label class="mb-2 block text-sm font-medium text-black dark:text-white">سبب الرفض</label>
                <textarea name="reason" rows="3" class="w-full rounded border border-stroke bg-gray px-4 py-3 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white" required></textarea>
            </div>
            <div class="flex justify-end gap-4">
                <button type="button" onclick="hideRejectModal()" class="rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
                    {{ __('dashboard.cancel') }}
                </button>
                <button type="submit" class="rounded bg-red-600 px-6 py-2 font-medium text-white hover:bg-red-700">
                    {{ __('dashboard.reject') }}
                </button>
            </div>
        </form>
    </div>
</div>

<script>
function showRejectModal(productId) {
    document.getElementById('rejectForm').action = `/superadmin/products/${productId}/reject`;
    document.getElementById('rejectModal').classList.remove('hidden');
    document.getElementById('rejectModal').classList.add('flex');
}

function hideRejectModal() {
    document.getElementById('rejectModal').classList.add('hidden');
    document.getElementById('rejectModal').classList.remove('flex');
}
</script>
@endsection