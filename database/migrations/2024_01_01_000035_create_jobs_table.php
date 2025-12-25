<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('location');
            $table->enum('type', ['full-time', 'part-time', 'contract', 'freelance']);
            $table->decimal('salary_min', 10, 2)->nullable();
            $table->decimal('salary_max', 10, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            $table->text('requirements')->nullable();
            $table->string('contact_email');
            $table->string('contact_phone')->nullable();
            $table->enum('status', ['draft', 'active', 'closed', 'rejected'])->default('draft');
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('job_listings');
    }
};