<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductTemplate;

class ProductTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $templates = [
            [
                'name' => 'ملابس',
                'slug' => 'clothing',
                'description' => 'قالب للملابس والأزياء',
                'icon' => 'fas fa-tshirt',
                'fields' => [
                    'brand' => ['type' => 'text', 'label' => 'الماركة', 'required' => false],
                    'material' => ['type' => 'text', 'label' => 'الخامة', 'required' => true],
                    'care_instructions' => ['type' => 'textarea', 'label' => 'تعليمات العناية', 'required' => false],
                    'season' => ['type' => 'select', 'label' => 'الموسم', 'options' => ['صيف', 'شتاء', 'ربيع', 'خريف', 'كل المواسم'], 'required' => false],
                    'gender' => ['type' => 'select', 'label' => 'الجنس', 'options' => ['رجالي', 'نسائي', 'أطفال', 'يونيسكس'], 'required' => true]
                ],
                'validation_rules' => [
                    'template_data.material' => 'required|string|max:255',
                    'template_data.gender' => 'required|string|in:رجالي,نسائي,أطفال,يونيسكس'
                ]
            ],
            [
                'name' => 'إلكترونيات',
                'slug' => 'electronics',
                'description' => 'قالب للأجهزة الإلكترونية',
                'icon' => 'fas fa-laptop',
                'fields' => [
                    'brand' => ['type' => 'text', 'label' => 'الماركة', 'required' => true],
                    'model' => ['type' => 'text', 'label' => 'الموديل', 'required' => true],
                    'warranty_period' => ['type' => 'number', 'label' => 'فترة الضمان (شهر)', 'required' => true],
                    'power_consumption' => ['type' => 'text', 'label' => 'استهلاك الطاقة', 'required' => false],
                    'connectivity' => ['type' => 'text', 'label' => 'طرق الاتصال', 'required' => false]
                ],
                'validation_rules' => [
                    'template_data.brand' => 'required|string|max:255',
                    'template_data.model' => 'required|string|max:255',
                    'template_data.warranty_period' => 'required|integer|min:1'
                ]
            ],
            [
                'name' => 'عقارات',
                'slug' => 'real-estate',
                'description' => 'قالب للعقارات',
                'icon' => 'fas fa-home',
                'fields' => [
                    'property_type' => ['type' => 'select', 'label' => 'نوع العقار', 'options' => ['شقة', 'فيلا', 'مكتب', 'محل', 'أرض'], 'required' => true],
                    'area' => ['type' => 'number', 'label' => 'المساحة (متر مربع)', 'required' => true],
                    'rooms' => ['type' => 'number', 'label' => 'عدد الغرف', 'required' => false],
                    'bathrooms' => ['type' => 'number', 'label' => 'عدد الحمامات', 'required' => false],
                    'floor' => ['type' => 'number', 'label' => 'الطابق', 'required' => false],
                    'furnished' => ['type' => 'select', 'label' => 'الأثاث', 'options' => ['مفروش', 'نصف مفروش', 'غير مفروش'], 'required' => false],
                    'parking' => ['type' => 'checkbox', 'label' => 'موقف سيارة', 'required' => false]
                ],
                'validation_rules' => [
                    'template_data.property_type' => 'required|string|in:شقة,فيلا,مكتب,محل,أرض',
                    'template_data.area' => 'required|numeric|min:1'
                ]
            ],
            [
                'name' => 'كتب',
                'slug' => 'books',
                'description' => 'قالب للكتب والمطبوعات',
                'icon' => 'fas fa-book',
                'fields' => [
                    'author' => ['type' => 'text', 'label' => 'المؤلف', 'required' => true],
                    'publisher' => ['type' => 'text', 'label' => 'دار النشر', 'required' => false],
                    'isbn' => ['type' => 'text', 'label' => 'ISBN', 'required' => false],
                    'pages' => ['type' => 'number', 'label' => 'عدد الصفحات', 'required' => false],
                    'language' => ['type' => 'select', 'label' => 'اللغة', 'options' => ['العربية', 'الإنجليزية', 'الفرنسية', 'أخرى'], 'required' => true],
                    'publication_year' => ['type' => 'number', 'label' => 'سنة النشر', 'required' => false]
                ],
                'validation_rules' => [
                    'template_data.author' => 'required|string|max:255',
                    'template_data.language' => 'required|string|in:العربية,الإنجليزية,الفرنسية,أخرى'
                ]
            ]
        ];

        foreach ($templates as $index => $template) {
            $template['sort_order'] = $index + 1;
            ProductTemplate::firstOrCreate(['slug' => $template['slug']], $template);
        }
    }
}