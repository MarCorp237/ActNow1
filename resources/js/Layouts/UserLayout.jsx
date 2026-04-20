import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function UserLayout({ user, children }) {
    const { url } = usePage();
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        {
            name: 'Mon Espace',
            link: '/dashboard',
            icon: <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        },
       {
            name: 'Explorer les causes',
            link: '/causes', // 👈 MODIFIE CECI (Au lieu de '/')
            icon: <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
        },
        {
            name: 'Historique des dons',
            link: '/historique', // 👈 MODIFIE CECI
            icon: <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
        },
        {
            name: 'Mon Profil',
            link: '/profile',
            icon: <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        },
    ];

    return (
        <div className="flex min-h-screen font-sans bg-gray-50">
            {/* SIDEBAR (Bleu Nuit) */}
            <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-[#0F172A] text-white flex flex-col fixed h-full z-20 transition-all duration-300 ease-in-out border-r border-[#1e293b]`}>

                <div className={`h-20 flex items-center justify-between px-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
                    <div className={`flex items-center gap-3 overflow-hidden ${collapsed ? 'hidden' : 'block'}`}>
                        <div className="flex items-center justify-center w-8 h-8 p-1 bg-white rounded-full shrink-0">
                            <img src="/images/logo.png" alt="Logo" className="object-contain w-full h-full" />
                        </div>
                        <h1 className="text-lg font-extrabold tracking-wide whitespace-nowrap">ActNow</h1>
                    </div>

                    <button onClick={() => setCollapsed(!collapsed)} className="p-1 text-gray-400 transition-colors rounded-md hover:text-white hover:bg-white/10" title={collapsed ? "Agrandir" : "Réduire"}>
                        {collapsed ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        )}
                    </button>
                </div>

                <nav className="flex-1 px-3 py-6 space-y-2 overflow-x-hidden overflow-y-auto scrollbar-hide">
                    {menuItems.map((item) => {
                        const isActive = url === item.link;
                        return (
                            <Link key={item.name} href={item.link} title={collapsed ? item.name : ""} className={`flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-[#1A8C4B] text-white shadow-md' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                                {item.icon}
                                <span className={`whitespace-nowrap transition-opacity duration-300 ${collapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10 bg-[#0B1120]">
                    <div className={`flex items-center gap-3 mb-4 ${collapsed ? 'justify-center' : 'px-2'}`}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1A8C4B] to-emerald-400 text-white flex items-center justify-center font-bold shrink-0 shadow-inner">
                            {user.name.substring(0, 1).toUpperCase()}
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ${collapsed ? 'hidden' : 'block'}`}>
                            <p className="text-sm font-bold text-white truncate">{user.name}</p>
                            <p className="text-xs text-[#1A8C4B] font-medium truncate">Donateur</p>
                        </div>
                    </div>

                    <Link href={route('logout')} method="post" as="button" title={collapsed ? "Déconnexion" : ""} className={`w-full flex items-center gap-4 text-gray-400 hover:text-red-400 font-semibold py-2 rounded-lg transition-colors ${collapsed ? 'justify-center px-0' : 'px-3'}`}>
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        <span className={`whitespace-nowrap transition-opacity duration-300 ${collapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>Déconnexion</span>
                    </Link>
                </div>
            </aside>

            {/* CONTENU PRINCIPAL */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${collapsed ? 'ml-20' : 'ml-64'}`}>
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
