<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            $table->json('variant_options')->after('attributes'); // خيارات المتغير (لون: أحمر، مقاس: كبير)
            $table->json('images')->nullable()->after('variant_options'); // صور خاصة بالمتغير
            $table->string('barcode')->nullable()->after('sku');
        });
    }

    public function down(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            $table->dropColumn(['variant_options', 'images', 'barcode']);
        });
    }
};