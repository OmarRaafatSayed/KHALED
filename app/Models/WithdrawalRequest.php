<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WithdrawalRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'amount',
        'bank_name',
        'account_number',
        'account_holder_name',
        'status',
        'admin_notes',
        'processed_at'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'processed_at' => 'datetime'
    ];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}