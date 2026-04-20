<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\Campagne;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // 1. Statistiques globales
        $totalCollecte = Donation::where('statut', 'complete')->sum('montant');
        $donateursActifs = Donation::where('statut', 'complete')->distinct('user_id')->count('user_id');
        $campagnesActives = Campagne::where('statut', 'active')->count();

        // Calcul du taux de complétion moyen des campagnes
        $objectifsTotal = Campagne::where('statut', 'active')->sum('objectif');
        $tauxCompletion = $objectifsTotal > 0 ? round(($totalCollecte / $objectifsTotal) * 100) : 0;

        // 2. Dernières transactions (Les 5 dernières)
        $recentTransactions = Donation::with(['user', 'campagne'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($don) {
                return [
                    'id' => 'TRX-' . str_pad($don->id, 4, '0', STR_PAD_LEFT),
                    'name' => $don->user ? $don->user->name : 'Anonyme',
                    'campaign' => $don->campagne ? $don->campagne->titre : 'Général',
                    'amount' => number_format($don->montant, 0, ',', ' ') . ' FCFA',
                    'statut' => $don->statut // 'complete', 'pending', 'failed'
                ];
            });

        // 3. Données pour le Graphique d'évolution (6 derniers mois)
        // Note: Ceci est une requête simplifiée. Adapte-la selon ton SGBD (MySQL/PostgreSQL)
        $donsParMois = Donation::select(
            DB::raw('sum(montant) as sums'),
            DB::raw("DATE_FORMAT(created_at,'%M') as months")
        )
        ->where('statut', 'complete')
        ->where('created_at', '>', now()->subMonths(6))
        ->groupBy('months')
        ->orderBy('created_at', 'asc')
        ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_collecte' => $totalCollecte,
                'donateurs_actifs' => $donateursActifs,
                'campagnes_actives' => $campagnesActives,
                'taux_completion' => $tauxCompletion,
            ],
            'recentTransactions' => $recentTransactions,
            'chartDons' => [
                'labels' => $donsParMois->pluck('months'),
                'data' => $donsParMois->pluck('sums'),
            ]
        ]);
    }
}
