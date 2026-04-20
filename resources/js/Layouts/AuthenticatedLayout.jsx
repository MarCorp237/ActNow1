import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const { url } = usePage();

    const menuItems = [
        { name: 'Tableau de bord', icon: '🏠', link: '/dashboard' },
        { name: 'Causes', icon: '🎯', link: '#' },
        { name: 'Mes dons', icon: '💲', link: '#' },
        { name: 'Commentaires', icon: '💬', link: '#' },
        { name: 'Favoris', icon: '🔖', link: '#' },
        { name: 'Mon profil', icon: '👤', link: '/profile' },
        { name: 'Paramètres', icon: '⚙️', link: '#' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar Blanche */}
            <aside className="fixed z-10 flex flex-col w-64 h-full bg-white border-r border-gray-200">
                <div className="flex items-center gap-3 p-6">
                    <img src="/images/logo.png" alt="Logo" className="object-contain w-8 h-8" />
                    <div>
                        <h1 className="text-lg font-bold leading-tight text-gray-900">Agissez</h1>
                        <p className="text-xs font-semibold text-gray-500">maintenant</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 mt-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = url.startsWith(item.link) && item.link !== '#';
                        return (
                            <Link
                                key={item.name}
                                href={item.link}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${isActive
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}

                    {user.role === 'admin' && (
                        <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 mt-4 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50">
                            <span className="text-lg">🛡️</span> Administration
                        </Link>
                    )}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-emerald-500">
                            {user.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                    <Link href={route('logout')} method="post" as="button" className="flex items-center w-full gap-2 px-2 py-2 text-sm font-medium text-red-500 transition hover:text-red-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Déconnexion
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1 h-screen ml-64">
                <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-8 bg-white border-b border-gray-200">
                    <div className="flex-1 max-w-lg">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </span>
                            <input type="text" className="w-full py-2 pl-10 pr-4 text-sm transition border-transparent rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Rechercher..." />
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
