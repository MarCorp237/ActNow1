import React, { useState } from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { Head, useForm } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Don({ auth, campagne }) {
    const formatMoney = (amount) => new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    const progress = campagne.collecte ? Math.round((campagne.collecte / campagne.objectif) * 100) : 0;
    const images = campagne.images && campagne.images.length > 0 ? campagne.images : [{ id: 'default', chemin: 'images/default-campaign.jpg' }];

    // --- FORMULAIRE DE DON ---
    const { data: donData, setData: setDonData, post: postDon, processing: processingDon, errors: errorsDon, reset: resetDon } = useForm({
        montant: '',
        mode_paiement: 'mtn_momo',
    });

    const submitDon = (e) => {
        e.preventDefault();
        postDon(route('causes.donner', campagne.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Merci pour votre générosité ! Votre don est en cours de traitement.');
                resetDon();
            },
            onError: () => toast.error('Erreur lors du don. Vérifiez le montant.'),
        });
    };

    const presetAmounts = [1000, 5000, 10000, 20000];

    // --- FORMULAIRE DE COMMENTAIRE ---
    const { data: commentData, setData: setCommentData, post: postComment, processing: processingComment, reset: resetComment } = useForm({
        contenu: '',
    });

    const submitComment = (e) => {
        e.preventDefault();
        postComment(route('causes.commenter', campagne.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Votre commentaire a été publié !');
                resetComment();
            },
        });
    };

    return (
        <UserLayout user={auth.user}>
            <Head title={campagne.titre} />
            <ToastContainer position="top-right" autoClose={4000} />

            <div className="max-w-[1200px] mx-auto font-sans">

                {/* En-tête de la cause */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">{campagne.titre}</h1>
                    <p className="text-lg font-medium text-gray-500">{campagne.description_courte}</p>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

                    {/* --- COLONNE GAUCHE (Détails & Commentaires) --- */}
                    <div className="space-y-8 lg:col-span-2">

                        {/* Galerie d'images */}
                        <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
                            <div className="w-full h-80 md:h-[400px] relative">
                                <img src={`/storage/${images[0].chemin}`} alt={campagne.titre} className="object-cover w-full h-full" />
                            </div>
                            {images.length > 1 && (
                                <div className="flex gap-2 p-4 overflow-x-auto border-t border-gray-100 custom-scrollbar bg-gray-50">
                                    {images.map(img => (
                                        <img key={img.id} src={`/storage/${img.chemin}`} className="object-cover w-24 h-16 border border-gray-200 rounded-lg" alt="Galerie" />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Description complète */}
                        <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
                            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">À propos de ce projet</h2>
                            <div className="leading-relaxed text-gray-600 whitespace-pre-wrap">
                                {campagne.description}
                            </div>
                        </div>

                        {/* Section Commentaires */}
                        <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
                            <h2 className="text-2xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-[#1A8C4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                Mots de soutien ({campagne.comments?.length || 0})
                            </h2>

                            {/* Formulaire Commentaire */}
                            <form onSubmit={submitComment} className="mb-8">
                                <textarea
                                    value={commentData.contenu}
                                    onChange={e => setCommentData('contenu', e.target.value)}
                                    placeholder="Laissez un mot d'encouragement..."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] transition resize-none h-24"
                                    required
                                ></textarea>
                                <div className="flex justify-end mt-3">
                                    <button disabled={processingComment} type="submit" className="px-6 py-2 bg-[#0F172A] hover:bg-[#1e293b] text-white text-sm font-bold rounded-xl transition disabled:opacity-50">
                                        Publier
                                    </button>
                                </div>
                            </form>

                            {/* Liste des commentaires */}
                            <div className="space-y-6">
                                {campagne.comments && campagne.comments.length > 0 ? (
                                    campagne.comments.map(comment => (
                                        <div key={comment.id} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#1A8C4B]/10 text-[#1A8C4B] flex items-center justify-center font-bold shrink-0">
                                                {comment.user?.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 p-4 border border-gray-100 bg-gray-50 rounded-2xl">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-bold text-[#0F172A] text-sm">{comment.user?.name}</h4>
                                                    <span className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-sm text-gray-600">{comment.contenu}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm italic text-center text-gray-500">Soyez le premier à laisser un message de soutien !</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- COLONNE DROITE (Encart de Don Fixe) --- */}
                    <div className="lg:col-span-1">
                        <div className="sticky p-6 bg-white border border-gray-100 shadow-xl top-28 rounded-3xl">

                            {/* Jauge */}
                            <div className="mb-6">
                                <div className="flex items-end justify-between mb-2">
                                    <div>
                                        <span className="text-3xl font-extrabold text-[#1A8C4B]">{formatMoney(campagne.collecte || 0)}</span>
                                        <p className="mt-1 text-sm font-medium text-gray-500">collectés sur {formatMoney(campagne.objectif)}</p>
                                    </div>
                                    <span className="text-[#0F172A] font-bold text-lg">{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div className="bg-[#1A8C4B] h-2.5 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                                </div>
                            </div>

                            <hr className="my-6 border-gray-100" />

                            <h3 className="text-xl font-bold text-[#0F172A] mb-4">Faire un don</h3>

                            <form onSubmit={submitDon} className="space-y-6">
                                {/* Boutons de montants rapides */}
                                <div className="grid grid-cols-2 gap-3">
                                    {presetAmounts.map(amount => (
                                        <button
                                            key={amount} type="button"
                                            onClick={() => setDonData('montant', amount)}
                                            className={`py-2 rounded-xl text-sm font-bold border transition ${donData.montant == amount ? 'bg-[#1A8C4B] text-white border-[#1A8C4B]' : 'bg-white text-[#0F172A] border-gray-200 hover:border-[#1A8C4B]'}`}
                                        >
                                            {amount} FCFA
                                        </button>
                                    ))}
                                </div>

                                {/* Montant libre */}
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="Montant libre"
                                        value={donData.montant}
                                        onChange={e => setDonData('montant', e.target.value)}
                                        className="w-full pl-4 pr-16 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[#0F172A] focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] transition text-lg"
                                        required min="500"
                                    />
                                    <span className="absolute inset-y-0 flex items-center font-bold text-gray-400 right-4">FCFA</span>
                                </div>
                                {errorsDon.montant && <p className="mt-1 text-xs text-red-500">{errorsDon.montant}</p>}

                                {/* Moyen de paiement */}
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Moyen de paiement</label>
                                    <select
                                        value={donData.mode_paiement}
                                        onChange={e => setDonData('mode_paiement', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] transition"
                                    >
                                        <option value="mtn_momo">MTN Mobile Money</option>
                                        <option value="orange_money">Orange Money</option>
                                    </select>
                                </div>

                                <button disabled={processingDon} type="submit" className="w-full py-4 bg-[#1A8C4B] hover:bg-[#15713c] text-white font-extrabold rounded-xl transition shadow-lg shadow-[#1A8C4B]/30 flex justify-center items-center gap-2 text-lg disabled:opacity-50">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    Soutenir maintenant
                                </button>
                                <p className="flex items-center justify-center gap-1 text-xs font-medium text-center text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    Paiement 100% sécurisé
                                </p>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { height: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
            `}} />
        </UserLayout>
    );
}
