<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'campagne_id',
        'contenu',
    ];

    // ✅ Auteur du commentaire
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // ✅ Campagne concernée
    public function campagne()
    {
        return $this->belongsTo(Campagne::class);
    }

    // ✅ Nom de l'auteur
    public function auteurNom(): string
    {
        return $this->user ? $this->user->name : 'Utilisateur';
    }

    // ✅ Scope : pour une campagne
    public function scopePourCampagne($query, $campagneId)
    {
        return $query->where('campagne_id', $campagneId);
    }

    // ✅ Scope : récents
    public function scopeRecents($query)
    {
        return $query->latest();
    }
}