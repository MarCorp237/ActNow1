import React from 'react';
import { Head, Link } from '@inertiajs/react';

// Importation des drapeaux (Assure-toi d'avoir ces images dans resources/images/flags/ ou adapte le chemin)
// Si tu n'as pas les images, tu peux utiliser des émojis : 🇨🇲, 🇸🇳, 🇨🇮, 🇧🇫
const FlagCameroun = () => <span className="mr-2 text-2xl">🇨🇲</span>;
const FlagSenegal = () => <span className="mr-2 text-2xl">🇸🇳</span>;
const FlagCoteIvoire = () => <span className="mr-2 text-2xl">🇨🇮</span>;
const FlagBurkina = () => <span className="mr-2 text-2xl">🇧🇫</span>;

export default function Welcome({ auth, campagnes_featured }) {

    // Fonction pour formater les montants en FCFA
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

    // Fonction pour calculer le pourcentage de progression
    const getPercentage = (collecte, objectif) => {
        if (objectif <= 0) return 0;
        return Math.min(100, Math.round((collecte / objectif) * 100));
    };

    // Mappage des drapeaux selon le titre de la campagne (basé sur tes seeders)
    const getFlag = (titre) => {
        if (titre.includes('Cameroun')) return <FlagCameroun />;
        if (titre.includes('Sénégal')) return <FlagSenegal />;
        if (titre.includes("Côte d'Ivoire")) return <FlagCoteIvoire />;
        if (titre.includes('Burkina Faso')) return <FlagBurkina />;
        return '🌍 '; // Drapeau par défaut
    };

    return (
        <>
            <Head title="Donnez avec le cœur - Plateforme de Dons Caritatifs" />

            <div className="min-h-screen font-sans text-gray-900 bg-white">

                {/* --- HEADER --- */}
                <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
                    <nav className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
                        {/* Logo & Texte */}
                        {/* Logo & Texte */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-2xl">
                                {/* On remplace l'émoji par ton image */}
                                <img
                                    src="/images/logo.png"
                                    alt="Logo Fonds"
                                    className="object-contain w-full h-full p-1"
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-emerald-600">ActNow</h1>
                                <p className="text-xs text-gray-400">Donner avec le cœur</p>
                            </div>
                        </div>

                        {/* Liens Centraux */}
                        <div className="items-center hidden gap-8 text-gray-600 md:flex">
                            <a href="#" className="transition hover:text-emerald-600">Causes</a>
                            <a href="#" className="transition hover:text-emerald-600">Rapport</a>
                        </div>

                        {/* Boutons Action (Dynamique selon auth) */}
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="px-5 py-2.5 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition shadow-sm text-sm">
                                    Mon Tableau de Bord
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-sm font-medium text-gray-600 hover:text-emerald-600">
                                        Connexion
                                    </Link>
                                    <Link href={route('register')} className="px-5 py-2.5 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition shadow-sm text-sm">
                                        S'inscrire gratuitement
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* --- HERO SECTION --- */}
                <section className="relative overflow-hidden text-white bg-emerald-700">
                    {/* Image de fond avec opacité (mains qui protègent) */}
                    <div className="absolute inset-0 bg-center bg-cover opacity-10" style={{ backgroundImage: "url('/storage/images/hero-bg.jpg')" }}></div>

                    <div className="relative z-10 max-w-5xl px-6 py-24 mx-auto text-center md:py-32">
                        {/* Petit logo central */}
                       {/* Petit logo central */}
                            <div className="flex items-center justify-center w-24 h-24 p-2 mx-auto mb-8 overflow-hidden bg-white border rounded-full shadow-xl border-white/20">
                                <img
                                    src="/images/logo.png"
                                    alt="Logo Principal"
                                    className="object-contain w-full h-full"
                                />
                            </div>

                        <h2 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl">
                            Donnez avec le cœur
                        </h2>
                        <p className="max-w-2xl mx-auto mb-12 text-xl text-emerald-100">
                            Faites un don en un clin d'œil avec notre plateforme sécurisée et transparente.
                        </p>
                        <button className="px-10 py-4 text-lg font-bold transition transform bg-white rounded-full shadow-xl text-emerald-700 hover:bg-gray-50 hover:scale-105">
                            Commencer un don
                        </button>
                    </div>

                    {/* Vague décorative inférieure (optionnelle, selon style précis) */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'}}></div>
                </section>

                {/* --- SECTION "POURQUOI NOUS CHOISIR" --- */}
                <section className="py-20 bg-white">
                    <div className="px-6 mx-auto text-center max-w-7xl">
                        <h3 className="mb-4 text-4xl font-extrabold text-gray-900">Pourquoi nous choisir ?</h3>
                        <p className="max-w-xl mx-auto mb-16 text-lg text-gray-500">Une plateforme transparente et sécurisée pour vos dons.</p>

                        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                            {/* Carte 1 */}
                            <div className="p-8 text-left transition bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-lg group">
                                <div className="flex items-center justify-center mb-6 transition w-14 h-14 bg-emerald-50 rounded-2xl group-hover:bg-emerald-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-8 h-8 transition stroke-emerald-600 group-hover:stroke-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                    </svg>
                                </div>
                                <h4 className="mb-3 text-xl font-bold">Transparence totale</h4>
                                <p className="text-sm leading-relaxed text-gray-500">Suivez l'évolution de chaque cause et l'utilisation des fonds en temps réel.</p>
                            </div>

                            {/* Carte 2 */}
                            <div className="p-8 text-left transition bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-lg group">
                                <div className="flex items-center justify-center mb-6 transition w-14 h-14 bg-emerald-50 rounded-2xl group-hover:bg-emerald-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-8 h-8 transition stroke-emerald-600 group-hover:stroke-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.466.916 3.633.73 4.22-.412m0 0a1.313 1.313 0 00-1.282-1.928.932.932 0 01-.693-.693.75.75 0 01.32-.821l.88-.658m-6 2.062a1.313 1.313 0 011.282-1.928m0 0a.75.75 0 01.757.218 1.144 1.144 0 01.114.611 1.052 1.052 0 01-.444.694l-.887.651M18 9a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="mb-3 text-xl font-bold">Paiements sécurisés</h4>
                                <p className="text-sm leading-relaxed text-gray-500">Faites vos dons en toute sécurité via Orange Money et MTN Mobile Money.</p>
                            </div>

                            {/* Carte 3 */}
                            <div className="p-8 text-left transition bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-lg group">
                                <div className="flex items-center justify-center mb-6 transition w-14 h-14 bg-emerald-50 rounded-2xl group-hover:bg-emerald-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-8 h-8 transition stroke-emerald-600 group-hover:stroke-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                    </svg>
                                </div>
                                <h4 className="mb-3 text-xl font-bold">Communauté engagée</h4>
                                <p className="text-sm leading-relaxed text-gray-500">Rejoignez des milliers de donateurs qui font bouger les choses au Cameroun.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECTION DYNAMIQUE : COLLECTE DE FONDS URGENTE --- */}
                <section className="py-20 bg-emerald-50">
                    <div className="px-6 mx-auto text-center max-w-7xl">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="text-3xl">⚡</span>
                            <h3 className="text-4xl font-extrabold text-emerald-900">Collecte de fonds urgente !</h3>
                        </div>
                        <p className="max-w-2xl mx-auto mb-16 text-lg font-medium text-emerald-700">
                            Le temps presse ! Rejoignez notre mission MAINTENANT pour un impact immédiat sur le terrain.
                        </p>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {campagnes_featured && campagnes_featured.length > 0 ? (
                                campagnes_featured.map((campagne) => {
                                    const percentage = getPercentage(campagne.collecte, campagne.objectif);
                                    return (
                                        <div key={campagne.id} className="flex flex-col transition bg-white border border-gray-100 shadow-sm p-7 rounded-3xl hover:shadow-xl group">
                                            {/* Header Carte (Drapeau & Pays) */}
                                            <div className="flex items-center pb-4 mb-6 text-left border-b border-gray-100">
                                                {getFlag(campagne.titre)}
                                                <h4 className="text-lg font-bold text-gray-900 truncate">
                                                    {campagne.titre.split('au')[1] || campagne.titre.split('en')[1] || 'Afrique'}
                                                </h4>
                                            </div>

                                            {/* Montants */}
                                            <div className="flex-grow mb-6 text-left">
                                                <p className="mb-1 text-3xl font-extrabold text-emerald-600">
                                                    {formatMoney(campagne.collecte)}
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    Objectif : {formatMoney(campagne.objectif)}
                                                </p>
                                            </div>

                                            {/* Barre de progression */}
                                            <div className="w-full bg-gray-100 h-2.5 rounded-full mb-8 relative overflow-hidden">
                                                <div
                                                    className="absolute inset-y-0 left-0 transition-all duration-500 rounded-full bg-emerald-500 group-hover:bg-emerald-600"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>

                                            {/* Bouton Action */}
                                            <Link
                                                href={`/campagnes/${campagne.slug}`}
                                                className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 transition shadow group-hover:scale-105"
                                            >
                                                Donner maintenant
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" className="w-4 h-4 stroke-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-1 p-10 text-center bg-white border border-gray-100 shadow-sm md:col-span-2 lg:col-span-4 rounded-3xl">
                                    <span className="block mb-4 text-5xl">🏜️</span>
                                    <h4 className="text-xl font-bold text-gray-800">Aucune collecte urgente pour le moment</h4>
                                    <p className="mt-2 text-gray-500">Revenez bientôt, de nouvelles causes ont besoin de votre soutien.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                                {/* --- SECTION STATISTIQUES --- */}
                <section className="relative py-20 overflow-hidden text-white bg-emerald-700">
                    {/* Image de fond avec opacité pour cette section spécifique */}
                    <div
                        className="absolute inset-0 bg-center bg-cover opacity-20"
                        style={{ backgroundImage: "url('/storage/images/features-bg.jpg')" }}
                    ></div>

                    {/* Contenu de la section (z-10 pour passer au-dessus de l'image) */}
                    <div className="relative z-10 px-6 mx-auto text-center max-w-7xl">
                        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-3">
                            <div>
                                <p className="mb-3 text-6xl font-extrabold">Plus de 217 000</p>
                                <p className="font-medium text-emerald-100">Donateurs actifs</p>
                            </div>
                            <div>
                                <p className="mb-3 text-6xl font-extrabold">50 ans et plus</p>
                                <p className="font-medium text-emerald-100">Causes soutenues</p>
                            </div>
                            <div>
                                <p className="mb-3 text-6xl font-extrabold">2,5 milliards+</p>
                                <p className="font-medium text-emerald-100">FCFA collectés</p>
                            </div>
                        </div>

                        <div className="max-w-3xl p-12 mx-auto border bg-white/10 rounded-3xl backdrop-blur-md border-white/20">
                            <h3 className="mb-6 text-4xl font-extrabold">Rejoignez notre communauté de donateurs</h3>
                            <p className="mb-10 text-lg text-emerald-100">Ensemble, nous faisons la différence au Cameroun et dans toute l'Afrique.</p>
                            <Link href={route('register')} className="flex items-center gap-2 px-8 py-4 mx-auto text-lg font-bold transition bg-white rounded-full shadow-lg text-emerald-700 hover:bg-gray-50 w-fit">
                                Créer mon compte gratuitement
                                <svg xmlns="http://www.w3.org/2000/center" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" className="w-5 h-5 stroke-emerald-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* --- SECTION "COMMENT ÇA MARCHE" --- */}
                <section className="py-24 bg-white">
                    <div className="px-6 mx-auto text-center max-w-7xl">
                        <h3 className="mb-4 text-4xl font-extrabold text-gray-900">Comment ça marche ?</h3>
                        <p className="max-w-xl mx-auto mb-20 text-lg text-gray-500">Faire un don n'a jamais été aussi simple et rapide.</p>

                        <div className="relative grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Ligne de connexion décorative (cachée sur mobile) */}
                            <div className="hidden lg:block absolute top-12 left-1/2 right-0 h-0.5 bg-emerald-100 -translate-x-1/2 w-3/4 z-0"></div>

                            {[
                                { step: 1, title: 'Inscrivez-vous', desc: 'Créez votre compte gratuitement en quelques clics.' },
                                { step: 2, title: 'Choisissez une cause', desc: 'Parcourez les causes qui vous tiennent à cœur.' },
                                { step: 3, title: 'Faites un don', desc: 'Via Orange Money, MTN Mobile Money ou carte.' },
                                { step: 4, title: 'Suivez l\'impact', desc: 'Recevez des mises à jour et voyez l\'évolution.' }
                            ].map((item) => (
                                <div key={item.step} className="relative z-10 flex flex-col items-center">
                                    <div className="flex items-center justify-center w-24 h-24 mb-8 text-5xl font-extrabold border-4 border-white rounded-full shadow-inner bg-emerald-50 text-emerald-600">
                                        {item.step}
                                    </div>
                                    <h4 className="mb-3 text-xl font-bold text-gray-900">{item.title}</h4>
                                    <p className="max-w-xs text-sm leading-relaxed text-gray-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- SECTION FAQ --- */}
                <section className="py-24 bg-emerald-50">
                    <div className="max-w-4xl px-6 mx-auto">
                        <div className="mb-16 text-center">
                            <h3 className="mb-4 text-4xl font-extrabold text-gray-900">Questions fréquentes</h3>
                            <p className="text-lg font-medium text-emerald-700">Tout ce que vous devez savoir avant de faire un don.</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { q: '💰 Comment puis-je faire un don ?', a: 'Connectez-vous, choisissez une cause, sélectionnez votre mode de paiement (Orange Money, MTN, Carte), et suivez les instructions. C\'est simple et rapide !' },
                                { q: '🔒 Mes dons sont-ils sécurisés ?', a: 'Oui, absolument. Nous utilisons des protocoles de sécurité avancés et des partenaires de paiement certifiés pour garantir la sécurité de chaque transaction.' },
                                { q: '💖 Puis-je faire un don en l\'honneur de quelqu\'un ?', a: 'Oui, lors du processus de don, vous pouvez spécifier si le don est fait en mémoire ou en l\'honneur d\'une personne.' },
                                { q: '📊 Comment mes dons sont-ils utilisés ?', a: 'La transparence est notre priorité. Chaque centime est reversé à la cause choisie, déduction faite des frais techniques de plateforme (minimes).' },
                                { q: '🔄 Puis-je programmer des dons récurrents ?', a: 'Bientôt ! Cette fonctionnalité est en cours de développement pour vous permettre de soutenir vos causes préférées chaque mois.' }
                            ].map((item, index) => (
                                <details key={index} className="p-6 bg-white border border-gray-100 shadow-sm cursor-pointer rounded-3xl group">
                                    <summary className="flex items-center justify-between text-lg font-bold text-gray-900 list-none">
                                        {item.q}
                                        <span className="transition-transform text-emerald-500 group-open:rotate-180">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" className="w-5 h-5 stroke-current">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <p className="pt-5 mt-5 text-sm leading-relaxed text-gray-600 border-t border-gray-100">
                                        {item.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- FOOTER --- */}
                <footer className="py-20 text-gray-300 bg-gray-950">
                    <div className="grid grid-cols-1 gap-12 px-6 mx-auto mb-16 max-w-7xl md:grid-cols-4">
                        {/* Colonne 1 : Logo & Desc */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center p-1.5">
                                    <span className="text-xl">🌍</span>
                                </div>
                                <h1 className="text-2xl font-bold text-white">ActNow</h1>
                            </div>
                            <p className="text-sm leading-relaxed text-gray-400">
                                Notre mission est d'aider les gens à réaliser leurs rêves et à soutenir les causes qui leur tiennent à cœur au Cameroun.
                            </p>
                        </div>

                        {/* Colonne 2 : Liens rapides */}
                        <div>
                            <h5 className="mb-5 font-bold text-white">Liens rapides</h5>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-emerald-400">Causes</a></li>
                                <li><a href="#" className="hover:text-emerald-400">À propos de nous</a></li>
                                <li><a href="#" className="hover:text-emerald-400">Contact</a></li>
                                <li><a href="#" className="hover:text-emerald-400">Blog</a></li>
                            </ul>
                        </div>

                        {/* Colonne 3 : Légal */}
                        <div>
                            <h5 className="mb-5 font-bold text-white">Légal</h5>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-emerald-400">Conditions d'utilisation</a></li>
                                <li><a href="#" className="hover:text-emerald-400">Politique de confidentialité</a></li>
                                <li><a href="#" className="hover:text-emerald-400">Sécurité</a></li>
                            </ul>
                        </div>

                        {/* Colonne 4 : Contact */}
                        <div>
                            <h5 className="mb-5 font-bold text-white">Contact</h5>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li className="flex items-center gap-3">
                                    📧 contact@fund.com
                                </li>
                                <li className="flex items-center gap-3">
                                    📞 +237 681 517 696
                                </li>
                                <li className="flex items-start gap-3">
                                    📍 Yaoundé, Cameroun
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="px-6 pt-10 mx-auto text-sm text-center text-gray-500 border-t border-gray-800 max-w-7xl">
                        © 2026 Fonds - Plateforme de Dons Caritatifs. Tous droits réservés.
                    </div>
                </footer>
            </div>
        </>
    );
}
