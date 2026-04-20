<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CampagneController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\StatistiqueController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- ROUTES PUBLIQUES ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Campagnes (Visualisation)
Route::get('/campagnes', [CampagneController::class, 'index']);
Route::get('/campagnes/featured', [CampagneController::class, 'featured']);
Route::get('/campagnes/{slug}', [CampagneController::class, 'show']);


// --- ROUTES PROTÉGÉES (Sanctum) ---
Route::middleware('auth:sanctum')->group(function () {

    // Authentification
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Dons
    Route::post('/donations', [DonationController::class, 'store']);

    // Statistiques Utilisateur
    Route::get('/user/stats', [StatistiqueController::class, 'userStats']);

    // --- ROUTES ADMIN (Accessibles seulement si role === 'admin') ---
    Route::middleware('can:admin-access')->group(function () {
        Route::get('/admin/stats', [StatistiqueController::class, 'adminStats']);
        Route::post('/admin/campagnes', [CampagneController::class, 'store']);
        // Ajoute ici les routes pour modifier/supprimer
    });
});
