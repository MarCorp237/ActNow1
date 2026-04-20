<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\CampagneController;
use App\Http\Controllers\Admin\DonationController;
use App\Http\Middleware\IsAdmin; // 👈 On importe notre nouveau Middleware ici
use App\Models\Campagne;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CauseController;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Route de la page d'accueil (Welcome)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'campagnes_featured' => Campagne::where('is_featured', true)
            ->where('statut', 'active')
            ->take(4)
            ->get(),
    ]);
});

// Routes protégées nécessitant une connexion
Route::middleware(['auth', 'verified'])->group(function () {

   // 👤 ZONE UTILISATEUR NORMAL
    Route::get('/dashboard', function (Request $request) {
        if ($request->user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        $user = $request->user();

        $mesDons = \App\Models\Donation::with('campagne')
            ->where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();

        $stats = [
            'total_donne' => \App\Models\Donation::where('user_id', $user->id)->where('statut', 'complete')->sum('montant'),
            'campagnes_soutenues' => \App\Models\Donation::where('user_id', $user->id)->where('statut', 'complete')->distinct('campagne_id')->count('campagne_id'),
        ];

        $featuredCampagnes = \App\Models\Campagne::with('images')
            ->where('statut', 'active')
            ->where('is_featured', true)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Dashboard', [
            'mesDons' => $mesDons,
            'stats' => $stats,
            'featuredCampagnes' => $featuredCampagnes
        ]);
    })->name('dashboard');

    // 👈 LES ROUTES SONT SORTIES ICI, SOUS LE DASHBOARD !
    Route::get('/causes', [CauseController::class, 'index'])->name('causes.index');
    Route::get('/historique', [CauseController::class, 'historique'])->name('donations.history');
    Route::get('/causes/{campagne}', [CauseController::class, 'show'])->name('causes.show');
    Route::post('/causes/{campagne}/don', [CauseController::class, 'donner'])->name('causes.donner');
    Route::post('/causes/{campagne}/comment', [CauseController::class, 'commenter'])->name('causes.commenter');

    // 🛡️ ZONE ADMINISTRATION
    // On utilise la classe IsAdmin::class au lieu de la Closure qui causait l'erreur
    Route::prefix('admin')->name('admin.')->middleware(IsAdmin::class)->group(function () {

        // Dashboard Admin
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Gestion des campagnes
        Route::resource('campagnes', CampagneController::class);

        Route::resource('users', UserController::class);

        // Gestion des Dons
        Route::get('/donations/validate', [DonationController::class, 'pending'])->name('donations.pending'); // 👈 NOUVELLE ROUTE
        Route::get('/donations', [DonationController::class, 'index'])->name('donations.index');
        Route::patch('/donations/{donation}/status', [DonationController::class, 'updateStatus'])->name('donations.status');

        // Gestion des Dons
        Route::get('/donations', [DonationController::class, 'index'])->name('donations.index');
        Route::patch('/donations/{donation}/status', [DonationController::class, 'updateStatus'])->name('donations.status');

        // Suppression spécifique d'une image dans la galerie
        Route::delete('/campagnes/images/{id}', [CampagneController::class, 'destroyImage'])->name('campagnes.images.destroy');

    });

});

// Routes de profil
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';