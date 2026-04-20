<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('campagne_id')->constrained()->onDelete('cascade');
            $table->decimal('montant', 12, 2);
            $table->text('message')->nullable();
            $table->enum('mode_paiement', ['mtn_momo', 'orange_money']);
            $table->string('transaction_id')->unique(); // Ex: DON-54879
            $table->enum('statut', ['en_attente', 'complete', 'echoue'])->default('complete');
            $table->boolean('est_anonyme')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
