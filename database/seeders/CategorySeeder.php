<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['nom' => 'Santé', 'couleur' => '#EF4444'],
            ['nom' => 'Éducation', 'couleur' => '#3B82F6'],
            ['nom' => 'Environnement', 'couleur' => '#10B981'],
            ['nom' => 'Aide humanitaire', 'couleur' => '#F59E0B'],
            ['nom' => 'Protection animale', 'couleur' => '#8B5CF6'],
            ['nom' => 'Culture', 'couleur' => '#EC4899'],
        ];

        foreach ($categories as $cat) {
            Categorie::updateOrCreate(
                ['nom' => $cat['nom']],
                [
                    'slug' => Str::slug($cat['nom']),
                    'couleur' => $cat['couleur'],
                ]
            );
        }

        $this->command->info('✅ 6 catégories créées');
    }
}