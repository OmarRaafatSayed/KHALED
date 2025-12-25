<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $table = 'job_listings';

    protected $fillable = [
        'vendor_id',
        'title',
        'description',
        'location',
        'type',
        'salary_min',
        'salary_max',
        'currency',
        'requirements',
        'contact_email',
        'contact_phone',
        'status',
        'expires_at'
    ];

    protected $casts = [
        'salary_min' => 'decimal:2',
        'salary_max' => 'decimal:2',
        'expires_at' => 'datetime'
    ];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public function isExpired()
    {
        return $this->expires_at && $this->expires_at->isPast();
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active')
                    ->where(function($q) {
                        $q->whereNull('expires_at')
                          ->orWhere('expires_at', '>', now());
                    });
    }
}