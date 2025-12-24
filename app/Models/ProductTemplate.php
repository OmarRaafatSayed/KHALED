<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'fields',
        'validation_rules',
        'icon',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'fields' => 'array',
        'validation_rules' => 'array',
        'is_active' => 'boolean'
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'template_id');
    }

    public function getFieldsForForm(): array
    {
        return $this->fields ?? [];
    }

    public function getValidationRules(): array
    {
        return $this->validation_rules ?? [];
    }
}