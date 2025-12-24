<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingProvider extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'api_config',
        'pricing_config',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'api_config' => 'array',
        'pricing_config' => 'array',
        'is_active' => 'boolean'
    ];
}