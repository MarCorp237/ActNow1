import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Edit({ auth, userEdit }) {
    const { data, setData, put, processing, errors } = useForm({
        name: userEdit.name || '',
        email: userEdit.email || '',
        role: userEdit.role || 'user',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        // Comme on n'a pas de fichiers, on peut utiliser un vrai PUT Inertia
        put(route('admin.users.update', userEdit.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Profil mis à jour !');
                setData('password', ''); // On vide les champs MDP par sécurité
                setData('password_confirmation', '');
            },
            onError: () => toast.error('Erreur lors de la mise à jour.'),
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Éditer - ${userEdit.name}`} />
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="max-w-3xl mx-auto font-sans">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-extrabold text-[#0F172A]">Éditer: {userEdit.name}</h2>
                    </div>
                    <Link href="/admin/users" className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#0F172A] hover:bg-gray-50 transition shadow-sm">
                        &larr; Retour
                    </Link>
                </div>

                <form onSubmit={submit} className="p-8 space-y-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-bold text-[#0F172A] mb-2">Nom complet</label>
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-[#1A8C4B] transition" />
                            {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#0F172A] mb-2">Adresse Email</label>
                            <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-[#1A8C4B] transition" />
                            {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#0F172A] mb-2">Rôle</label>
                        <select value={data.role} onChange={e => setData('role', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-[#1A8C4B] transition">
                            <option value="user">Utilisateur standard</option>
                            <option value="admin">Administrateur</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-xs mt-1.5">{errors.role}</p>}
                    </div>

                    {/* Section Mot de Passe */}
                    <div className="pt-6 border-t border-gray-100">
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-[#0F172A]">Changer le mot de passe</h3>
                            <p className="mt-1 text-xs text-gray-500">Laissez vide si vous ne souhaitez pas modifier le mot de passe de cet utilisateur.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <input type="password" placeholder="Nouveau mot de passe" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-[#1A8C4B] transition" />
                                {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
                            </div>
                            <div>
                                <input type="password" placeholder="Confirmer le mot de passe" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-[#1A8C4B] transition" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button disabled={processing} type="submit" className="px-8 py-3 rounded-xl shadow-md text-sm font-bold text-white bg-[#0F172A] hover:bg-[#1e293b] transition disabled:opacity-50">
                            Mettre à jour le profil
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
