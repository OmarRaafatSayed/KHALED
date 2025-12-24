<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariantOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'name',
        'type',
        'values',
        'is_required',
        'sort_order'
    ];

    protected $casts = [
        'values' => 'array',
        'is_required' => 'boolean'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function getValuesForSelect(): array
    {
        return collect($this->values)->mapWithKeys(function ($value) {
            return [$value['key'] => $value['label']];
        })->toArray();
    }
}