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
        Schema::create('images', function (Blueprint $table) {
        $table->id();
        // Clé étrangère reliée à la table campagnes
        // onDelete('cascade') : si on supprime la campagne, les images sont supprimées aussi
        $table->foreignId('campagne_id')->constrained('campagnes')->onDelete('cascade');
        $table->string('chemin'); // Stockera le chemin du fichier (ex: campagnes/image1.jpg)
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
