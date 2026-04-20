<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campagne;
use Illuminate\Http\Request;

class CampagneController extends Controller
{
    // Public : Liste toutes les campagnes actives
    public function index()
    {
        return Campagne::with('categorie')->actives()->latest()->get();
    }

    // Public : Campagnes en vedette (pour le Welcome.jsx)
    public function featured()
    {
        return Campagne::with('categorie')->featured()->get();
    }

    // Public : Détails d'une campagne
    public function show($slug)
    {
        return Campagne::with(['categorie', 'createur', 'comments.user', 'donations' => function($q){
            $q->where('statut', 'complete')->latest()->take(5);
        }])->where('slug', $slug)->firstOrFail();
    }

    // Admin : Créer une campagne
    public function store(Request $request)
    {
        $this->authorize('admin'); // On créera une Policy ou un Middleware plus tard

        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required',
            'description_courte' => 'required|max:160',
            'objectif' => 'required|numeric|min:1000',
            'categorie_id' => 'required|exists:categories,id',
            'date_fin' => 'required|date|after:today',
        ]);

        $campagne = $request->user()->campagnes()->create($validated);

        return response()->json($campagne, 201);
    }
}
