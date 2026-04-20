import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user', // Rôle par défaut
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => toast.success('Utilisateur créé avec succès !'),
            onError: () => toast.error('Erreur, veuillez vérifier le formulaire.'),
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Créer un utilisateur" />
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="max-w-3xl mx-auto font-sans">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-extrabold text-[#0F172A]">Nouveau Membre</h2>
                    </div>
                    <Link href="/admin/users" className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#0F172A] hover:bg-gray-50 transition shadow-sm">
                        &larr; Retour
                    </Link>
                </div>

                <form onSubmit={submit} className="p-8 space-y-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-bold text-[#0F172A] mb-2">Nom complet</label>
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] transition" />
                            {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#0F172A] mb-2">Adresse Email</label>
                            <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] transition" />
                            {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#0F172A] mb-2">Rôle sur la plateforme</label>
                        <select value={data.role} onChange={e => setData('role', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] transition">
                            <option value="user">Utilisateur standard (Peut faire des dons)</option>
                            <option value="admin">Administrateur (Accès complet au dashboard)</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-xs mt-1.5">{errors.role}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-6 pt-6 border-t border-gray-100 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-bold text-[#0F172A] mb-2">Mot de passe</label>
                            <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] transition" />
                            {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#0F172A] mb-2">Confirmer le mot de passe</label>
                            <input type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] transition" />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button disabled={processing} type="submit" className="px-8 py-3 rounded-xl shadow-md text-sm font-bold text-white bg-[#1A8C4B] hover:bg-[#15713c] transition disabled:opacity-50">
                            Enregistrer l'utilisateur
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
