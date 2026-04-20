<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use App\Models\Image;
use Spatie\MediaLibrary\InteractsWithMedia;

class Campagne extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'titre', 'slug', 'description', 'description_courte', 'objectif',
        'collecte', 'date_fin', 'categorie_id', 'user_id', 'statut', 'is_featured',
    ];

    protected $casts = [
        'objectif' => 'decimal:2',
        'collecte' => 'decimal:2',
        'date_fin' => 'date',
        'is_featured' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($campagne) {
            if (empty($campagne->slug)) $campagne->slug = Str::slug($campagne->titre);
            if (empty($campagne->collecte)) $campagne->collecte = 0;
        });
        static::updating(function ($campagne) {
            if ($campagne->isDirty('titre')) $campagne->slug = Str::slug($campagne->titre);
        });
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function createur()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function donations()
    {
        return $this->hasMany(Donation::class);
    }

    public function donationsCompletees()
    {
        return $this->donations()->where('statut', 'complete');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->latest();
    }

    public function pourcentageProgression(): float
    {
        if ($this->objectif <= 0) return 0;
        return min(100, round(($this->collecte / $this->objectif) * 100, 2));
    }

    public function joursRestants(): ?int
    {
        if (!$this->date_fin) return null;
        $diff = now()->startOfDay()->diffInDays($this->date_fin, false);
        return max(0, (int)$diff);
    }

    public function scopeActives($query) { return $query->where('statut', 'active'); }
    public function scopeFeatured($query) { return $query->where('is_featured', true); }
}