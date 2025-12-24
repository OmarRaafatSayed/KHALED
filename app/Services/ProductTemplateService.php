<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductTemplate;
use App\Models\ProductVariantOption;
use Illuminate\Http\Request;

class ProductTemplateService
{
    public function getTemplateFields(ProductTemplate $template): array
    {
        return $template->getFieldsForForm();
    }

    public function validateTemplateData(Request $request, ProductTemplate $template): array
    {
        $rules = $template->getValidationRules();
        return $request->validate($rules);
    }

    public function createVariantOptions(Product $product, array $variantData): void
    {
        foreach ($variantData as $optionData) {
            ProductVariantOption::create([
                'product_id' => $product->id,
                'name' => $optionData['name'],
                'type' => $optionData['type'],
                'values' => $optionData['values'],
                'is_required' => $optionData['is_required'] ?? false,
                'sort_order' => $optionData['sort_order'] ?? 0
            ]);
        }
    }

    public function generateVariantCombinations(Product $product): array
    {
        $options = $product->variantOptions()->orderBy('sort_order')->get();
        
        if ($options->isEmpty()) {
            return [];
        }

        $combinations = [[]];
        
        foreach ($options as $option) {
            $newCombinations = [];
            foreach ($combinations as $combination) {
                foreach ($option->values as $value) {
                    $newCombination = $combination;
                    $newCombination[$option->type] = $value['key'];
                    $newCombinations[] = $newCombination;
                }
            }
            $combinations = $newCombinations;
        }

        return $combinations;
    }

    public function createVariantsFromCombinations(Product $product, array $combinations): void
    {
        foreach ($combinations as $index => $combination) {
            $variantName = $product->name;
            $labels = [];
            
            foreach ($combination as $type => $value) {
                $option = $product->variantOptions()->where('type', $type)->first();
                $valueData = collect($option->values)->firstWhere('key', $value);
                $labels[] = $valueData['label'] ?? $value;
            }
            
            if (!empty($labels)) {
                $variantName .= ' - ' . implode(', ', $labels);
            }

            $product->variants()->create([
                'name' => $variantName,
                'sku' => $product->sku . '-V' . ($index + 1),
                'price' => $product->price,
                'quantity' => 0,
                'variant_options' => $combination,
                'is_active' => true
            ]);
        }
    }
}