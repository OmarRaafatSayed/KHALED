<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'name',
        'code',
        'type',
        'value',
        'min_amount',
        'max_discount',
        'usage_limit',
        'used_count',
        'applicable_products',
        'applicable_categories',
        'conditions',
        'is_active',
        'starts_at',
        'expires_at'
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'min_amount' => 'decimal:2',
        'max_discount' => 'decimal:2',
        'applicable_products' => 'array',
        'applicable_categories' => 'array',
        'conditions' => 'array',
        'is_active' => 'boolean',
        'starts_at' => 'datetime',
        'expires_at' => 'datetime'
    ];

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function isValid(): bool
    {
        return $this->is_active && 
               now()->between($this->starts_at, $this->expires_at) &&
               ($this->usage_limit === null || $this->used_count < $this->usage_limit);
    }

    public function calculateDiscount(float $amount, array $productIds = []): float
    {
        if (!$this->isValid() || $amount < ($this->min_amount ?? 0)) {
            return 0;
        }

        $discount = 0;
        
        switch ($this->type) {
            case 'percentage':
                $discount = $amount * ($this->value / 100);
                break;
            case 'fixed':
                $discount = $this->value;
                break;
        }

        if ($this->max_discount && $discount > $this->max_discount) {
            $discount = $this->max_discount;
        }

        return min($discount, $amount);
    }
}