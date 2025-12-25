@extends('layouts.dashboard')

@section('title', 'System Settings')

@section('content')
<div class="p-6">
    <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">System Settings</h1>
        <p class="text-gray-600">Configure your marketplace settings</p>
    </div>

    <form method="POST" action="{{ route('superadmin.system.settings.update') }}" enctype="multipart/form-data">
        @csrf
        @method('PATCH')
        
        <div class="space-y-8">
            @foreach($settings as $group => $groupSettings)
                <div class="bg-white shadow rounded-lg">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-medium text-gray-900 capitalize">
                            {{ str_replace('_', ' ', $group) }} Settings
                        </h3>
                    </div>
                    
                    <div class="p-6 space-y-6">
                        @foreach($groupSettings as $setting)
                            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div class="lg:col-span-1">
                                    <label for="{{ $setting->key }}" class="block text-sm font-medium text-gray-700">
                                        {{ ucwords(str_replace('_', ' ', $setting->key)) }}
                                    </label>
                                    @if($setting->description)
                                        <p class="mt-1 text-sm text-gray-500">{{ $setting->description }}</p>
                                    @endif
                                </div>
                                
                                <div class="lg:col-span-2">
                                    @if($setting->type === 'boolean')
                                        <div class="flex items-center">
                                            <input type="checkbox" 
                                                   id="{{ $setting->key }}" 
                                                   name="settings[{{ $setting->key }}]" 
                                                   value="1"
                                                   {{ $setting->value ? 'checked' : '' }}
                                                   class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                                            <label for="{{ $setting->key }}" class="ml-2 block text-sm text-gray-900">
                                                Enable
                                            </label>
                                        </div>
                                    
                                    @elseif($setting->type === 'select' && $setting->key === 'default_language')
                                        <select id="{{ $setting->key }}" 
                                                name="settings[{{ $setting->key }}]"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                            <option value="en" {{ $setting->value === 'en' ? 'selected' : '' }}>English</option>
                                            <option value="ar" {{ $setting->value === 'ar' ? 'selected' : '' }}>العربية</option>
                                        </select>
                                    
                                    @elseif($setting->type === 'select' && $setting->key === 'default_currency')
                                        <select id="{{ $setting->key }}" 
                                                name="settings[{{ $setting->key }}]"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                            @foreach(['USD', 'EUR', 'EGP', 'SAR', 'AED', 'GBP'] as $currency)
                                                <option value="{{ $currency }}" {{ $setting->value === $currency ? 'selected' : '' }}>
                                                    {{ $currency }}
                                                </option>
                                            @endforeach
                                        </select>
                                    
                                    @elseif($setting->type === 'number')
                                        <input type="number" 
                                               id="{{ $setting->key }}" 
                                               name="settings[{{ $setting->key }}]" 
                                               value="{{ $setting->value }}"
                                               step="0.01"
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    
                                    @elseif($setting->type === 'email')
                                        <input type="email" 
                                               id="{{ $setting->key }}" 
                                               name="settings[{{ $setting->key }}]" 
                                               value="{{ $setting->value }}"
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    
                                    @elseif($setting->type === 'password')
                                        <input type="password" 
                                               id="{{ $setting->key }}" 
                                               name="settings[{{ $setting->key }}]" 
                                               value="{{ $setting->value }}"
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    
                                    @elseif($setting->type === 'text')
                                        <textarea id="{{ $setting->key }}" 
                                                  name="settings[{{ $setting->key }}]" 
                                                  rows="3"
                                                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">{{ $setting->value }}</textarea>
                                    
                                    @elseif($setting->type === 'file')
                                        <input type="file" 
                                               id="{{ $setting->key }}" 
                                               name="settings[{{ $setting->key }}]" 
                                               accept="image/*"
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                        @if($setting->value)
                                            <p class="mt-1 text-sm text-gray-500">Current: {{ $setting->value }}</p>
                                        @endif
                                    
                                    @elseif($setting->type === 'array' && $setting->key === 'supported_currencies')
                                        <div class="space-y-2">
                                            @foreach(['USD', 'EUR', 'EGP', 'SAR', 'AED', 'GBP', 'JPY'] as $currency)
                                                <div class="flex items-center">
                                                    <input type="checkbox" 
                                                           id="currency_{{ $currency }}" 
                                                           name="settings[{{ $setting->key }}][]" 
                                                           value="{{ $currency }}"
                                                           {{ in_array($currency, $setting->value ?? []) ? 'checked' : '' }}
                                                           class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                                                    <label for="currency_{{ $currency }}" class="ml-2 block text-sm text-gray-900">
                                                        {{ $currency }}
                                                    </label>
                                                </div>
                                            @endforeach
                                        </div>
                                    
                                    @elseif($setting->type === 'json' && $setting->key === 'shipping_zones')
                                        <div class="space-y-3">
                                            @foreach($setting->value ?? [] as $zone => $data)
                                                <div class="flex items-center space-x-3 p-3 border border-gray-200 rounded">
                                                    <div class="flex-1">
                                                        <input type="text" 
                                                               name="settings[shipping_zones][{{ $zone }}][name]" 
                                                               value="{{ $data['name'] ?? '' }}"
                                                               placeholder="Zone name"
                                                               class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                                                    </div>
                                                    <div class="w-24">
                                                        <input type="number" 
                                                               name="settings[shipping_zones][{{ $zone }}][cost]" 
                                                               value="{{ $data['cost'] ?? '' }}"
                                                               placeholder="Cost"
                                                               class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                                                    </div>
                                                </div>
                                            @endforeach
                                        </div>
                                    
                                    @else
                                        <input type="text" 
                                               id="{{ $setting->key }}" 
                                               name="settings[{{ $setting->key }}]" 
                                               value="{{ is_array($setting->value) ? json_encode($setting->value) : $setting->value }}"
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    @endif
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>

        <div class="mt-8 flex justify-end space-x-3">
            <button type="button" 
                    onclick="resetSettings()" 
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Reset to Defaults
            </button>
            <button type="submit" 
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Save Settings
            </button>
        </div>
    </form>
</div>

<script>
function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
        // This will be implemented with actual reset functionality
        alert('Reset functionality will be implemented in the next phase.');
    }
}
</script>
@endsection