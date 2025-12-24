<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'category_id',
        'template_id',
        'name',
        'slug',
        'description',
        'short_description',
        'sku',
        'price',
        'compare_price',
        'cost_price',
        'track_quantity',
        'quantity',
        'min_quantity',
        'weight',
        'dimensions',
        'images',
        'attributes',
        'template_data',
        'seo_title',
        'seo_description',
        'status',
        'is_featured',
        'sort_order'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'compare_price' => 'decimal:2',
        'cost_price' => 'decimal:2',
        'weight' => 'decimal:2',
        'dimensions' => 'array',
        'images' => 'array',
        'attributes' => 'array',
        'template_data' => 'array',
        'track_quantity' => 'boolean',
        'is_featured' => 'boolean'
    ];

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(ProductReview::class);
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(ProductTemplate::class);
    }

    public function variantOptions(): HasMany
    {
        return $this->hasMany(ProductVariantOption::class);
    }

    public function hasTemplate(): bool
    {
        return !is_null($this->template_id);
    }

    public function getTemplateFields(): array
    {
        return $this->template?->getFieldsForForm() ?? [];
    }

    public function getTemplateData(string $key = null)
    {
        if ($key) {
            return $this->template_data[$key] ?? null;
        }
        return $this->template_data ?? [];
    }
}