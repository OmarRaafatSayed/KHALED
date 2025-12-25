<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            if (!Schema::hasColumn('product_variants', 'variant_options')) {
                $table->json('variant_options')->after('attributes');
            }
            if (!Schema::hasColumn('product_variants', 'images')) {
                $table->json('images')->nullable()->after('variant_options');
            }
            if (!Schema::hasColumn('product_variants', 'barcode')) {
                $table->string('barcode')->nullable()->after('sku');
            }
        });
    }

    public function down(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            $table->dropColumn(['variant_options', 'images', 'barcode']);
        });
    }
};