<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('product_reviews', function (Blueprint $table) {
            $table->json('images')->nullable()->after('comment');
            $table->json('helpful_votes')->nullable()->after('images'); // {user_id: vote_type}
            $table->integer('helpful_count')->default(0)->after('helpful_votes');
            $table->boolean('is_verified_purchase')->default(false)->after('helpful_count');
            $table->timestamp('verified_at')->nullable()->after('is_verified_purchase');
        });
    }

    public function down(): void
    {
        Schema::table('product_reviews', function (Blueprint $table) {
            $table->dropColumn(['images', 'helpful_votes', 'helpful_count', 'is_verified_purchase', 'verified_at']);
        });
    }
};