import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Edit({ auth, campagne, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put', // Requis par Laravel pour les formulaires contenant des fichiers
        titre: campagne.titre || '',
        description_courte: campagne.description_courte || '',
        contenu: campagne.contenu || '',
        objectif: campagne.objectif || '',
        categorie_id: campagne.categorie_id || '',
        statut: campagne.statut || 'pending',
        is_featured: campagne.is_featured === 1 || campagne.is_featured === true,
        new_images: [],
    });

    const [previewUrls, setPreviewUrls] = useState([]);

    // Générer les URLs de prévisualisation
    useEffect(() => {
        if (!data.new_images || data.new_images.length === 0) {
            setPreviewUrls([]);
            return;
        }
        const urls = data.new_images.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
        return () => urls.forEach(url => URL.revokeObjectURL(url));
    }, [data.new_images]);

    // Gérer l'ajout cumulatif d'images (pour en sélectionner plusieurs en plusieurs clics)
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setData('new_images', [...data.new_images, ...selectedFiles]);
    };

    // Retirer une image fraîchement sélectionnée avant de sauvegarder
    const removeNewImage = (indexToRemove) => {
        const updatedImages = data.new_images.filter((_, index) => index !== indexToRemove);
        setData('new_images', updatedImages);
    };

    const submit = (e) => {
        e.preventDefault();

        // On indique qu'on commence le traitement
        toast.info("Mise à jour en cours...", { autoClose: 1500 });

        post(route('admin.campagnes.update', campagne.id), {
            forceFormData: true, // Force le multipart/form-data
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Campagne mise à jour avec succès !');
                setData('new_images', []); // On vide la sélection
            },
            onError: (backendErrors) => {
                toast.error('Échec de la mise à jour !');
                console.error("Erreurs du Backend :", backendErrors);

                // On boucle sur TOUTES les erreurs reçues et on affiche un toast pour chacune
                Object.keys(backendErrors).forEach((key) => {
                    toast.error(`Erreur (${key}): ${backendErrors[key]}`, { autoClose: 6000 });
                });
            }
        });
    };

    const handleDeleteImage = (id) => {
        if(confirm("Supprimer définitivement cette image ?")) {
            router.delete(route('admin.campagnes.images.destroy', id), {
                preserveScroll: true,
                onSuccess: () => toast.success('Image supprimée de la galerie.'),
                onError: () => toast.error('Erreur lors de la suppression.'),
            });
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Éditer - ${campagne.titre}`} />
            <ToastContainer position="top-right" />

            <div className="max-w-5xl mx-auto font-sans">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-extrabold text-[#0F172A] truncate max-w-xl">Éditer: {campagne.titre}</h2>
                    </div>
                    <Link href="/admin/campagnes" className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#0F172A] hover:bg-gray-50 transition shadow-sm">
                        &larr; Retour
                    </Link>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    <div className="space-y-6 lg:col-span-2">

                        {/* Bloc Galerie Photos */}
                        <div className="p-8 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
                            <h3 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center justify-between">
                                Gestion des images
                                <span className="text-xs font-semibold text-white bg-[#1A8C4B] px-2.5 py-1 rounded-full">
                                    {campagne.images?.length || 0} existante(s)
                                </span>
                            </h3>

                            <div className="flex gap-4 pb-4 overflow-x-auto custom-scrollbar">
                                {/* 1. Images Existantes */}
                                {campagne.images?.map((img) => (
                                    <div key={img.id} className="relative shrink-0 group">
                                        <img src={`/storage/${img.chemin}`} alt="Existant" className="object-cover w-48 h-32 border border-gray-200 shadow-sm rounded-xl" />
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteImage(img.id)}
                                            className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition shadow-sm"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                ))}

                                {/* 2. Prévisualisations (Nouvelles) avec bouton annuler */}
                                {previewUrls.map((url, idx) => (
                                    <div key={`new-${idx}`} className="relative shrink-0 group">
                                        <img src={url} alt="Nouveau" className="w-48 h-32 object-cover rounded-xl border-2 border-dashed border-[#1A8C4B] shadow-sm opacity-80" />
                                        <span className="absolute top-2 left-2 bg-[#1A8C4B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">À sauvegarder</span>

                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(idx)}
                                            className="absolute top-2 right-2 bg-gray-900/70 hover:bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition shadow-sm"
                                            title="Retirer cette image"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                ))}

                                {(!campagne.images || campagne.images.length === 0) && previewUrls.length === 0 && (
                                    <div className="flex items-center justify-center w-48 h-32 border border-gray-300 border-dashed bg-gray-50 rounded-xl">
                                        <span className="text-xs font-medium text-gray-400">Aucune image</span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 mt-4 border-t border-gray-100">
                                <label className="block text-sm font-bold text-[#0F172A] mb-2">Ajouter de nouvelles images</label>
                                <input
                                    type="file" multiple accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-[#0F172A] hover:file:bg-gray-200 transition border border-dashed border-gray-300 rounded-xl p-3 bg-gray-50 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Bloc Infos */}
                        <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
                            <h3 className="text-lg font-bold text-[#0F172A] mb-6 border-b border-gray-100 pb-4">Informations</h3>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Titre</label>
                                    <input type="text" value={data.titre} onChange={e => setData('titre', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-[#1A8C4B] transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Description courte</label>
                                    <textarea value={data.description_courte} onChange={e => setData('description_courte', e.target.value)} rows="2" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-[#1A8C4B] transition"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Contenu détaillé</label>
                                    <textarea value={data.contenu} onChange={e => setData('contenu', e.target.value)} rows="6" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-[#1A8C4B] transition"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                            <h3 className="text-lg font-bold text-[#0F172A] mb-6 border-b border-gray-100 pb-4">Paramètres</h3>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Objectif (FCFA)</label>
                                    <input type="number" value={data.objectif} onChange={e => setData('objectif', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-[#1A8C4B] transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Catégorie</label>
                                    <select value={data.categorie_id} onChange={e => setData('categorie_id', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-[#1A8C4B] transition">
                                        <option value="">Sélectionner</option>
                                        {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.nom}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Statut</label>
                                    <select value={data.statut} onChange={e => setData('statut', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-[#1A8C4B] transition">
                                        <option value="pending">En attente</option>
                                        <option value="active">Active</option>
                                        <option value="completed">Terminée</option>
                                    </select>
                                </div>
                                <div className="pt-2">
                                    <label className="flex items-center cursor-pointer group">
                                        <input type="checkbox" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} className="rounded border-gray-300 text-[#1A8C4B] focus:ring-[#1A8C4B] w-5 h-5" />
                                        <span className="ml-3 text-sm font-semibold text-[#0F172A]">Mettre à la une</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button disabled={processing} type="submit" className="w-full py-3.5 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-[#0F172A] hover:bg-[#1e293b] transition disabled:opacity-50">
                            {processing ? 'Enregistrement...' : 'Mettre à jour la campagne'}
                        </button>
                    </div>
                </form>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
            `}} />
        </AdminLayout>
    );
}
