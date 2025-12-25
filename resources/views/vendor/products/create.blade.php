@extends('layouts.dashboard')

@section('title', 'إضافة منتج جديد')

@section('content')
<div class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">إضافة منتج جديد</h3>
            </div>
            
            <form action="{{ route('vendor.products.store') }}" method="POST" enctype="multipart/form-data" id="productForm">
                @csrf
                <div class="p-6.5">
                    <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <!-- اسم المنتج -->
                        <div class="w-full xl:w-1/2">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                اسم المنتج *
                            </label>
                            <input type="text" name="name" required
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                placeholder="أدخل اسم المنتج" />
                        </div>

                        <!-- الفئة -->
                        <div class="w-full xl:w-1/2">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                الفئة *
                            </label>
                            <select name="category_id" required
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white">
                                <option value="">اختر الفئة</option>
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <!-- القالب -->
                    <div class="mb-4.5">
                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            نوع المنتج (اختياري)
                        </label>
                        <select name="template_id" id="templateSelect"
                            class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white">
                            <option value="">بدون قالب محدد</option>
                            @foreach($templates as $template)
                                <option value="{{ $template->id }}" data-icon="{{ $template->icon }}">
                                    {{ $template->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <!-- الحقول الديناميكية للقالب -->
                    <div id="templateFields" class="mb-4.5" style="display: none;">
                        <h4 class="mb-4 text-lg font-medium text-black dark:text-white">معلومات إضافية</h4>
                        <div id="dynamicFields"></div>
                    </div>

                    <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <!-- السعر -->
                        <div class="w-full xl:w-1/3">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                السعر *
                            </label>
                            <input type="number" name="price" id="price" step="0.01" min="0.01" required
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                placeholder="0.00" />
                        </div>

                        <!-- السعر المقارن -->
                        <div class="w-full xl:w-1/3">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                السعر قبل الخصم
                            </label>
                            <input type="number" name="compare_price" id="compare_price" step="0.01" min="0"
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                placeholder="0.00" />
                            <p id="price-error" class="text-red-500 text-sm mt-1" style="display: none;">السعر قبل الخصم يجب أن يكون أعلى من السعر الحالي</p>
                        </div>

                        <!-- الكمية -->
                        <div class="w-full xl:w-1/3">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                الكمية *
                            </label>
                            <input type="number" name="quantity" min="0" required
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                placeholder="0" />
                        </div>
                    </div>

                    <!-- الوصف المختصر -->
                    <div class="mb-4.5">
                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            الوصف المختصر
                        </label>
                        <textarea name="short_description" rows="3"
                            class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            placeholder="وصف مختصر للمنتج"></textarea>
                    </div>

                    <!-- الوصف التفصيلي -->
                    <div class="mb-4.5">
                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            الوصف التفصيلي *
                        </label>
                        <textarea name="description" rows="6" required
                            class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            placeholder="وصف تفصيلي للمنتج"></textarea>
                    </div>

                    <!-- رفع الصور -->
                    <div class="mb-4.5">
                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            صور المنتج
                        </label>
                        <div class="relative">
                            <input type="file" name="images[]" multiple accept="image/*" id="imageInput"
                                class="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary" />
                        </div>
                        <div id="imagePreview" class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4"></div>
                    </div>

                    <!-- المتغيرات -->
                    <div class="mb-6">
                        <div class="flex items-center justify-between mb-4">
                            <h4 class="text-lg font-medium text-black dark:text-white">متغيرات المنتج</h4>
                            <button type="button" id="addVariantOption"
                                class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90">
                                إضافة متغير
                            </button>
                        </div>
                        <div id="variantOptions"></div>
                    </div>

                    <!-- أزرار الحفظ -->
                    <div class="flex gap-4">
                        <button type="submit" name="status" value="draft"
                            class="flex w-full justify-center rounded bg-gray px-6 py-2 font-medium text-gray hover:bg-opacity-90">
                            حفظ كمسودة
                        </button>
                        <button type="submit" name="status" value="pending"
                            class="flex w-full justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90">
                            إرسال للمراجعة
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const templateSelect = document.getElementById('templateSelect');
    const templateFields = document.getElementById('templateFields');
    const dynamicFields = document.getElementById('dynamicFields');
    const addVariantBtn = document.getElementById('addVariantOption');
    const variantOptions = document.getElementById('variantOptions');
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');

    // معالجة تغيير القالب
    templateSelect.addEventListener('change', function() {
        const templateId = this.value;
        if (templateId) {
            fetch(`/vendor/templates/${templateId}/fields`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        renderTemplateFields(data.fields);
                        templateFields.style.display = 'block';
                    }
                })
                .catch(error => console.error('Error:', error));
        } else {
            templateFields.style.display = 'none';
        }
    });

    // رسم الحقول الديناميكية
    function renderTemplateFields(fields) {
        dynamicFields.innerHTML = '';
        Object.entries(fields).forEach(([fieldName, field]) => {
            const fieldHtml = createFieldHtml(fieldName, field);
            dynamicFields.insertAdjacentHTML('beforeend', fieldHtml);
        });
    }

    function createFieldHtml(name, field) {
        const required = field.required ? 'required' : '';
        const label = field.label;
        
        let inputHtml = '';
        switch (field.type) {
            case 'text':
                inputHtml = `<input type="text" name="template_data[${name}]" ${required} class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white">`;
                break;
            case 'number':
                inputHtml = `<input type="number" name="template_data[${name}]" ${required} class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white">`;
                break;
            case 'textarea':
                inputHtml = `<textarea name="template_data[${name}]" rows="3" ${required} class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"></textarea>`;
                break;
            case 'select':
                let options = '<option value="">اختر...</option>';
                field.options.forEach(option => {
                    options += `<option value="${option}">${option}</option>`;
                });
                inputHtml = `<select name="template_data[${name}]" ${required} class="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white">${options}</select>`;
                break;
            case 'checkbox':
                inputHtml = `<input type="checkbox" name="template_data[${name}]" value="1" class="mr-2">`;
                break;
        }

        return `
            <div class="mb-4.5">
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                    ${label} ${field.required ? '*' : ''}
                </label>
                ${inputHtml}
            </div>
        `;
    }

    // إضافة متغير جديد
    let variantCount = 0;
    addVariantBtn.addEventListener('click', function() {
        const variantHtml = `
            <div class="variant-option mb-4 rounded border border-stroke p-4 dark:border-strokedark" data-index="${variantCount}">
                <div class="flex items-center justify-between mb-4">
                    <h5 class="font-medium text-black dark:text-white">متغير ${variantCount + 1}</h5>
                    <button type="button" class="remove-variant text-red-500 hover:text-red-700">حذف</button>
                </div>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label class="mb-2 block text-sm font-medium text-black dark:text-white">اسم المتغير</label>
                        <input type="text" name="variant_options[${variantCount}][name]" placeholder="مثل: اللون" required
                            class="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white">
                    </div>
                    <div>
                        <label class="mb-2 block text-sm font-medium text-black dark:text-white">النوع</label>
                        <select name="variant_options[${variantCount}][type]" required
                            class="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white">
                            <option value="color">لون</option>
                            <option value="size">مقاس</option>
                            <option value="material">خامة</option>
                            <option value="other">أخرى</option>
                        </select>
                    </div>
                    <div>
                        <label class="mb-2 block text-sm font-medium text-black dark:text-white">مطلوب</label>
                        <input type="checkbox" name="variant_options[${variantCount}][is_required]" value="1" class="mr-2">
                    </div>
                </div>
                <div class="mt-4">
                    <label class="mb-2 block text-sm font-medium text-black dark:text-white">القيم (كل قيمة في سطر)</label>
                    <textarea name="variant_options[${variantCount}][values_text]" rows="3" placeholder="أحمر&#10;أزرق&#10;أخضر" required
                        class="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"></textarea>
                </div>
            </div>
        `;
        variantOptions.insertAdjacentHTML('beforeend', variantHtml);
        variantCount++;
    });

    // حذف متغير
    variantOptions.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-variant')) {
            e.target.closest('.variant-option').remove();
        }
    });

    // معاينة الصور
    imageInput.addEventListener('change', function() {
        imagePreview.innerHTML = '';
        Array.from(this.files).forEach((file, index) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imgHtml = `
                        <div class="relative">
                            <img src="${e.target.result}" alt="Preview" class="h-24 w-24 rounded object-cover">
                            <button type="button" class="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs" onclick="this.parentElement.remove()">×</button>
                        </div>
                    `;
                    imagePreview.insertAdjacentHTML('beforeend', imgHtml);
                };
                reader.readAsDataURL(file);
            }
        });
    });
    
    // التحقق من السعر
    const priceInput = document.getElementById('price');
    const comparePriceInput = document.getElementById('compare_price');
    const priceError = document.getElementById('price-error');
    
    function validatePrices() {
        const price = parseFloat(priceInput.value) || 0;
        const comparePrice = parseFloat(comparePriceInput.value) || 0;
        
        if (comparePrice > 0 && comparePrice <= price) {
            priceError.style.display = 'block';
            comparePriceInput.style.borderColor = '#ef4444';
            return false;
        } else {
            priceError.style.display = 'none';
            comparePriceInput.style.borderColor = '';
            return true;
        }
    }
    
    priceInput.addEventListener('input', validatePrices);
    comparePriceInput.addEventListener('input', validatePrices);
    
    // منع الإرسال إذا كان السعر غير صحيح
    document.getElementById('productForm').addEventListener('submit', function(e) {
        if (!validatePrices()) {
            e.preventDefault();
            comparePriceInput.focus();
        }
    });
});
</script>
@endsection