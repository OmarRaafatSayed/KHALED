<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subscription_id',
        'store_name',
        'store_slug',
        'store_description',
        'store_logo',
        'store_banner',
        'phone',
        'address',
        'city',
        'country',
        'tax_number',
        'bank_details',
        'is_approved',
        'is_active',
        'subscription_expires_at'
    ];

    protected $casts = [
        'bank_details' => 'array',
        'is_approved' => 'boolean',
        'is_active' => 'boolean',
        'subscription_expires_at' => 'datetime'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function wallet()
    {
        return $this->hasOne(Wallet::class);
    }

    public function withdrawalRequests()
    {
        return $this->hasMany(WithdrawalRequest::class);
    }

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }
}