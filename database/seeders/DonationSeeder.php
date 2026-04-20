<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Donation;
use App\Models\Campagne;
use App\Models\User;

class DonationSeeder extends Seeder
{
    public function run(): void
    {
        $donations = [
            ['email' => 'marie@example.com', 'titre' => 'Aide aux orphelins du Cameroun', 'montant' => 25000, 'msg' => 'Bon courage !'],
            ['email' => 'jean@example.com', 'titre' => "Construction d'un puits au Sénégal", 'montant' => 50000, 'msg' => "L'eau c'est la vie !"],
            ['email' => 'sophie@example.com', 'titre' => "Santé maternelle en Côte d'Ivoire", 'montant' => 100000, 'msg' => 'Pour toutes les mamans.'],
            ['email' => 'pierre@example.com', 'titre' => 'Aide aux orphelins du Cameroun', 'montant' => 15000, 'msg' => 'Merci pour votre action.'],
            ['email' => 'claire@example.com', 'titre' => 'Éducation pour tous au Burkina Faso', 'montant' => 30000, 'msg' => "L'éducation est la clé."],
        ];

        foreach ($donations as $don) {
            $user = User::where('email', $don['email'])->first();
            $campagne = Campagne::where('titre', $don['titre'])->first();

            if ($user && $campagne) {
                Donation::create([
                    'user_id' => $user->id,
                    'campagne_id' => $campagne->id,
                    'montant' => $don['montant'],
                    'message' => $don['msg'],
                    'mode_paiement' => rand(0, 1) ? 'mtn_momo' : 'orange_money',
                    'statut' => 'complete',
                    'est_anonyme' => false,
                ]);
            }
        }

        $this->command->info('✅ Dons créés');
    }
}