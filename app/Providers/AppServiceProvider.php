<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL; // 👈 N'oublie pas d'ajouter cet import

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Forcer l'HTTPS si on est en production (sur Render)
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }
    }
}
