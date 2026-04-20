import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ user, children }) {
    const { url } = usePage();

    // État pour gérer la sidebar (ouverte ou réduite)
    const [collapsed, setCollapsed] = useState(false);

    // Tableau des menus avec des icônes SVG professionnelles
    const menuItems = [
        {
            name: 'Tableau de bord',
            link: '/admin/dashboard',
            icon: (
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            name: 'Gestion des causes',
            link: '/admin/campagnes',
            icon: (
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
            )
        },
        {
            name: 'Utilisateurs',
            link: '/admin/users', // 👈 MODIFIE CETTE LIGNE
            icon: (
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            name: 'Gestion des dons',
            link: '/admin/donations', // 👈 VÉRIFIE BIEN CETTE LIGNE. Si c'est '#', remplace-le !
            icon: (
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            name: 'Valider les dons',
            link: '/admin/donations/validate',
            icon: (
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )
        },
        {
            name: 'Rapports & Stats',
            link: '#',
            icon: (
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            name: 'Paramètres',
            link: '#',
            icon: (
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
    ];

    return (
        <div className="flex min-h-screen font-sans bg-gray-50">

            {/* --- SIDEBAR (Bleu Nuit) --- */}
            <aside
                className={`${collapsed ? 'w-20' : 'w-64'} bg-[#0F172A] text-white flex flex-col fixed h-full z-20 transition-all duration-300 ease-in-out border-r border-[#1e293b]`}
            >
                {/* En-tête de la sidebar avec Logo et Bouton Toggle */}
                <div className={`h-20 flex items-center justify-between px-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
                    <div className={`flex items-center gap-3 overflow-hidden ${collapsed ? 'hidden' : 'block'}`}>
                        <div className="bg-white rounded-full p-1.5 w-8 h-8 flex items-center justify-center shrink-0">
                            <img src="/images/logo.png" alt="Logo" className="object-contain w-full h-full" />
                        </div>
                        <h1 className="text-lg font-extrabold tracking-wide whitespace-nowrap">ActNow</h1>
                    </div>

                    {/* Le bouton d'action (Croix si ouvert, Menu burger si fermé) */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1 text-gray-400 transition-colors rounded-md hover:text-white hover:bg-white/10"
                        title={collapsed ? "Agrandir le menu" : "Réduire le menu"}
                    >
                        {collapsed ? (
                            // Icône Menu Burger (Quand réduit)
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        ) : (
                            // Petite Croix Grise (Quand ouvert)
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Navigation principale */}
                <nav className="flex-1 px-3 py-6 space-y-2 overflow-x-hidden overflow-y-auto scrollbar-hide">
                    {menuItems.map((item) => {
                        const isActive = url.startsWith(item.link) && item.link !== '#';
                        return (
                            <Link
                                key={item.name}
                                href={item.link}
                                title={collapsed ? item.name : ""} // Info-bulle quand c'est réduit
                                className={`flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                    isActive
                                    ? 'bg-[#1A8C4B] text-white shadow-md'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                {item.icon}
                                {/* Le texte disparaît de manière fluide lors de la réduction */}
                                <span className={`whitespace-nowrap transition-opacity duration-300 ${collapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Section Profil & Déconnexion en bas */}
                <div className="p-4 border-t border-white/10 bg-[#0B1120]">
                    <div className={`flex items-center gap-3 mb-4 ${collapsed ? 'justify-center' : 'px-2'}`}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1A8C4B] to-emerald-400 text-white flex items-center justify-center font-bold shrink-0 shadow-inner">
                            {user.name.substring(0, 1).toUpperCase()}
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ${collapsed ? 'hidden' : 'block'}`}>
                            <p className="text-sm font-bold text-white truncate">{user.name}</p>
                            <p className="text-xs text-gray-400 truncate">Administrateur</p>
                        </div>
                    </div>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        title={collapsed ? "Déconnexion" : ""}
                        className={`w-full flex items-center gap-4 text-gray-400 hover:text-red-400 font-semibold py-2 rounded-lg transition-colors ${collapsed ? 'justify-center px-0' : 'px-3'}`}
                    >
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className={`whitespace-nowrap transition-opacity duration-300 ${collapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                            Déconnexion
                        </span>
                    </Link>
                </div>
            </aside>

            {/* --- CONTENU PRINCIPAL --- */}
            {/* L'espace à gauche s'adapte automatiquement (ml-20 ou ml-64) */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${collapsed ? 'ml-20' : 'ml-64'}`}>

                {/* Header Optionnel pour la zone de contenu */}
                <header className="sticky top-0 z-10 flex items-center h-20 px-8 bg-white border-b border-gray-100 shadow-sm">
                    <div className="flex-1 max-w-xl">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#1A8C4B] focus:border-transparent transition"
                                placeholder="Rechercher un donateur, une campagne..."
                            />
                        </div>
                    </div>
                </header>

                {/* Le contenu de tes pages (ex: Dashboard.jsx) sera injecté ici */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
