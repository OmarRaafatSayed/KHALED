<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'balance',
        'pending_balance',
        'total_earnings',
        'total_withdrawn'
    ];

    protected $casts = [
        'balance' => 'decimal:2',
        'pending_balance' => 'decimal:2',
        'total_earnings' => 'decimal:2',
        'total_withdrawn' => 'decimal:2'
    ];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public function transactions()
    {
        return $this->hasMany(WalletTransaction::class);
    }

    public function addFunds($amount, $description, $reference = null)
    {
        $this->increment('balance', $amount);
        $this->increment('total_earnings', $amount);
        
        return $this->transactions()->create([
            'type' => 'credit',
            'amount' => $amount,
            'description' => $description,
            'reference' => $reference,
            'status' => 'completed'
        ]);
    }

    public function deductFunds($amount, $description, $reference = null)
    {
        if ($this->balance < $amount) {
            throw new \Exception('Insufficient balance');
        }

        $this->decrement('balance', $amount);
        
        return $this->transactions()->create([
            'type' => 'debit',
            'amount' => $amount,
            'description' => $description,
            'reference' => $reference,
            'status' => 'completed'
        ]);
    }
}