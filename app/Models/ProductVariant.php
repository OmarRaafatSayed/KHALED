<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'name',
        'sku',
        'barcode',
        'price',
        'compare_price',
        'cost_price',
        'quantity',
        'weight',
        'dimensions',
        'images',
        'attributes',
        'variant_options',
        'is_active'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'compare_price' => 'decimal:2',
        'cost_price' => 'decimal:2',
        'weight' => 'decimal:2',
        'dimensions' => 'array',
        'images' => 'array',
        'attributes' => 'array',
        'variant_options' => 'array',
        'is_active' => 'boolean'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function getVariantLabel(): string
    {
        if (empty($this->variant_options)) {
            return $this->name;
        }

        $labels = [];
        foreach ($this->variant_options as $key => $value) {
            $labels[] = ucfirst($key) . ': ' . $value;
        }
        
        return $this->name . ' (' . implode(', ', $labels) . ')';
    }

    public function hasImages(): bool
    {
        return !empty($this->images);
    }

    public function getFirstImage(): ?string
    {
        return $this->images[0] ?? null;
    }
}