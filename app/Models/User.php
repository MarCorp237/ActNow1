<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, Notifiable, InteractsWithMedia;

    protected $fillable = [
        'name', 'email', 'password', 'role', 'telephone', 'pays', 'ville', 'avatar',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // ✅ Vérifier si l'utilisateur est admin
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    // ✅ Campagnes créées (Relation avec user_id dans la table campagnes)
    public function campagnes()
    {
        return $this->hasMany(Campagne::class, 'user_id');
    }

    public function donations()
    {
        return $this->hasMany(Donation::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function totalDonne(): float
    {
        return (float) $this->donations()->where('statut', 'complete')->sum('montant');
    }

    public function campagnesSoutenues()
    {
        return Campagne::whereHas('donations', function ($query) {
            $query->where('user_id', $this->id)->where('statut', 'complete');
        })->distinct();
    }
}
