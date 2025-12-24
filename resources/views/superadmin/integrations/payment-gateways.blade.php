@extends('layouts.dashboard')

@section('title', 'Payment Gateways')

@section('content')
<div class="p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Payment Gateways</h1>
        <div class="text-sm text-gray-500">
            Configure payment methods for your marketplace
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        @forelse($gateways as $gateway)
            <div class="bg-white rounded-lg shadow-md border {{ $gateway->is_active ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200' }}">
                @if($gateway->is_active)
                    <div class="bg-green-500 text-white text-center py-2 rounded-t-lg">
                        <span class="text-sm font-medium">✓ Active</span>
                    </div>
                @endif
                
                <div class="p-6">
                    <div class="flex items-center mb-4">
                        <div class="flex-shrink-0">
                            @if($gateway->slug === 'paymob')
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span class="text-blue-600 font-bold text-lg">P</span>
                                </div>
                            @elseif($gateway->slug === 'stripe')
                                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <span class="text-purple-600 font-bold text-lg">S</span>
                                </div>
                            @elseif($gateway->slug === 'paypal')
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span class="text-blue-600 font-bold text-lg">PP</span>
                                </div>
                            @endif
                        </div>
                        <div class="ml-4">
                            <h3 class="text-lg font-semibold text-gray-900">{{ $gateway->name }}</h3>
                            <div class="flex items-center space-x-2">
                                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full 
                                    {{ $gateway->is_sandbox ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800' }}">
                                    {{ $gateway->is_sandbox ? 'Sandbox' : 'Live' }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <p class="text-sm text-gray-600 mb-4">{{ $gateway->description }}</p>

                    <div class="space-y-3 mb-6">
                        @if($gateway->slug === 'paymob')
                            <div class="text-sm">
                                <span class="font-medium text-gray-700">Supports:</span>
                                <div class="mt-1 flex flex-wrap gap-1">
                                    <span class="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Credit Cards</span>
                                    <span class="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Fawry</span>
                                    <span class="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Vodafone Cash</span>
                                    <span class="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Orange Money</span>
                                </div>
                            </div>
                        @elseif($gateway->slug === 'stripe')
                            <div class="text-sm">
                                <span class="font-medium text-gray-700">Supports:</span>
                                <div class="mt-1 flex flex-wrap gap-1">
                                    <span class="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Credit Cards</span>
                                    <span class="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Apple Pay</span>
                                    <span class="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Google Pay</span>
                                </div>
                            </div>
                        @elseif($gateway->slug === 'paypal')
                            <div class="text-sm">
                                <span class="font-medium text-gray-700">Supports:</span>
                                <div class="mt-1 flex flex-wrap gap-1">
                                    <span class="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">PayPal Balance</span>
                                    <span class="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Credit Cards</span>
                                    <span class="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Bank Transfer</span>
                                </div>
                            </div>
                        @endif
                    </div>

                    <div class="border-t pt-4">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-sm text-gray-600">Configuration:</span>
                            <span class="text-sm font-medium {{ count(array_filter($gateway->config ?? [])) > 0 ? 'text-green-600' : 'text-red-600' }}">
                                {{ count(array_filter($gateway->config ?? [])) > 0 ? 'Configured' : 'Not Configured' }}
                            </span>
                        </div>
                        
                        <div class="flex space-x-2">
                            <button onclick="configureGateway('{{ $gateway->slug }}')" 
                                    class="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 py-2 px-3 rounded text-sm font-medium">
                                Configure
                            </button>
                            <button onclick="toggleGateway('{{ $gateway->id }}')" 
                                    class="flex-1 {{ $gateway->is_active ? 'bg-red-100 hover:bg-red-200 text-red-800' : 'bg-green-100 hover:bg-green-200 text-green-800' }} py-2 px-3 rounded text-sm font-medium">
                                {{ $gateway->is_active ? 'Disable' : 'Enable' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        @empty
            <div class="col-span-full text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No payment gateways</h3>
                <p class="mt-1 text-sm text-gray-500">Payment gateways will appear here once configured.</p>
            </div>
        @endforelse
    </div>

    <!-- Configuration Modal (placeholder) -->
    <div id="configModal" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div class="mt-3">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Configure Payment Gateway</h3>
                <p class="text-sm text-gray-600 mb-4">Gateway configuration will be implemented in the next phase.</p>
                <div class="flex justify-end">
                    <button onclick="closeModal()" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function configureGateway(slug) {
    document.getElementById('configModal').classList.remove('hidden');
}

function toggleGateway(id) {
    // This will be implemented with actual API calls
    alert('Gateway toggle functionality will be implemented in the next phase.');
}

function closeModal() {
    document.getElementById('configModal').classList.add('hidden');
}
</script>
@endsection