import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify'; // Importe ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importe le style CSS

// Sous-composant pour gérer la carte et son carrousel d'images
const CampaignCard = ({ campagne, formatMoney, handleDelete }) => {
    const [currentImage, setCurrentImage] = useState(0);

    // 💡 IMPORTANT : Vérifie si des images sont présentes grâce au ->with('images') du contrôleur
    const images = campagne.images && campagne.images.length > 0
        ? campagne.images
        : [{ id: 'default', chemin: 'images/default-campaign.jpg', isDefault: true }]; // Image par défaut si vide

    const nextImage = (e) => {
        e.preventDefault();
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = (e) => {
        e.preventDefault();
        setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // Calcul de progression (simulé ici à 0 pour le design)
    const progression = campagne.collecte ? Math.round((campagne.collecte / campagne.objectif) * 100) : 0;

    return (
        <div className="flex flex-col overflow-hidden font-sans transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-lg group">

            {/* 🖼️ Gros cadran : Carrousel d'images */}
            <div className="relative w-full h-56 overflow-hidden bg-gray-100">
                {images.map((img, index) => (
                    <img
                        key={img.id}
                        // 💡 IMPORTANT : Utilise '/storage/' pour les images uploadées et '/' pour l'image par défaut dans public
                        src={img.isDefault ? `/${img.chemin}` : `/storage/${img.chemin}`}
                        alt={campagne.titre}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}

                {/* Contrôles du carrousel (visibles au survol s'il y a plus d'une image) */}
                {images.length > 1 && (
                    <>
                        <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#0F172A] p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition backdrop-blur-sm shadow-sm z-10">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#0F172A] p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition backdrop-blur-sm shadow-sm z-10">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>

                        {/* Indicateurs (points) */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {images.map((_, idx) => (
                                <span key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentImage ? 'bg-white scale-125' : 'bg-white/50'}`}></span>
                            ))}
                        </div>
                    </>
                )}

                {/* Badges superposés */}
                <div className="absolute z-10 flex gap-2 top-3 left-3">
                    <span className={`px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-lg backdrop-blur-md shadow-sm ${campagne.statut === 'active' ? 'bg-[#1A8C4B]/90 text-white' : 'bg-[#0F172A]/80 text-white'}`}>
                        {campagne.statut === 'active' ? 'Active' : 'En attente'}
                    </span>
                    {campagne.is_featured && (
                        <span className="bg-amber-500/90 text-white px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-lg backdrop-blur-md shadow-sm">À la une</span>
                    )}
                </div>
            </div>

            {/* 📝 Corps de la carte */}
            <div className="flex flex-col flex-1 p-6">
                <h3 className="text-lg font-bold text-[#0F172A] mb-2 line-clamp-1">{campagne.titre}</h3>
                <p className="flex-1 mb-6 text-sm text-gray-500 line-clamp-2">
                    {campagne.description_courte}
                </p>

                {/* Barre de progression style maquette */}
                <div className="pt-4 mb-6 border-t border-gray-100">
                    <div className="flex justify-between text-xs font-semibold text-[#0F172A] mb-2">
                        <span>Progression</span>
                        <span>{progression} %</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div className="bg-[#1A8C4B] h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min(progression, 100)}%` }}></div>
                    </div>
                    <div className="flex justify-between mt-2 overflow-hidden text-xs font-medium text-gray-500 whitespace-nowrap">
                        <span className="font-bold text-[#0F172A] truncate">{formatMoney(campagne.collecte || 0)}</span>
                        <span className="ml-1 truncate">Obj : {formatMoney(campagne.objectif)}</span>
                    </div>
                </div>

                {/* Actions Administrateur */}
                <div className="flex items-center gap-3 pt-4 mt-auto border-t border-gray-100">
                    {/* Bouton Éditer (Lie vers Edit.jsx) */}
                    <Link
                        href={route('admin.campagnes.edit', campagne.id)}
                        className="flex-1 bg-[#0F172A] hover:bg-[#1e293b] text-white text-center py-2.5 rounded-xl text-sm font-bold transition shadow-sm"
                    >
                        Éditer
                    </Link>
                    {/* Bouton Supprimer */}
                    <button
                        onClick={() => handleDelete(campagne.id)}
                        className="p-2.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition shadow-inner border border-red-100"
                        title="Supprimer définitivement"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Index({ auth, campagnes }) {

    const handleDelete = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette campagne ? Toutes les données et images liées seront perdues.')) {
            router.delete(route('admin.campagnes.destroy', id), {
                onSuccess: () => toast.success('Campagne supprimée avec succès.'),
                onError: () => toast.error('Une erreur est survenue lors de la suppression.'),
            });
        }
    };

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Gestion des Causes Caritatives" />

            <div className="max-w-[1600px] mx-auto font-sans">

                {/* En-tête de page */}
                <div className="flex flex-col justify-between gap-4 pb-6 mb-8 border-b border-gray-100 md:flex-row md:items-center">
                    <div>
                        <h2 className="text-2xl font-extrabold text-[#0F172A]">Causes Caritatives</h2>
                        <p className="mt-1 text-sm font-medium text-gray-500">Gérez vos campagnes sous forme de cartes interactives.</p>
                    </div>

                    {/* Bouton Créer (Lie vers Create.jsx) */}
                    <Link
                        href={route('admin.campagnes.create')}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1A8C4B] text-white rounded-xl text-sm font-bold hover:bg-[#15713c] transition shadow-md shadow-[#1A8C4B]/20"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        Créer une campagne
                    </Link>
                </div>

                {/* Grille de Cartes */}
                {campagnes.data && campagnes.data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {campagnes.data.map((campagne) => (
                            <CampaignCard
                                key={campagne.id}
                                campagne={campagne}
                                formatMoney={formatMoney}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="p-16 text-center bg-white border border-gray-300 border-dashed shadow-inner rounded-3xl">
                        <span className="text-5xl opacity-80">🏜️</span>
                        <h3 className="text-lg font-bold text-[#0F172A] mt-6">Aucune cause enregistrée</h3>
                        <p className="max-w-sm mx-auto mt-1 text-sm text-gray-500">Votre tableau de bord est vide. Commencez par créer votre première campagne humanitaire ou sociale.</p>
                        <Link href={route('admin.campagnes.create')} className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#1A8C4B] text-white rounded-xl font-bold text-sm">
                           + Créer ma première campagne
                        </Link>
                    </div>
                )}

                {/* Pagination Professionnelle */}
                {campagnes.links && campagnes.data.length > 0 && (
                    <div className="flex items-center justify-between p-4 mt-12 bg-white border border-gray-100 shadow-sm rounded-2xl">
                        <span className="text-sm font-medium text-gray-500">Affichage de {campagnes.from} à {campagnes.to} sur {campagnes.total} causes</span>
                        <div className="flex gap-1.5">
                            {campagnes.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition ${
                                        link.active
                                        ? 'bg-[#1A8C4B] text-white border-[#1A8C4B] shadow-md'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                    } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Conteneur Toastify requis pour voir les notifications */}
            <ToastContainer position="top-right" autoClose={4000} />

            {/* Petit style CSS pour la scrollbar horizontale personnalisée */}
            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { height: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
            `}} />
        </AdminLayout>
    );
}
