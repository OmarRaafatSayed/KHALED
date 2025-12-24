@extends('layouts.dashboard')

@section('title', 'Hero Slides - Success Stories')

@section('content')
<div class="p-6">
    <div class="flex justify-between items-center mb-6">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Hero Slides</h1>
            <p class="text-gray-600">Showcase successful businesses on homepage</p>
        </div>
        <button onclick="addSlide()" 
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            Add New Slide
        </button>
    </div>

    <!-- Slides Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        @forelse($slides as $slide)
            <div class="bg-white rounded-lg shadow-md border {{ $slide->is_active ? 'border-green-500' : 'border-gray-200' }}">
                @if($slide->image)
                    <div class="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                        <img src="{{ asset('storage/' . $slide->image) }}" 
                             alt="{{ $slide->business_name }}" 
                             class="w-full h-full object-cover">
                    </div>
                @endif
                
                <div class="p-4">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center space-x-2">
                            @if($slide->business_logo)
                                <img src="{{ asset('storage/' . $slide->business_logo) }}" 
                                     alt="{{ $slide->business_name }}" 
                                     class="w-8 h-8 rounded-full object-cover">
                            @endif
                            <h3 class="font-semibold text-gray-900">{{ $slide->business_name }}</h3>
                        </div>
                        <span class="text-sm text-gray-500">Order: {{ $slide->sort_order }}</span>
                    </div>
                    
                    <h4 class="font-medium text-gray-800 mb-2">{{ $slide->title }}</h4>
                    @if($slide->subtitle)
                        <p class="text-sm text-gray-600 mb-2">{{ $slide->subtitle }}</p>
                    @endif
                    @if($slide->description)
                        <p class="text-xs text-gray-500 mb-3 line-clamp-2">{{ $slide->description }}</p>
                    @endif
                    
                    <div class="flex items-center justify-between">
                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full 
                            {{ $slide->is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                            {{ $slide->is_active ? 'Active' : 'Inactive' }}
                        </span>
                        
                        <div class="flex space-x-2">
                            <button onclick="editSlide({{ $slide->id }})" 
                                    class="text-indigo-600 hover:text-indigo-800 text-sm">
                                Edit
                            </button>
                            <button onclick="toggleSlide({{ $slide->id }})" 
                                    class="text-blue-600 hover:text-blue-800 text-sm">
                                {{ $slide->is_active ? 'Disable' : 'Enable' }}
                            </button>
                            <button onclick="deleteSlide({{ $slide->id }})" 
                                    class="text-red-600 hover:text-red-800 text-sm">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        @empty
            <div class="col-span-full text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No hero slides</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by adding your first success story slide.</p>
                <div class="mt-6">
                    <button onclick="addSlide()" 
                            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        Add Hero Slide
                    </button>
                </div>
            </div>
        @endforelse
    </div>

    <!-- Slide Settings -->
    <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Slider Settings</h3>
        <form method="POST" action="{{ route('superadmin.content.hero-slides.settings') }}">
            @csrf
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Auto-slide Duration</label>
                    <select name="slide_duration" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="3000">3 seconds</option>
                        <option value="5000" selected>5 seconds</option>
                        <option value="7000">7 seconds</option>
                        <option value="10000">10 seconds</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Transition Effect</label>
                    <select name="transition_effect" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="fade">Fade</option>
                        <option value="slide" selected>Slide</option>
                        <option value="zoom">Zoom</option>
                    </select>
                </div>
                <div class="flex items-end">
                    <button type="submit" 
                            class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm font-medium">
                        Save Settings
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

<!-- Add/Edit Slide Modal -->
<div id="slideModal" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4" id="modalTitle">Add Hero Slide</h3>
            <form id="slideForm" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                            <input type="text" name="business_name" required
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                            <input type="number" name="sort_order" value="0"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                        <input type="text" name="title" required
                               placeholder="e.g., From Startup to Success"
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                        <input type="text" name="subtitle"
                               placeholder="e.g., How we helped them grow 300%"
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea name="description" rows="3"
                                  placeholder="Brief success story description..."
                                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Hero Image *</label>
                            <input type="file" name="image" accept="image/*"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <p class="text-xs text-gray-500 mt-1">Recommended: 1920x1080px</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Business Logo</label>
                            <input type="file" name="business_logo" accept="image/*"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <p class="text-xs text-gray-500 mt-1">Recommended: 200x200px</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                            <input type="text" name="button_text"
                                   placeholder="e.g., View Their Store"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Button URL</label>
                            <input type="url" name="button_url"
                                   placeholder="https://example.com"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        </div>
                    </div>

                    <div class="flex items-center">
                        <input type="checkbox" name="is_active" value="1" checked
                               class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                        <label class="ml-2 block text-sm text-gray-900">Active (show in slider)</label>
                    </div>
                </div>

                <div class="flex justify-end space-x-3 mt-6">
                    <button type="button" onclick="closeModal()" 
                            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" 
                            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        Save Slide
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
function addSlide() {
    document.getElementById('modalTitle').textContent = 'Add Hero Slide';
    document.getElementById('slideForm').action = '{{ route("superadmin.content.hero-slides.store") }}';
    document.getElementById('slideForm').reset();
    document.getElementById('slideModal').classList.remove('hidden');
}

function editSlide(id) {
    document.getElementById('modalTitle').textContent = 'Edit Hero Slide';
    document.getElementById('slideForm').action = `/superadmin/content/hero-slides/${id}`;
    // Add method spoofing for PUT
    let methodInput = document.createElement('input');
    methodInput.type = 'hidden';
    methodInput.name = '_method';
    methodInput.value = 'PUT';
    document.getElementById('slideForm').appendChild(methodInput);
    
    // Load slide data (will be implemented with AJAX)
    document.getElementById('slideModal').classList.remove('hidden');
}

function toggleSlide(id) {
    if (confirm('Toggle slide status?')) {
        // This will be implemented with actual API calls
        alert('Toggle functionality will be implemented in the next phase.');
    }
}

function deleteSlide(id) {
    if (confirm('Are you sure you want to delete this slide?')) {
        // This will be implemented with actual API calls
        alert('Delete functionality will be implemented in the next phase.');
    }
}

function closeModal() {
    document.getElementById('slideModal').classList.add('hidden');
    // Remove method spoofing input if exists
    const methodInput = document.querySelector('input[name="_method"]');
    if (methodInput) methodInput.remove();
}
</script>
@endsection