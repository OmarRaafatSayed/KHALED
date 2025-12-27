@extends('layouts.dashboard')

@section('title', 'System Settings')

@section('content')
<div class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="font-medium text-black dark:text-white">System Settings</h3>
                        <p class="text-sm text-gray-500 mt-1">Configure your marketplace settings</p>
                    </div>
                    <button type="button" onclick="resetSettings()" 
                            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Reset Defaults
                    </button>
                </div>
            </div>

            <!-- Settings Form -->
            <form method="POST" action="{{ route('superadmin.system.settings.update') }}" enctype="multipart/form-data" class="p-6.5">
                @csrf
                @method('PATCH')
                
                <!-- Settings Tabs -->
                <div class="mb-6">
                    <div class="border-b border-gray-200">
                        <nav class="-mb-px flex space-x-8">
                            @foreach($settings as $group => $groupSettings)
                                <button type="button" onclick="showTab('{{ $group }}')" 
                                        class="tab-button py-2 px-1 border-b-2 font-medium text-sm {{ $loop->first ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' }}" 
                                        data-tab="{{ $group }}">
                                    {{ ucwords(str_replace('_', ' ', $group)) }}
                                </button>
                            @endforeach
                        </nav>
                    </div>
                </div>

                <!-- Settings Content -->
                @foreach($settings as $group => $groupSettings)
                    <div id="tab-{{ $group }}" class="tab-content {{ !$loop->first ? 'hidden' : '' }}">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            @foreach($groupSettings as $setting)
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <label for="{{ $setting->key }}" class="block text-sm font-medium text-gray-900 mb-2">
                                        {{ ucwords(str_replace('_', ' ', $setting->key)) }}
                                    </label>
                                    @if($setting->description)
                                        <p class="text-xs text-gray-500 mb-3">{{ $setting->description }}</p>
                                    @endif
                                    
                                    @if($setting->type === 'boolean')
                                        <div class="flex items-center">
                                            <input type="checkbox" 
                                                   id="{{ $setting->key }}" 
                                                   name="settings[{{ $setting->key }}]" 
                                                   value="1"
                                                   {{ $setting->value ? 'checked' : '' }}
                                                   class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                            <label for="{{ $setting->key }}" class="ml-2 text-sm text-gray-700">Enable</label>
                                        </div>
                                    
                                    @elseif($setting->key === 'default_language')
                                        <select id="{{ $setting->key }}" name="settings[{{ $setting->key }}]" 
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                            <option value="en" {{ $setting->value === 'en' ? 'selected' : '' }}>🇺🇸 English</option>
                                            <option value="ar" {{ $setting->value === 'ar' ? 'selected' : '' }}>🇸🇦 العربية</option>
                                        </select>
                                    
                                    @elseif($setting->key === 'default_currency')
                                        <select id="{{ $setting->key }}" name="settings[{{ $setting->key }}]" 
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                            @foreach(['USD' => '$', 'EUR' => '€', 'EGP' => 'ج.م', 'SAR' => 'ر.س', 'AED' => 'د.إ', 'GBP' => '£'] as $code => $symbol)
                                                <option value="{{ $code }}" {{ $setting->value === $code ? 'selected' : '' }}>
                                                    {{ $symbol }} {{ $code }}
                                                </option>
                                            @endforeach
                                        </select>
                                    
                                    @elseif($setting->type === 'number')
                                        <input type="number" id="{{ $setting->key }}" name="settings[{{ $setting->key }}]" 
                                               value="{{ $setting->value }}" step="0.01"
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                    
                                    @elseif($setting->type === 'email')
                                        <input type="email" id="{{ $setting->key }}" name="settings[{{ $setting->key }}]" 
                                               value="{{ $setting->value }}"
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                    
                                    @elseif($setting->type === 'text')
                                        <textarea id="{{ $setting->key }}" name="settings[{{ $setting->key }}]" rows="3"
                                                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">{{ $setting->value }}</textarea>
                                    
                                    @elseif($setting->type === 'file')
                                        <input type="file" id="{{ $setting->key }}" name="settings[{{ $setting->key }}]" accept="image/*"
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                        @if($setting->value)
                                            <p class="mt-1 text-xs text-gray-500">Current: {{ basename($setting->value) }}</p>
                                        @endif
                                    
                                    @else
                                        <input type="text" id="{{ $setting->key }}" name="settings[{{ $setting->key }}]" 
                                               value="{{ is_array($setting->value) ? json_encode($setting->value) : $setting->value }}"
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                    @endif
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endforeach

                <!-- Save Button -->
                <div class="mt-8 flex justify-end">
                    <button type="submit" 
                            class="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        💾 Save All Settings
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('border-blue-500', 'text-blue-600');
        btn.classList.add('border-transparent', 'text-gray-500');
    });
    
    // Show selected tab
    document.getElementById('tab-' + tabName).classList.remove('hidden');
    
    // Add active class to clicked button
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    activeBtn.classList.remove('border-transparent', 'text-gray-500');
    activeBtn.classList.add('border-blue-500', 'text-blue-600');
}

function resetSettings() {
    if (confirm('⚠️ Are you sure you want to reset all settings to defaults?\nThis action cannot be undone.')) {
        // Reset form to defaults
        document.querySelectorAll('input, select, textarea').forEach(field => {
            if (field.type === 'checkbox') {
                field.checked = false;
            } else if (field.type !== 'submit' && field.type !== 'button') {
                field.value = '';
            }
        });
        alert('✅ Settings reset to defaults. Click "Save All Settings" to apply changes.');
    }
}
</script>
@endsection