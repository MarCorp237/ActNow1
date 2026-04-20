import React from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, campagnes }) {
    const formatMoney = (amount) => new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';

    return (
        <UserLayout user={auth.user}>
            <Head title="Explorer les Causes" />

            <div className="max-w-[1400px] mx-auto font-sans">

                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-3xl font-extrabold text-[#0F172A] mb-3">Causes à soutenir</h2>
                    <p className="max-w-2xl font-medium text-gray-500">Découvrez les projets humanitaires et sociaux qui ont besoin de votre générosité aujourd'hui. Chaque contribution compte.</p>
                </div>

                {campagnes.data && campagnes.data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {campagnes.data.map((campagne) => {
                            const progress = campagne.collecte ? Math.round((campagne.collecte / campagne.objectif) * 100) : 0;
                            const imageCover = campagne.images && campagne.images.length > 0 ? `/storage/${campagne.images[0].chemin}` : '/images/default-campaign.jpg';

                            return (
                                <Link href={route('causes.show', campagne.id)} key={campagne.id} className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-xl group">
                                    <div className="relative w-full h-48 overflow-hidden">
                                        <img src={imageCover} alt={campagne.titre} className="object-cover w-full h-full transition duration-500 group-hover:scale-105" />
                                        {campagne.is_featured && (
                                            <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                                                Urgence
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-1 p-6">
                                        <h3 className="text-lg font-bold text-[#0F172A] mb-2 line-clamp-2 group-hover:text-[#1A8C4B] transition">{campagne.titre}</h3>
                                        <p className="flex-1 mb-6 text-sm text-gray-500 line-clamp-2">{campagne.description_courte}</p>

                                        <div className="mt-auto">
                                            <div className="flex justify-between text-xs font-bold text-[#0F172A] mb-2">
                                                <span>{progress}% financé</span>
                                                <span className="text-[#1A8C4B]">{formatMoney(campagne.objectif)}</span>
                                            </div>
                                            <div className="w-full h-2 mb-4 bg-gray-100 rounded-full">
                                                <div className="bg-[#1A8C4B] h-2 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                                            </div>
                                            <button className="w-full py-3 bg-[#0F172A] group-hover:bg-[#1A8C4B] text-white text-sm font-bold rounded-xl transition">
                                                Faire un don
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                ) : (
                    <div className="py-20 text-center bg-white border border-gray-100 shadow-sm rounded-3xl">
                        <span className="text-5xl">🌍</span>
                        <h3 className="text-xl font-bold text-[#0F172A] mt-4">Aucune cause active</h3>
                        <p className="mt-2 text-gray-500">Revenez un peu plus tard pour découvrir de nouveaux projets.</p>
                    </div>
                )}

                {/* Pagination */}
                {campagnes.links && campagnes.data.length > 0 && (
                    <div className="flex justify-center gap-2 mt-12">
                        {campagnes.links.map((link, idx) => (
                            <Link key={idx} href={link.url || '#'} className={`px-4 py-2 text-sm font-bold rounded-xl border transition ${link.active ? 'bg-[#1A8C4B] text-white border-[#1A8C4B]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'} ${!link.url && 'opacity-50 cursor-not-allowed'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
