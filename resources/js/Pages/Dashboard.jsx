import React from 'react';
import UserLayout from '@/Layouts/UserLayout'; // On utilise notre nouveau layout
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, mesDons, stats, featuredCampagnes }) {

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

    const getStatusStyle = (statut) => {
        switch (statut) {
            case 'complete': return 'text-[#1A8C4B] bg-[#1A8C4B]/10';
            case 'failed': return 'text-red-600 bg-red-100';
            default: return 'text-[#0F172A] bg-gray-200';
        }
    };

    return (
        <UserLayout user={auth.user}>
            <Head title="Mon Espace Solidarité" />

            <div className="max-w-[1400px] mx-auto space-y-8 font-sans">

                {/* --- HEADER BIENVENUE --- */}
                <div className="bg-[#0F172A] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#1A8C4B] opacity-20 rounded-full blur-3xl"></div>
                    <div className="absolute w-48 h-48 rounded-full right-20 -bottom-20 bg-emerald-400 opacity-10 blur-3xl"></div>

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="mb-3 text-3xl font-extrabold md:text-4xl">Bonjour, {auth.user.name}</h2>
                        <p className="text-sm font-medium leading-relaxed text-gray-300 md:text-base">
                            Votre générosité change des vies. Suivez ici votre impact, vos contributions récentes et découvrez les causes urgentes qui ont besoin de vous aujourd'hui.
                        </p>
                    </div>

                    <div className="relative z-10 flex w-full gap-4 md:w-auto">
                        <Link href="/" className="flex-1 md:flex-none px-6 py-3.5 bg-[#1A8C4B] hover:bg-[#15713c] text-white text-sm font-bold rounded-xl transition shadow-lg shadow-[#1A8C4B]/30 flex justify-center items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            Faire un don
                        </Link>
                    </div>
                </div>

                {/* --- STATISTIQUES PERSONNELLES --- */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex items-center gap-6 p-6 transition duration-300 bg-white border border-gray-100 shadow-sm rounded-3xl group hover:shadow-md">
                        <div className="w-16 h-16 bg-[#1A8C4B] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <p className="mb-1 text-sm font-bold tracking-wider text-gray-400 uppercase">Total donné</p>
                            <p className="text-3xl font-extrabold text-[#0F172A]">{formatMoney(stats.total_donne)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 p-6 transition duration-300 bg-white border border-gray-100 shadow-sm rounded-3xl group hover:shadow-md">
                        <div className="w-16 h-16 bg-[#0F172A] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <p className="mb-1 text-sm font-bold tracking-wider text-gray-400 uppercase">Causes soutenues</p>
                            <p className="text-3xl font-extrabold text-[#0F172A]">{stats.campagnes_soutenues} <span className="text-sm font-medium text-gray-400">projets</span></p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">

                    {/* --- COLONNE DE GAUCHE : HISTORIQUE (Prend 2 colonnes sur grand écran) --- */}
                    <div className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm xl:col-span-2 rounded-3xl">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-[#0F172A]">Dons récents</h3>
                            <Link href="#" className="text-sm font-bold text-[#1A8C4B] hover:underline">Voir tout</Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#0F172A]/5">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Date & Réf</th>
                                        <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Campagne</th>
                                        <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Montant</th>
                                        <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Statut</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {mesDons && mesDons.length > 0 ? (
                                        mesDons.map((don) => (
                                            <tr key={don.id} className="transition hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-[#0F172A]">
                                                            {new Date(don.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </span>
                                                        <span className="text-xs text-gray-400 font-mono mt-0.5">TRX-{String(don.id).padStart(4, '0')}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-bold text-[#0F172A] line-clamp-1">
                                                        {don.campagne ? don.campagne.titre : 'Campagne terminée'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-bold text-[#1A8C4B]">{formatMoney(don.montant)}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 ${getStatusStyle(don.statut)}`}>
                                                        {don.statut === 'complete' ? 'Validé' : (don.statut === 'failed' ? 'Échoué' : 'En attente')}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                                <p className="font-medium">Vous n'avez pas encore effectué de don.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* --- COLONNE DE DROITE : CAMPAGNES À LA UNE --- */}
                    <div className="bg-[#0F172A]/5 rounded-3xl p-6 border border-gray-100 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#1A8C4B] animate-pulse"></span>
                                Urgences
                            </h3>
                        </div>

                        <div className="flex-1 pr-2 space-y-4 overflow-y-auto custom-scrollbar">
                            {featuredCampagnes && featuredCampagnes.length > 0 ? (
                                featuredCampagnes.map((campagne) => {
                                    // Calcul de la progression
                                    const progress = campagne.collecte ? Math.round((campagne.collecte / campagne.objectif) * 100) : 0;
                                    const imageCover = campagne.images && campagne.images.length > 0 ? `/storage/${campagne.images[0].chemin}` : '/images/default-campaign.jpg';

                                    return (
                                        <div key={campagne.id} className="overflow-hidden transition bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md group">
                                            <div className="relative w-full h-32 overflow-hidden">
                                                <img src={imageCover} alt={campagne.titre} className="object-cover w-full h-full transition duration-500 group-hover:scale-105" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent flex items-end p-4">
                                                    <h4 className="text-sm font-bold text-white line-clamp-1">{campagne.titre}</h4>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="mb-3">
                                                    <div className="flex justify-between text-xs font-bold text-[#0F172A] mb-1.5">
                                                        <span>{progress}% collecté</span>
                                                        <span className="text-[#1A8C4B]">{formatMoney(campagne.objectif)}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                        <div className="bg-[#1A8C4B] h-1.5 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                                                    </div>
                                                </div>
                                                <Link href={`/campagnes/${campagne.id}`} className="block w-full py-2 text-center bg-[#0F172A] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg transition">
                                                    Soutenir ce projet
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="py-8 text-center">
                                    <p className="text-sm font-medium text-gray-500">Aucune urgence signalée pour le moment.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
            `}} />
        </UserLayout>
    );
}
