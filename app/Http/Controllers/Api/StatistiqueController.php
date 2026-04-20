<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campagne;
use App\Models\Donation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatistiqueController extends Controller
{
    public function adminStats()
    {
        return response()->json([
            'total_collecte' => Donation::where('statut', 'complete')->sum('montant'),
            'total_campagnes' => Campagne::count(),
            'total_users' => User::where('role', 'user')->count(),
            'chart_data' => Donation::select(
                DB::raw('SUM(montant) as total'),
                DB::raw("DATE_FORMAT(created_at, '%M') as month")
            )->where('statut', 'complete')
             ->groupBy('month')
             ->get()
        ]);
    }

    public function userStats(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'mes_dons_total' => $user->totalDonne(),
            'campagnes_soutenues' => $user->nombreCampagnesSoutenues(),
            'historique' => $user->donations()->with('campagne')->latest()->take(5)->get()
        ]);
    }
}
