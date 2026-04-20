<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@actnow.cm'],
            [
                'name' => 'Administrateur ActNow',
                'password' => Hash::make('Admin2024!'),
                'role' => 'admin',
                'telephone' => '690123456',
                'pays' => 'Cameroun',
                'ville' => 'Yaoundé',
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('✅ Admin créé : admin@actnow.cm / Admin2024!');
    }
}
