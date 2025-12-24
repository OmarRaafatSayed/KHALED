<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'user_id',
        'order_id',
        'rating',
        'title',
        'comment',
        'images',
        'helpful_votes',
        'helpful_count',
        'is_approved',
        'is_verified_purchase',
        'verified_at'
    ];

    protected $casts = [
        'images' => 'array',
        'helpful_votes' => 'array',
        'is_approved' => 'boolean',
        'is_verified_purchase' => 'boolean',
        'verified_at' => 'datetime'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function replies(): HasMany
    {
        return $this->hasMany(ReviewReply::class, 'review_id');
    }

    public function addHelpfulVote(int $userId, string $type): void
    {
        $votes = $this->helpful_votes ?? [];
        $votes[$userId] = $type;
        
        $helpfulCount = collect($votes)->filter(fn($vote) => $vote === 'helpful')->count();
        
        $this->update([
            'helpful_votes' => $votes,
            'helpful_count' => $helpfulCount
        ]);
    }
}