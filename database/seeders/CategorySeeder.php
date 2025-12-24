<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Electronics',
                'slug' => 'electronics',
                'description' => 'Electronic devices and accessories',
                'attributes_schema' => [
                    'brand' => ['type' => 'text', 'required' => true],
                    'model' => ['type' => 'text', 'required' => true],
                    'warranty' => ['type' => 'select', 'options' => ['1 year', '2 years', '3 years']],
                    'color' => ['type' => 'color', 'required' => false]
                ],
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Fashion',
                'slug' => 'fashion',
                'description' => 'Clothing and fashion accessories',
                'attributes_schema' => [
                    'size' => ['type' => 'select', 'options' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'], 'required' => true],
                    'color' => ['type' => 'color', 'required' => true],
                    'material' => ['type' => 'text', 'required' => false],
                    'gender' => ['type' => 'select', 'options' => ['Men', 'Women', 'Unisex']]
                ],
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'Home & Garden',
                'slug' => 'home-garden',
                'description' => 'Home improvement and garden supplies',
                'attributes_schema' => [
                    'dimensions' => ['type' => 'text', 'required' => false],
                    'material' => ['type' => 'text', 'required' => false],
                    'room_type' => ['type' => 'select', 'options' => ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Garden']]
                ],
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'name' => 'Sports & Outdoors',
                'slug' => 'sports-outdoors',
                'description' => 'Sports equipment and outdoor gear',
                'attributes_schema' => [
                    'sport_type' => ['type' => 'select', 'options' => ['Football', 'Basketball', 'Tennis', 'Swimming', 'Running']],
                    'size' => ['type' => 'text', 'required' => false],
                    'weight' => ['type' => 'number', 'required' => false]
                ],
                'is_active' => true,
                'sort_order' => 4
            ],
            [
                'name' => 'Books & Media',
                'slug' => 'books-media',
                'description' => 'Books, movies, music and digital media',
                'attributes_schema' => [
                    'author' => ['type' => 'text', 'required' => false],
                    'genre' => ['type' => 'text', 'required' => false],
                    'language' => ['type' => 'select', 'options' => ['English', 'Arabic', 'French', 'Spanish']],
                    'format' => ['type' => 'select', 'options' => ['Hardcover', 'Paperback', 'Digital', 'Audio']]
                ],
                'is_active' => true,
                'sort_order' => 5
            ]
        ];

        foreach ($categories as $categoryData) {
            Category::firstOrCreate(['slug' => $categoryData['slug']], $categoryData);
        }

        // إضافة فئات فرعية للإلكترونيات
        $electronics = Category::where('slug', 'electronics')->first();
        if ($electronics) {
            $subCategories = [
                [
                    'name' => 'Smartphones',
                    'slug' => 'smartphones',
                    'parent_id' => $electronics->id,
                    'attributes_schema' => [
                        'brand' => ['type' => 'text', 'required' => true],
                        'model' => ['type' => 'text', 'required' => true],
                        'storage' => ['type' => 'select', 'options' => ['64GB', '128GB', '256GB', '512GB', '1TB']],
                        'color' => ['type' => 'color', 'required' => true],
                        'screen_size' => ['type' => 'text', 'required' => false]
                    ]
                ],
                [
                    'name' => 'Laptops',
                    'slug' => 'laptops',
                    'parent_id' => $electronics->id,
                    'attributes_schema' => [
                        'brand' => ['type' => 'text', 'required' => true],
                        'processor' => ['type' => 'text', 'required' => true],
                        'ram' => ['type' => 'select', 'options' => ['4GB', '8GB', '16GB', '32GB']],
                        'storage' => ['type' => 'text', 'required' => true],
                        'screen_size' => ['type' => 'text', 'required' => true]
                    ]
                ]
            ];

            foreach ($subCategories as $subCategoryData) {
                Category::firstOrCreate(['slug' => $subCategoryData['slug']], $subCategoryData);
            }
        }
    }
}