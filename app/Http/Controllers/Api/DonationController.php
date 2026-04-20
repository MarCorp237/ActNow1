<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campagne;
use App\Models\Donation;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'campagne_id' => 'required|exists:campagnes,id',
            'montant' => 'required|numeric|min:500',
            'mode_paiement' => 'required|in:mtn_momo,orange_money',
        ]);

        // SIMULATION DE PAIEMENT
        // Dans un projet réel, on appellerait une API ici.
        $paiementSucces = true;

        if ($paiementSucces) {
            $donation = Donation::create([
                'user_id' => $request->user()->id,
                'campagne_id' => $request->campagne_id,
                'montant' => $request->montant,
                'mode_paiement' => $request->mode_paiement,
                'statut' => 'complete', // On valide direct car c'est une simulation
                'message' => $request->message,
                'est_anonyme' => $request->est_anonyme ?? false,
            ]);

            // Mise à jour de la collecte de la campagne
            $campagne = Campagne::find($request->campagne_id);
            $campagne->increment('collecte', $request->montant);

            return response()->json(['message' => 'Merci pour votre don !', 'donation' => $donation]);
        }

        return response()->json(['error' => 'Échec du paiement'], 400);
    }
}
