import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler);

// Composant principal qui reçoit les VRAIES données du contrôleur
export default function AdminDashboard({ auth, stats, recentTransactions, chartDons }) {

    // Formatage monétaire
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

    // Configuration du Graphique Principal (Évolution des dons)
    const lineChartData = {
        labels: chartDons.labels.length > 0 ? chartDons.labels : ['Aucune donnée'],
        datasets: [
            {
                label: 'Dons validés (FCFA)',
                data: chartDons.data.length > 0 ? chartDons.data : [0],
                borderColor: '#1A8C4B', // Vert ActNow
                backgroundColor: 'rgba(26, 140, 75, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#1A8C4B',
                pointBorderWidth: 2,
            }
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false } },
            y: { grid: { borderDash: [5, 5], color: '#e2e8f0' }, beginAtZero: true }
        }
    };

    // Configuration du Graphique Circulaire (Répartition factice pour l'exemple visuel, à lier en DB si besoin)
    const doughnutData = {
        labels: ['MTN Mobile Money', 'Orange Money', 'Carte Bancaire'],
        datasets: [{
            data: [55, 35, 10],
            backgroundColor: ['#1A8C4B', '#0F172A', '#94A3B8'], // Vert, Bleu Nuit, Gris clair
            borderWidth: 0,
            hoverOffset: 4
        }],
    };

    // Gestion des couleurs de statut
    const getStatusStyle = (statut) => {
        switch (statut) {
            case 'complete': return 'text-[#1A8C4B] bg-[#1A8C4B]/10'; // Vert
            case 'pending': return 'text-[#0F172A] bg-[#0F172A]/10'; // Bleu Nuit
            default: return 'text-red-700 bg-red-100'; // Erreur (seule exception pour l'UX)
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Tableau de bord - Administration" />

            <div className="max-w-[1600px] mx-auto space-y-6 font-sans">

                {/* --- EN-TÊTE --- */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Vue d'ensemble</h2>
                        <p className="text-sm font-medium text-gray-500">Données réelles issues de la base de données.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#0F172A] hover:bg-gray-50 transition shadow-sm">
                            Exporter CSV
                        </button>
                        <Link href="/admin/campagnes/create" className="px-4 py-2 bg-[#1A8C4B] text-white rounded-xl text-sm font-semibold hover:bg-[#15713c] transition shadow-md">
                            + Créer une campagne
                        </Link>
                    </div>
                </div>

                {/* --- CARTES DE STATISTIQUES (Vert, Bleu Nuit, Blanc) --- */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                    {/* Carte 1 : Vert (Principal) */}
                    <div className="bg-[#1A8C4B] p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 opacity-10"><svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-white/20"><span className="text-xl">💰</span></div>
                                <h3 className="text-sm font-semibold">Total Collecté</h3>
                            </div>
                            <p className="text-3xl font-extrabold">{formatMoney(stats.total_collecte)}</p>
                        </div>
                    </div>

                    {/* Carte 2 : Bleu Nuit (Secondaire) */}
                    <div className="bg-[#0F172A] p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 opacity-10"><svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3z"/></svg></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-white/10"><span className="text-xl">👥</span></div>
                                <h3 className="text-sm font-semibold">Donateurs Actifs</h3>
                            </div>
                            <p className="text-3xl font-extrabold">{stats.donateurs_actifs}</p>
                        </div>
                    </div>

                    {/* Carte 3 : Blanc avec texte Bleu Nuit */}
                    <div className="bg-white p-6 rounded-2xl text-[#0F172A] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#0F172A]/5 rounded-lg"><span className="text-xl">🎯</span></div>
                            <h3 className="text-sm font-semibold text-gray-500">Campagnes Actives</h3>
                        </div>
                        <p className="text-3xl font-extrabold">{stats.campagnes_actives}</p>
                    </div>

                    {/* Carte 4 : Blanc avec texte Vert */}
                    <div className="bg-white p-6 rounded-2xl text-[#0F172A] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#1A8C4B]/10 rounded-lg"><span className="text-xl">📊</span></div>
                            <h3 className="text-sm font-semibold text-gray-500">Taux de Complétion</h3>
                        </div>
                        <p className="text-3xl font-extrabold text-[#1A8C4B]">{stats.taux_completion}%</p>
                    </div>
                </div>

                {/* --- GRAPHIQUES --- */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Area Chart */}
                    <div className="p-6 bg-white border border-gray-100 shadow-sm lg:col-span-2 rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-[#0F172A]">Évolution des Dons</h3>
                                <p className="text-sm text-gray-500">Statistiques des 6 derniers mois</p>
                            </div>
                        </div>
                        <div className="w-full h-72">
                            {chartDons.data.length > 0 ? (
                                <Line data={lineChartData} options={lineChartOptions} />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">Aucune donnée de don disponible.</div>
                            )}
                        </div>
                    </div>

                    {/* Doughnut Chart */}
                    <div className="flex flex-col p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                        <h3 className="text-lg font-bold text-[#0F172A] mb-1">Moyens de paiement</h3>
                        <p className="mb-6 text-sm text-gray-500">Répartition globale</p>

                        <div className="relative flex-1 flex justify-center items-center min-h-[200px]">
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-extrabold text-[#0F172A]">100%</span>
                            </div>
                            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, cutout: '75%', plugins: { legend: { display: false } } }} />
                        </div>

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#1A8C4B]"></span><span className="font-medium">Mobile Money</span></div>
                                <span className="font-bold">55%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#0F172A]"></span><span className="font-medium">Orange Money</span></div>
                                <span className="font-bold">35%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#94A3B8]"></span><span className="font-medium">Cartes Bancaires</span></div>
                                <span className="font-bold">10%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- TABLEAU DES TRANSACTIONS REELLES --- */}
                <div className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-[#0F172A]">Derniers Dons Enregistrés</h3>
                        <Link href="/admin/dons" className="text-[#1A8C4B] hover:text-[#15713c] text-sm font-semibold">Voir tout &rarr;</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#0F172A]/5">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Réf & Donateur</th>
                                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Campagne soutenue</th>
                                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Montant</th>
                                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentTransactions && recentTransactions.length > 0 ? (
                                    recentTransactions.map((trx) => (
                                        <tr key={trx.id} className="transition hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-[#0F172A]">{trx.name}</span>
                                                    <span className="font-mono text-xs text-gray-400">{trx.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-600">{trx.campaign}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold text-[#1A8C4B]">{trx.amount}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1.5 inline-flex text-xs font-bold rounded-lg ${getStatusStyle(trx.statut)}`}>
                                                    {trx.statut === 'complete' ? 'Complété' : (trx.statut === 'pending' ? 'En attente' : 'Échoué')}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                            Aucune transaction enregistrée pour le moment.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
