<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\Campagne;
use App\Models\User;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        $comments = [
            ['email' => 'marie@example.com', 'titre' => 'Aide aux orphelins du Cameroun', 'txt' => 'Très belle initiative !'],
            ['email' => 'jean@example.com', 'titre' => "Construction d'un puits au Sénégal", 'txt' => 'Bravo pour ce projet.'],
            ['email' => 'sophie@example.com', 'titre' => "Santé maternelle en Côte d'Ivoire", 'txt' => 'Merci pour tout ce que vous faites.'],
        ];

        foreach ($comments as $com) {
            $user = User::where('email', $com['email'])->first();
            $campagne = Campagne::where('titre', $com['titre'])->first();

            if ($user && $campagne) {
                Comment::create([
                    'user_id' => $user->id,
                    'campagne_id' => $campagne->id,
                    'contenu' => $com['txt'],
                ]);
            }
        }

        $this->command->info('✅ Commentaires créés');
    }
}