<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentGateway extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'config',
        'is_active',
        'is_sandbox',
        'sort_order'
    ];

    protected $casts = [
        'config' => 'array',
        'is_active' => 'boolean',
        'is_sandbox' => 'boolean'
    ];
}