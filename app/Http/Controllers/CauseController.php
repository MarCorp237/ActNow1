<?php

namespace App\Http\Controllers;

use App\Models\Campagne;
use App\Models\Donation;
use App\Models\Comment; // Assure-toi d'avoir ce modèle et sa table !
use Illuminate\Http\Request;
use Inertia\Inertia;

class CauseController extends Controller
{
    // Afficher toutes les causes actives
    public function index()
    {
        $campagnes = Campagne::with('images')
            ->where('statut', 'active')
            ->latest()
            ->paginate(12);

        return Inertia::render('Causes/Index', [
            'campagnes' => $campagnes
        ]);
    }

    // Afficher les détails d'une cause (Page de Don)
    public function show(Campagne $campagne)
    {
        // On s'assure que la campagne est active
        if ($campagne->statut !== 'active') {
            abort(404);
        }

        // On charge les images et les commentaires (avec le nom de l'auteur)
        $campagne->load(['images', 'comments.user']);

        return Inertia::render('Causes/Don', [
            'campagne' => $campagne
        ]);
    }

    // Traiter le don
    public function donner(Request $request, Campagne $campagne)
    {
        // 1. On valide avec les noms exacts de la BD
        $request->validate([
            'montant' => 'required|numeric|min:500',
            'mode_paiement' => 'required|in:mtn_momo,orange_money',
        ]);

        // 2. On insère les données
        Donation::create([
            'user_id' => auth()->id(),
            'campagne_id' => $campagne->id,
            'montant' => $request->montant,
            'mode_paiement' => $request->mode_paiement, // 👈 Correspond à la BD
            'statut' => 'en_attente',                   // 👈 Correspond à la BD
            'transaction_id' => uniqid('DON-'),         // 👈 Génère "DON-64f8a9b..."
        ]);

        return redirect()->back();
    }

    // Afficher l'historique complet des dons de l'utilisateur connecté
    public function historique()
    {
        $user = auth()->user();

        $donations = \App\Models\Donation::with('campagne')
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(10); // 10 dons par page

        return Inertia::render('Historique/Index', [
            'donations' => $donations
        ]);
    }

    // Traiter un commentaire
    public function commenter(Request $request, Campagne $campagne)
    {
        $request->validate([
            'contenu' => 'required|string|max:1000',
        ]);

        $campagne->comments()->create([
            'user_id' => auth()->id(),
            'contenu' => $request->contenu,
        ]);

        return redirect()->back();
    }
}
