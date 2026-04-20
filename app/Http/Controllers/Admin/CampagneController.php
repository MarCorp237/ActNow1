<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Campagne;
use App\Models\Categorie; // Assure-toi que le nom de ton modèle de catégorie est correct (Category ou Categorie)
use App\Models\Image; // Modèle pour gérer les images multiples
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CampagneController extends Controller
{
    /**
     * Affiche la liste des campagnes.
     */
    // Dans app/Http/Controllers/Admin/CampagneController.php

    public function index()
    {
        // 🚀 AJOUTE ->with('images') ICI
        // Cela récupère les campagnes ET toutes les images liées en une seule requête
        $campagnes = Campagne::with(['categorie', 'images']) // Charge 'categorie' et 'images'
            ->latest()
            ->paginate(12); // Pagination

        return Inertia::render('Admin/Campagnes/Index', [
            'campagnes' => $campagnes
        ]);
    }

    /**
     * Affiche le formulaire de création.
     */
    public function create()
    {
        return Inertia::render('Admin/Campagnes/Create', [
            'categories' => Categorie::all()
        ]);
    }

    /**
     * Enregistre une nouvelle campagne et ses images.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description_courte' => 'required|string|max:500',
            'contenu' => 'required|string',
            'objectif' => 'required|numeric|min:0',
            'categorie_id' => 'required|exists:categories,id',
            'statut' => 'required|in:pending,active,completed',
            'is_featured' => 'boolean',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048' // Max 2MB par image
        ]);

       // Création de la campagne
        $campagne = Campagne::create([
            'titre' => $validated['titre'],
            'description_courte' => $validated['description_courte'],
            'description' => $validated['contenu'],
            'objectif' => $validated['objectif'],
            'categorie_id' => $validated['categorie_id'],
            'statut' => $validated['statut'],
            'is_featured' => $request->boolean('is_featured'),
            'user_id' => auth()->id(), // 👈 AJOUTE CETTE LIGNE ICI
        ]);

        // Gestion de l'upload des images multiples
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                // Stockage dans storage/app/public/campagnes
                $path = $file->store('campagnes', 'public');

                // Enregistrement dans la table images
                $campagne->images()->create([
                    'chemin' => $path
                ]);
            }
        }

        return redirect()->route('admin.campagnes.index')
                         ->with('success', 'Campagne créée avec succès.');
    }

    /**
     * Affiche le formulaire d'édition.
     */
    public function edit(Campagne $campagne)
    {
        // On charge la campagne avec ses images associées
        $campagne->load('images');

        return Inertia::render('Admin/Campagnes/Edit', [
            'campagne' => $campagne,
            'categories' => Categorie::all()
        ]);
    }

    /**
     * Met à jour la campagne et ajoute de nouvelles images.
     */
    public function update(Request $request, Campagne $campagne)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description_courte' => 'required|string|max:500',
            'contenu' => 'required|string',
            'objectif' => 'required|numeric|min:0',
            'categorie_id' => 'required|exists:categories,id',
            'statut' => 'required|in:pending,active,completed',
            'is_featured' => 'boolean',
            'new_images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        // Mise à jour de la campagne
        $campagne->update([
            'titre' => $validated['titre'],
            'description_courte' => $validated['description_courte'],
            'description' => $validated['contenu'], // Mapper contenu -> description
            'objectif' => $validated['objectif'],
            'categorie_id' => $validated['categorie_id'],
            'statut' => $validated['statut'],
            'is_featured' => $request->boolean('is_featured'),
        ]);

        // Gestion des NOUVELLES images
        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $file) {
                $path = $file->store('campagnes', 'public');
                $campagne->images()->create(['chemin' => $path]);
            }
        }

        return redirect()->back();
    }

    /**
     * Supprime complètement une campagne et toutes ses images.
     */
    public function destroy(Campagne $campagne)
    {
        // Supprimer les fichiers physiques des images
        foreach ($campagne->images as $image) {
            Storage::disk('public')->delete($image->chemin);
        }

        $campagne->delete(); // Les entrées de la table 'images' seront supprimées si le onDelete('cascade') est configuré dans ta migration

        return redirect()->route('admin.campagnes.index')
                         ->with('success', 'Campagne supprimée.');
    }

    /**
     * Supprime une image spécifique de la galerie (Méthode personnalisée).
     */
    public function destroyImage($id)
    {
        $image = Image::findOrFail($id);

        // Suppression du fichier physique
        if (Storage::disk('public')->exists($image->chemin)) {
            Storage::disk('public')->delete($image->chemin);
        }

        // Suppression en base de données
        $image->delete();

        return redirect()->back()->with('success', 'Image supprimée avec succès.');
    }
}