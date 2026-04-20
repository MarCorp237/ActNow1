<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name' => 'Marie Kouassi', 'email' => 'marie@example.com', 'ville' => 'Douala'],
            ['name' => 'Jean Dupont', 'email' => 'jean@example.com', 'ville' => 'Yaoundé'],
            ['name' => 'Sophie Mbarga', 'email' => 'sophie@example.com', 'ville' => 'Bafoussam'],
            ['name' => 'Pierre Ndam', 'email' => 'pierre@example.com', 'ville' => 'Dakar', 'pays' => 'Sénégal'],
            ['name' => 'Claire Atangana', 'email' => 'claire@example.com', 'ville' => 'Abidjan', 'pays' => "Côte d'Ivoire"],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make('password123'),
                    'role' => 'user',
                    'telephone' => '69' . rand(1000000, 9999999),
                    'pays' => $userData['pays'] ?? 'Cameroun',
                    'ville' => $userData['ville'],
                    'email_verified_at' => now(),
                ]
            );
        }

        $this->command->info('✅ 5 utilisateurs créés');
    }
}
