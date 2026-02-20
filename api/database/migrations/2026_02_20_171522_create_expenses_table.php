<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('amount', 10, 2);
            $table->date('date');
            $table->boolean('active')->default(true);
            $table->foreignId('expense_category_id')
                ->constrained('expense_categories')
                ->cascadeOnDelete();
            $table->foreignId("company_id")
                ->constrained('companies')
                ->cascadeOnDelete();
            $table->foreignId("user_id")
                ->constrained('users')
                ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
