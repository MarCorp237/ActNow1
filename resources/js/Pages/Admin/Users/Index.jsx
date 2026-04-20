import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index({ auth, users, errors }) {

    // Si le contrôleur renvoie une erreur (ex: on essaie de se supprimer soi-même)
    React.useEffect(() => {
        if (errors && errors.error) {
            toast.error(errors.error);
        }
    }, [errors]);

    const handleDelete = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.')) {
            router.delete(route('admin.users.destroy', id), {
                onSuccess: () => toast.success('Utilisateur supprimé avec succès.'),
            });
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Gestion des Utilisateurs" />
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="max-w-[1600px] mx-auto font-sans">

                <div className="flex flex-col justify-between gap-4 pb-6 mb-8 border-b border-gray-100 md:flex-row md:items-center">
                    <div>
                        <h2 className="text-2xl font-extrabold text-[#0F172A]">Utilisateurs</h2>
                        <p className="mt-1 text-sm font-medium text-gray-500">Gérez les membres et les administrateurs de la plateforme.</p>
                    </div>

                    <Link
                        href={route('admin.users.create')}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1A8C4B] text-white rounded-xl text-sm font-bold hover:bg-[#15713c] transition shadow-md shadow-[#1A8C4B]/20"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                        Ajouter un membre
                    </Link>
                </div>

                <div className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead className="bg-[#0F172A]/5 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Utilisateur</th>
                                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Rôle</th>
                                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Date d'inscription</th>
                                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-right text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.data.map((u) => (
                                    <tr key={u.id} className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {/* Avatar dynamique avec la première lettre */}
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-inner ${u.role === 'admin' ? 'bg-[#1A8C4B]' : 'bg-[#0F172A]'}`}>
                                                    {u.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[#0F172A]">{u.name} {auth.user.id === u.id && <span className="ml-1 text-xs font-normal text-gray-400">(Vous)</span>}</p>
                                                    <p className="text-xs font-medium text-gray-500 mt-0.5">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1.5 inline-flex text-xs font-bold rounded-lg ${
                                                u.role === 'admin'
                                                ? 'text-[#1A8C4B] bg-[#1A8C4B]/10'
                                                : 'text-[#0F172A] bg-gray-100'
                                            }`}>
                                                {u.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-600">
                                                {new Date(u.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route('admin.users.edit', u.id)}
                                                    className="p-2 text-gray-400 bg-white border border-gray-200 rounded-lg hover:text-[#0F172A] hover:bg-gray-50 transition shadow-sm"
                                                    title="Éditer"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </Link>

                                                {auth.user.id !== u.id && (
                                                    <button
                                                        onClick={() => handleDelete(u.id)}
                                                        className="p-2 text-red-400 transition bg-white border border-red-100 rounded-lg shadow-sm hover:text-red-600 hover:bg-red-50"
                                                        title="Supprimer"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.links && users.data.length > 0 && (
                        <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/50">
                            <span className="text-sm font-medium text-gray-500">Affichage de {users.from} à {users.to} sur {users.total} utilisateurs</span>
                            <div className="flex gap-1.5">
                                {users.links.map((link, idx) => (
                                    <Link key={idx} href={link.url || '#'} dangerouslySetInnerHTML={{ __html: link.label }} className={`px-3 py-1.5 text-sm font-bold rounded-lg border transition ${link.active ? 'bg-[#1A8C4B] text-white border-[#1A8C4B] shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'} ${!link.url && 'opacity-50 cursor-not-allowed'}`} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
