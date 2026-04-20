import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index({ auth, donations }) {

    // Formatage monétaire
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

    // Fonction pour changer le statut (Valider ou Rejeter)
    const handleStatusChange = (id, newStatus, messageConfirmation) => {
        if (confirm(messageConfirmation)) {
            router.patch(route('admin.donations.status', id), { statut: newStatus }, {
                preserveScroll: true,
                onSuccess: () => {
                    if (newStatus === 'complete') toast.success('Don validé avec succès ! La cagnotte a été mise à jour.');
                    if (newStatus === 'failed') toast.info('Le don a été rejeté/annulé.');
                },
                onError: () => toast.error('Une erreur est survenue lors du traitement.'),
            });
        }
    };

    // Design des badges de statut
    const getStatusBadge = (statut) => {
        switch (statut) {
            case 'complete':
                return <span className="px-3 py-1 text-xs font-bold text-[#1A8C4B] bg-[#1A8C4B]/10 rounded-lg flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Validé</span>;
            case 'failed':
                return <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-red-600 bg-red-100 rounded-lg"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg> Échoué/Rejeté</span>;
            default:
                return <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg text-amber-600 bg-amber-100"><svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> En attente</span>;
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Gestion des Dons" />
            <ToastContainer position="top-right" autoClose={4000} />

            <div className="max-w-[1600px] mx-auto font-sans">

                {/* En-tête */}
                <div className="flex flex-col justify-between gap-4 pb-6 mb-8 border-b border-gray-100 md:flex-row md:items-center">
                    <div>
                        <h2 className="text-2xl font-extrabold text-[#0F172A]">Transactions & Dons</h2>
                        <p className="mt-1 text-sm font-medium text-gray-500">Validez ou rejetez les contributions des utilisateurs.</p>
                    </div>
                </div>

                {/* Tableau */}
                <div className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead className="bg-[#0F172A]/5 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Réf & Date</th>
                                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Donateur</th>
                                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Campagne soutenue</th>
                                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Montant</th>
                                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Statut</th>
                                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-right text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {donations.data && donations.data.length > 0 ? (
                                    donations.data.map((don) => (
                                        <tr key={don.id} className="transition hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-[#0F172A] font-mono">TRX-{String(don.id).padStart(5, '0')}</span>
                                                    <span className="text-xs font-medium text-gray-500 mt-0.5">
                                                        {new Date(don.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center text-white font-bold text-xs shrink-0">
                                                        {don.user ? don.user.name.charAt(0).toUpperCase() : 'A'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-[#0F172A]">{don.user ? don.user.name : 'Anonyme'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-600 truncate max-w-[200px] block" title={don.campagne?.titre}>
                                                    {don.campagne ? don.campagne.titre : <span className="italic text-gray-400">Campagne supprimée</span>}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-[#1A8C4B]">{formatMoney(don.montant)}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(don.statut)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {don.statut === 'pending' ? (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleStatusChange(don.id, 'complete', 'Confirmez-vous la réception de ces fonds ? La cagnotte sera mise à jour.')}
                                                            className="px-3 py-1.5 text-xs font-bold text-white bg-[#1A8C4B] hover:bg-[#15713c] rounded-lg transition shadow-sm"
                                                        >
                                                            Valider
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusChange(don.id, 'failed', 'Voulez-vous vraiment rejeter/annuler ce don ?')}
                                                            className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg transition"
                                                        >
                                                            Rejeter
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs italic font-medium text-gray-400">Traitée</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <p className="font-medium text-gray-500">Aucun don n'a été enregistré pour le moment.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {donations.links && donations.data.length > 0 && (
                        <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/50">
                            <span className="text-sm font-medium text-gray-500">Affichage de {donations.from} à {donations.to} sur {donations.total} dons</span>
                            <div className="flex gap-1.5">
                                {donations.links.map((link, idx) => (
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
