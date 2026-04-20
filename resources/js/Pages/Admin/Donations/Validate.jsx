import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Validate({ auth, donations }) {

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

    const handleStatusChange = (id, newStatus, messageConfirmation) => {
        if (confirm(messageConfirmation)) {
            router.patch(route('admin.donations.status', id), { statut: newStatus }, {
                preserveScroll: true,
                onSuccess: () => {
                    if (newStatus === 'complete') toast.success('Don validé ! La cagnotte a été créditée.');
                    if (newStatus === 'echoue') toast.info('Le don a été rejeté.');
                },
                onError: () => toast.error('Erreur lors du traitement.'),
            });
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Validation des Dons" />
            <ToastContainer position="top-right" autoClose={4000} />

            <div className="max-w-[1400px] mx-auto font-sans">

                {/* En-tête */}
                <div className="flex flex-col justify-between gap-4 pb-6 mb-8 border-b border-gray-100 md:flex-row md:items-center">
                    <div>
                        <h2 className="text-2xl font-extrabold text-[#0F172A] flex items-center gap-3">
                            Validation en attente
                            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                {donations.total} à traiter
                            </span>
                        </h2>
                        <p className="mt-1 text-sm font-medium text-gray-500">Vérifiez les paiements reçus (MTN/Orange Money) avant de les créditer aux campagnes.</p>
                    </div>

                    <Link
                        href={route('admin.donations.index')}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-[#0F172A] rounded-xl text-sm font-bold hover:bg-gray-50 transition shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Voir tout l'historique
                    </Link>
                </div>

                {/* Liste des validations sous forme de cartes détaillées */}
                {donations.data && donations.data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {donations.data.map((don) => (
                            <div key={don.id} className="relative flex flex-col p-6 overflow-hidden transition bg-white border shadow-sm border-amber-100 rounded-2xl hover:shadow-md">
                                {/* Bandeau visuel latéral */}
                                <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-400"></div>

                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">Transaction</p>
                                        <p className="text-lg font-extrabold text-[#0F172A] font-mono">{don.transaction_id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">Montant à créditer</p>
                                        <p className="text-2xl font-extrabold text-[#1A8C4B]">{formatMoney(don.montant)}</p>
                                    </div>
                                </div>

                                <div className="grid flex-1 grid-cols-2 gap-4 p-4 mb-6 border border-gray-100 bg-gray-50 rounded-xl">
                                    <div>
                                        <p className="mb-1 text-xs text-gray-500">Donateur</p>
                                        <p className="font-bold text-[#0F172A] text-sm">{don.user ? don.user.name : 'Anonyme'}</p>
                                    </div>
                                    <div>
                                        <p className="mb-1 text-xs text-gray-500">Moyen de paiement</p>
                                        <p className="font-bold text-[#0F172A] text-sm uppercase flex items-center gap-2">
                                            {don.mode_paiement === 'mtn_momo' ? (
                                                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                                            ) : (
                                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                            )}
                                            {don.mode_paiement.replace('_', ' ')}
                                        </p>
                                    </div>
                                    <div className="col-span-2 pt-3 mt-1 border-t border-gray-200">
                                        <p className="mb-1 text-xs text-gray-500">Campagne ciblée</p>
                                        <p className="font-bold text-[#0F172A] text-sm line-clamp-1">
                                            {don.campagne ? don.campagne.titre : <span className="italic text-red-400">Campagne introuvable</span>}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mt-auto">
                                    <button
                                        onClick={() => handleStatusChange(don.id, 'complete', `Confirmez-vous la réception de ${formatMoney(don.montant)} pour le projet "${don.campagne?.titre}" ?`)}
                                        className="flex-1 py-3 bg-[#1A8C4B] hover:bg-[#15713c] text-white text-sm font-bold rounded-xl transition flex justify-center items-center gap-2 shadow-md"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        Valider le paiement
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(don.id, 'echoue', 'Rejeter ce paiement (ex: solde insuffisant, échec opérateur) ?')}
                                        className="px-4 py-3 text-sm font-bold text-red-600 transition border border-red-100 bg-red-50 hover:bg-red-100 rounded-xl"
                                        title="Rejeter"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-16 text-center bg-white border border-gray-100 shadow-sm rounded-3xl">
                        <div className="w-20 h-20 bg-green-50 text-[#1A8C4B] rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-[#0F172A]">Tout est à jour !</h3>
                        <p className="max-w-md mx-auto mt-2 text-gray-500">Il n'y a actuellement aucun don en attente de validation. Vous avez traité toutes les transactions.</p>
                        <Link href={route('admin.donations.index')} className="mt-6 inline-block text-[#1A8C4B] font-bold hover:underline">
                            Consulter l'historique complet
                        </Link>
                    </div>
                )}

                {donations.links && donations.data.length > 0 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {donations.links.map((link, idx) => (
                            <Link key={idx} href={link.url || '#'} dangerouslySetInnerHTML={{ __html: link.label }} className={`px-4 py-2 text-sm font-bold rounded-xl border transition ${link.active ? 'bg-[#1A8C4B] text-white border-[#1A8C4B]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'} ${!link.url && 'opacity-50 cursor-not-allowed'}`} />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
