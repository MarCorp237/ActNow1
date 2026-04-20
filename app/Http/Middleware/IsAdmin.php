<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        // Si l'utilisateur n'est pas connecté ou n'est pas admin, on bloque
        if (! $request->user() || $request->user()->role !== 'admin') {
            abort(403, 'Accès non autorisé. Cette section est réservée aux administrateurs.');
        }

        return $next($request);
    }
}
