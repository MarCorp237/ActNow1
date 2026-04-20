<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationController extends Controller
{
    // Afficher l'historique de TOUS les dons
    public function index()
    {
        $donations = Donation::with(['user', 'campagne'])->latest()->paginate(15);
        return Inertia::render('Admin/Donations/Index', ['donations' => $donations]);
    }

    // 👈 NOUVELLE MÉTHODE : Afficher UNIQUEMENT les dons "en_attente"
    public function pending()
    {
        $donations = Donation::with(['user', 'campagne'])
            ->where('statut', 'en_attente')
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Donations/Validate', [
            'donations' => $donations
        ]);
    }

    // Mettre à jour le statut
    public function updateStatus(Request $request, Donation $donation)
    {
        $request->validate([
            'statut' => 'required|in:complete,echoue' // 👈 Utilisation des statuts de ta BD
        ]);

        // Si le don était en attente et qu'on le valide, on augmente la cagnotte
        if ($donation->statut === 'en_attente' && $request->statut === 'complete') {
            if ($donation->campagne) {
                $donation->campagne->increment('collecte', $donation->montant);
            }
        }

        // Si le don était validé et qu'on le rejette, on diminue la cagnotte
        if ($donation->statut === 'complete' && $request->statut === 'echoue') {
             if ($donation->campagne) {
                $donation->campagne->decrement('collecte', $donation->montant);
            }
        }

        $donation->update(['statut' => $request->statut]);

        return redirect()->back();
    }
}
