import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function Create({ auth, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        titre: '',
        description_courte: '',
        contenu: '',
        objectif: '',
        categorie_id: '',
        statut: 'pending',
        is_featured: false,
        images: [], // Tableau propre pour les fichiers
    });

    const [previewUrls, setPreviewUrls] = useState([]);

    // Génération des prévisualisations en direct
    useEffect(() => {
        if (!data.images || data.images.length === 0) {
            setPreviewUrls([]);
            return;
        }
        const urls = data.images.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
        return () => urls.forEach(url => URL.revokeObjectURL(url));
    }, [data.images]);

    const submit = (e) => {
        e.preventDefault();

        // On utilise forceFormData pour garantir l'envoi des fichiers au backend
        post(route('admin.campagnes.store'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Campagne créée avec succès !');
            },
            onError: () => {
                toast.error('Erreur : Veuillez vérifier les champs en rouge.');
            }
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Créer une Campagne" />

            <div className="max-w-5xl mx-auto font-sans">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-extrabold text-[#0F172A]">Nouvelle Campagne</h2>
                    </div>
                    <Link href="/admin/campagnes" className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#0F172A] hover:bg-gray-50 transition shadow-sm">
                        &larr; Retour
                    </Link>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    <div className="space-y-6 lg:col-span-2">
                        {/* Bloc Galerie Photos */}
                        <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
                            <h3 className="text-lg font-bold text-[#0F172A] mb-6 border-b border-gray-100 pb-4">Galerie Photos</h3>

                            {previewUrls.length > 0 && (
                                <div className="flex gap-4 pb-4 mb-4 overflow-x-auto custom-scrollbar">
                                    {previewUrls.map((url, idx) => (
                                        <div key={idx} className="relative shrink-0">
                                            <img src={url} alt={`Preview ${idx}`} className="object-cover w-40 border border-gray-200 shadow-sm h-28 rounded-xl" />
                                            <span className="absolute top-2 right-2 bg-[#1A8C4B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Nouveau</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] mb-2">Ajouter des images</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    // CRUCIAL : Convertir FileList en Array pour Inertia
                                    onChange={e => setData('images', Array.from(e.target.files))}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#1A8C4B]/10 file:text-[#1A8C4B] hover:file:bg-[#1A8C4B]/20 transition cursor-pointer border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50"
                                />
                                {errors.images && <p className="text-red-500 text-xs mt-1.5">{errors.images}</p>}
                                {/* Affichage des erreurs liées à chaque image individuelle */}
                                {Object.keys(errors).map(key => key.startsWith('images.') ? <p key={key} className="mt-1 text-xs text-red-500">{errors[key]}</p> : null)}
                            </div>
                        </div>

                        {/* Bloc Informations Générales */}
                        <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
                            <h3 className="text-lg font-bold text-[#0F172A] mb-6 border-b border-gray-100 pb-4">Informations Générales</h3>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Titre de la campagne</label>
                                    <input type="text" value={data.titre} onChange={e => setData('titre', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] focus:border-transparent transition" />
                                    {errors.titre && <p className="text-red-500 text-xs mt-1.5">{errors.titre}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Description courte</label>
                                    <textarea value={data.description_courte} onChange={e => setData('description_courte', e.target.value)} rows="2" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] focus:border-transparent transition"></textarea>
                                    {errors.description_courte && <p className="text-red-500 text-xs mt-1.5">{errors.description_courte}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Contenu détaillé</label>
                                    <textarea value={data.contenu} onChange={e => setData('contenu', e.target.value)} rows="6" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] focus:border-transparent transition"></textarea>
                                    {errors.contenu && <p className="text-red-500 text-xs mt-1.5">{errors.contenu}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Bloc Paramètres */}
                        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                            <h3 className="text-lg font-bold text-[#0F172A] mb-6 border-b border-gray-100 pb-4">Paramètres</h3>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Objectif (FCFA)</label>
                                    <div className="relative">
                                        <input type="number" value={data.objectif} onChange={e => setData('objectif', e.target.value)} className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] focus:border-transparent transition" />
                                        <span className="absolute inset-y-0 flex items-center text-sm font-bold text-gray-400 right-4">FCFA</span>
                                    </div>
                                    {errors.objectif && <p className="text-red-500 text-xs mt-1.5">{errors.objectif}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Catégorie</label>
                                    <select value={data.categorie_id} onChange={e => setData('categorie_id', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] focus:border-transparent transition">
                                        <option value="">Sélectionner</option>
                                        {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.nom}</option>)}
                                    </select>
                                    {errors.categorie_id && <p className="text-red-500 text-xs mt-1.5">{errors.categorie_id}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Statut</label>
                                    <select value={data.statut} onChange={e => setData('statut', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] focus:border-transparent transition">
                                        <option value="pending">En attente</option>
                                        <option value="active">Active</option>
                                    </select>
                                    {errors.statut && <p className="text-red-500 text-xs mt-1.5">{errors.statut}</p>}
                                </div>
                                <div className="pt-2">
                                    <label className="flex items-center cursor-pointer group">
                                        <input type="checkbox" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} className="rounded border-gray-300 text-[#1A8C4B] focus:ring-[#1A8C4B] w-5 h-5" />
                                        <span className="ml-3 text-sm font-semibold text-[#0F172A]">Mettre à la une</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button disabled={processing} type="submit" className="w-full py-3.5 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-[#1A8C4B] hover:bg-[#15713c] transition disabled:opacity-50">
                            Enregistrer la campagne
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
