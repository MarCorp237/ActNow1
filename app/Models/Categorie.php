<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Categorie extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'slug', 'couleur'];

    // ✅ Génération automatique du slug
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->nom);
            }
        });

        static::updating(function ($category) {
            if ($category->isDirty('nom')) {
                $category->slug = Str::slug($category->nom);
            }
        });
    }

    // ✅ Campagnes de cette catégorie
    public function campagnes()
    {
        return $this->hasMany(Campagne::class, 'categorie_id');
    }

    // ✅ Campagnes actives uniquement
    public function campagnesActives()
    {
        return $this->campagnes()->where('statut', 'active');
    }

    // ✅ Total collecté dans cette catégorie
    public function totalCollecte(): float
    {
        return $this->campagnes()->sum('collecte');
    }

    // ✅ Nombre de campagnes
    public function nombreCampagnes(): int
    {
        return $this->campagnes()->count();
    }
}
