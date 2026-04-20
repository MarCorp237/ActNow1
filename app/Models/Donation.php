<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'campagne_id', 'montant', 'message',
        'mode_paiement', 'transaction_id', 'statut', 'est_anonyme',
    ];

    protected $casts = [
        'montant' => 'decimal:2',
        'est_anonyme' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($donation) {
            if (empty($donation->transaction_id)) {
                $donation->transaction_id = 'DON-' . strtoupper(uniqid());
            }
        });
    }

    public function user() { return $this->belongsTo(User::class); }
    public function campagne() { return $this->belongsTo(Campagne::class); }

    public function donateurNom(): string
    {
        return ($this->est_anonyme) ? 'Donateur anonyme' : ($this->user->name ?? 'Donateur');
    }

    public function scopeCompletees($query) { return $query->where('statut', 'complete'); }
}