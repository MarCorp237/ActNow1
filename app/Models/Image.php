<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    // Champs que l'on peut remplir via le contrôleur
    protected $fillable = [
        'campagne_id',
        'chemin',
    ];

    /**
     * Une image appartient à une seule campagne.
     */
    public function campagne()
    {
        return $this->belongsTo(Campagne::class);
    }
}