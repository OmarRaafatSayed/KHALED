@extends('layouts.dashboard')

@section('title', __('dashboard.vendor_management'))

@section('content')
<div class="p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">{{ __('dashboard.vendor_management') }}</h1>
        <div class="flex space-x-2">
            <select class="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="">جميع الحالات</option>
                <option value="pending">{{ __('dashboard.pending') }}</option>
                <option value="approved">{{ __('dashboard.approved') }}</option>
                <option value="rejected">{{ __('dashboard.rejected') }}</option>
            </select>
        </div>
    </div>

    <div class="bg-white shadow rounded-lg">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            المتجر
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            المالك
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {{ __('dashboard.subscription') }}
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الحالة
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {{ __('dashboard.products') }}
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الإجراءات
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @forelse($vendors as $vendor)
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10">
                                        <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <span class="text-sm font-medium text-indigo-700">
                                                {{ substr($vendor->store_name, 0, 2) }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">{{ $vendor->store_name }}</div>
                                        <div class="text-sm text-gray-500">{{ $vendor->store_slug }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ $vendor->user->name }}</div>
                                <div class="text-sm text-gray-500">{{ $vendor->user->email }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ $vendor->subscription->name }}</div>
                                <div class="text-sm text-gray-500">${{ $vendor->subscription->price }}/شهر</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex flex-col space-y-1">
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full 
                                        {{ $vendor->is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' }}">
                                        {{ $vendor->is_approved ? __('dashboard.approved') : __('dashboard.pending') }}
                                    </span>
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full 
                                        {{ $vendor->is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                        {{ $vendor->is_active ? __('dashboard.active') : __('dashboard.inactive') }}
                                    </span>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ $vendor->products_count ?? 0 }} منتج
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div class="flex space-x-2">
                                    @if(!$vendor->is_approved)
                                        <form method="POST" action="{{ route('superadmin.vendors.approve', $vendor) }}" class="inline">
                                            @csrf
                                            @method('PATCH')
                                            <button type="submit" class="text-green-600 hover:text-green-900">
                                                {{ __('dashboard.approve') }}
                                            </button>
                                        </form>
                                    @endif
                                    <form method="POST" action="{{ route('superadmin.vendors.toggle-status', $vendor) }}" class="inline">
                                        @csrf
                                        @method('PATCH')
                                        <button type="submit" class="text-blue-600 hover:text-blue-900">
                                            {{ $vendor->is_active ? __('dashboard.deactivate') : __('dashboard.activate') }}
                                        </button>
                                    </form>
                                    <a href="#" class="text-indigo-600 hover:text-indigo-900">{{ __('dashboard.view') }}</a>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                                {{ __('dashboard.no_data') }}
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        
        @if($vendors->hasPages())
            <div class="px-6 py-4 border-t border-gray-200">
                {{ $vendors->links() }}
            </div>
        @endif
    </div>
</div>
@endsection