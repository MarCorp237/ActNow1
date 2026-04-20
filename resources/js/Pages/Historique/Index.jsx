import React from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, donations }) {
    const formatMoney = (amount) => new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';

    const getStatusBadge = (statut) => {
        switch (statut) {
            case 'complete':
                return <span className="px-3 py-1 text-xs font-bold text-[#1A8C4B] bg-[#1A8C4B]/10 rounded-full">Validé</span>;
            case 'echoue':
                return <span className="px-3 py-1 text-xs font-bold text-red-600 bg-red-100 rounded-full">Échoué</span>;
            default:
                return <span className="px-3 py-1 text-xs font-bold rounded-full text-amber-600 bg-amber-100">En attente</span>;
        }
    };

    return (
        <UserLayout user={auth.user}>
            <Head title="Mon Historique de Dons" />

            <div className="max-w-[1200px] mx-auto font-sans">
                <div className="mb-10">
                    <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Mon Historique</h2>
                    <p className="font-medium text-gray-500">Retrouvez l'intégralité de vos contributions et le suivi de vos transactions.</p>
                </div>

                <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0F172A]/5 border-b border-gray-100">
                                    <th className="px-8 py-5 text-xs font-bold tracking-wider text-gray-500 uppercase">Date & Référence</th>
                                    <th className="px-8 py-5 text-xs font-bold tracking-wider text-gray-500 uppercase">Cause soutenue</th>
                                    <th className="px-8 py-5 text-xs font-bold tracking-wider text-gray-500 uppercase">Montant</th>
                                    <th className="px-8 py-5 text-xs font-bold tracking-wider text-gray-500 uppercase">Mode</th>
                                    <th className="px-8 py-5 text-xs font-bold tracking-wider text-gray-500 uppercase">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {donations.data && donations.data.length > 0 ? (
                                    donations.data.map((don) => (
                                        <tr key={don.id} className="transition duration-200 hover:bg-gray-50/50">
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-[#0F172A]">
                                                        {new Date(don.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </span>
                                                    <span className="text-[11px] text-gray-400 font-mono mt-1 uppercase tracking-tighter">
                                                        Ref: {don.transaction_id || `DON-${don.id}`}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                {don.campagne ? (
                                                    <Link href={route('causes.show', don.campagne.id)} className="text-sm font-bold text-[#0F172A] hover:text-[#1A8C4B] transition line-clamp-1">
                                                        {don.campagne.titre}
                                                    </Link>
                                                ) : (
                                                    <span className="text-sm italic text-gray-400">Cause archivée</span>
                                                )}
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-sm font-extrabold text-[#1A8C4B]">{formatMoney(don.montant)}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-xs font-bold text-gray-500 uppercase">
                                                    {don.mode_paiement ? don.mode_paiement.replace('_', ' ') : 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                {getStatusBadge(don.statut)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center">
                                            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 border border-gray-200 border-dashed rounded-full bg-gray-50">
                                                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </div>
                                            <h4 className="text-[#0F172A] font-bold">Aucune transaction</h4>
                                            <p className="mt-1 text-sm text-gray-500">Vos futurs dons apparaîtront ici.</p>
                                            <Link href={route('causes.index')} className="mt-6 inline-block bg-[#1A8C4B] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md"> Explorer les causes </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {donations.links && donations.data.length > 0 && (
                        <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50">
                             <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Page {donations.current_page} sur {donations.last_page}</p>
                             <div className="flex gap-2">
                                {donations.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 text-xs font-extrabold rounded-lg transition border ${link.active ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'} ${!link.url && 'opacity-30 cursor-not-allowed'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                             </div>
                        </div>
                    )}
                </div>

                {/* Petit rappel de sécurité */}
                <div className="mt-8 bg-[#1A8C4B]/5 border border-[#1A8C4B]/20 rounded-2xl p-6 flex items-start gap-4">
                    <div className="p-2 bg-[#1A8C4B] text-white rounded-lg shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-[#0F172A]">Informations sur les transactions</h4>
                        <p className="mt-1 text-xs leading-relaxed text-gray-600">
                            Les dons marqués "En attente" sont généralement validés par nos administrateurs sous 24h après réception effective sur nos comptes marchands (MTN/Orange Money). Pour toute réclamation, munissez-vous de votre numéro de référence (Ref: DON-XXX).
                        </p>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
