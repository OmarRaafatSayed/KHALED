<?php

namespace App\Services;

use App\Models\ProductReview;
use App\Models\ReviewReply;

class ReviewService
{
    public function createReview(array $data): ProductReview
    {
        // التحقق من الشراء المؤكد
        if (isset($data['order_id'])) {
            $data['is_verified_purchase'] = true;
            $data['verified_at'] = now();
        }

        return ProductReview::create($data);
    }

    public function addReply(int $reviewId, int $userId, string $reply, bool $isVendorReply = false): ReviewReply
    {
        return ReviewReply::create([
            'review_id' => $reviewId,
            'user_id' => $userId,
            'reply' => $reply,
            'is_vendor_reply' => $isVendorReply
        ]);
    }

    public function addHelpfulVote(int $reviewId, int $userId, string $type): bool
    {
        $review = ProductReview::find($reviewId);
        if ($review) {
            $review->addHelpfulVote($userId, $type);
            return true;
        }
        return false;
    }

    public function getProductReviews(int $productId, int $perPage = 10): \Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        return ProductReview::where('product_id', $productId)
            ->where('is_approved', true)
            ->with(['user', 'replies.user'])
            ->orderBy('helpful_count', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getReviewStats(int $productId): array
    {
        $reviews = ProductReview::where('product_id', $productId)
            ->where('is_approved', true);

        $totalReviews = $reviews->count();
        $averageRating = $reviews->avg('rating') ?? 0;
        
        $ratingDistribution = [];
        for ($i = 1; $i <= 5; $i++) {
            $count = $reviews->where('rating', $i)->count();
            $ratingDistribution[$i] = [
                'count' => $count,
                'percentage' => $totalReviews > 0 ? round(($count / $totalReviews) * 100, 1) : 0
            ];
        }

        return [
            'total_reviews' => $totalReviews,
            'average_rating' => round($averageRating, 1),
            'rating_distribution' => $ratingDistribution
        ];
    }
}