<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Campagne;
use App\Models\Categorie;
use App\Models\User;
use Illuminate\Support\Str;

class CampagneSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();
        $categories = Categorie::all();

        $campagnes = [
            [
                'titre' => 'Aide aux orphelins du Cameroun',
                'description' => "Soutenez les orphelins de Mbangog au Cameroun. Votre don permettra de fournir des repas, des vêtements et du matériel scolaire à plus de 50 enfants qui en ont besoin. Chaque contribution compte pour redonner le sourire à ces enfants.",
                'description_courte' => 'Aidez les orphelins de Mbangog à avoir un avenir meilleur.',
                'objectif' => 500000,
                'collecte' => 125000,
                'cat_nom' => 'Aide humanitaire',
                'statut' => 'active',
                'is_featured' => true,
            ],
            [
                'titre' => "Construction d'un puits au Sénégal",
                'description' => "Dans le village de Diourbel au Sénégal, l'accès à l'eau potable est un luxe. Nous collectons des fonds pour construire un puits qui desservira plus de 500 personnes. Votre don changera des vies.",
                'description_courte' => "Offrez de l'eau potable à tout un village sénégalais.",
                'objectif' => 1500000,
                'collecte' => 818000,
                'cat_nom' => 'Environnement',
                'statut' => 'active',
                'is_featured' => true,
            ],
            [
                'titre' => "Santé maternelle en Côte d'Ivoire",
                'description' => "Aidez-nous à équiper la maternité de l'hôpital de Bouaké. Matériel médical, formation du personnel, médicaments... Votre don sauvera des vies de mères et de nouveau-nés.",
                'description_courte' => "Équipez une maternité pour sauver des vies.",
                'objectif' => 8000000,
                'collecte' => 2100000,
                'cat_nom' => 'Santé',
                'statut' => 'active',
                'is_featured' => true,
            ],
            [
                'titre' => 'Éducation pour tous au Burkina Faso',
                'description' => "Construction d'une école primaire dans le village de Koudougou. Votre don permettra à 200 enfants d'accéder à l'éducation dans des conditions décentes.",
                'description_courte' => 'Construisez une école pour 200 enfants.',
                'objectif' => 3000000,
                'collecte' => 450000,
                'cat_nom' => 'Éducation',
                'statut' => 'active',
                'is_featured' => false,
            ],
            [
                'titre' => 'Protection des éléphants au Gabon',
                'description' => "Soutenez les rangers qui protègent les éléphants de forêt contre le braconnage. Équipement, formation, patrouilles... Aidez-nous à préserver cette espèce menacée.",
                'description_courte' => 'Protégez les éléphants du braconnage.',
                'objectif' => 2000000,
                'collecte' => 980000,
                'cat_nom' => 'Protection animale',
                'statut' => 'active',
                'is_featured' => false,
            ],
        ];

        foreach ($campagnes as $camp) {
            $category = $categories->where('nom', $camp['cat_nom'])->first();

            Campagne::updateOrCreate(
                ['titre' => $camp['titre']],
                [
                    'slug' => Str::slug($camp['titre']),
                    'description' => $camp['description'],
                    'description_courte' => $camp['description_courte'],
                    'objectif' => $camp['objectif'],
                    'collecte' => $camp['collecte'],
                    'categorie_id' => $category->id,
                    'user_id' => $admin->id,
                    'statut' => $camp['statut'],
                    'is_featured' => $camp['is_featured'],
                    'date_fin' => now()->addDays(rand(15, 60)),
                ]
            );
        }

        $this->command->info('✅ 5 campagnes créées');
    }
}