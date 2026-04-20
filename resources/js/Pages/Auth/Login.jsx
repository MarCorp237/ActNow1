import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onSuccess: () => toast.success('Connexion réussie ! Content de vous revoir.'),
            onError: () => toast.error('Veuillez vérifier vos identifiants.')
        });
    };

    return (
        <div className="flex min-h-screen font-sans bg-gray-50">
            <Head title="Connexion" />

            {/* --- PARTIE GAUCHE (Image & Texte) --- */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#1A8C4B] text-white flex-col justify-center px-16 xl:px-24 overflow-hidden">
                {/* Arrière-plan */}
                <div 
                    className="absolute inset-0 bg-center bg-cover opacity-30 mix-blend-overlay"
                    style={{ backgroundImage: "url('/storage/images/hero-bg.jpg')" }}
                ></div>
                
                <div className="relative z-10 w-full max-w-lg">
                    {/* Logo ActNow */}
                    <div className="absolute left-0 flex items-center gap-3 -top-32">
                        <img src="/images/logo.png" alt="ActNow Logo" className="object-contain w-10 h-10 p-1 bg-white rounded-full" />
                        <span className="text-2xl font-bold tracking-tight">ActNow</span>
                    </div>

                    <h1 className="mb-6 text-4xl font-bold leading-tight xl:text-5xl">Content de vous revoir !</h1>
                    <p className="text-[#A7D8B9] text-lg font-medium max-w-md">
                        Connectez-vous pour soutenir les causes qui vous tiennent à cœur.
                    </p>
                </div>
                
                <div className="absolute bottom-8 left-16 xl:left-24 text-[#A7D8B9] text-sm">
                    © 2026 ActNow. Tous droits réservés.
                </div>
            </div>

            {/* --- PARTIE DROITE (Formulaire) --- */}
            <div className="relative flex items-center justify-center w-full p-6 lg:w-1/2 sm:p-12">
                <div className="w-full max-w-[440px] bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                    <div className="mb-8 text-center">
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">Connexion</h2>
                        <p className="text-sm text-gray-500">Connectez-vous à votre compte</p>
                    </div>

                    {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

                    {/* Bloc Démo */}
                    <div className="bg-[#F0F7FF] text-[#1D4ED8] text-xs rounded-xl p-4 mb-6 border border-[#BFDBFE]">
                        <p className="flex items-center gap-2 mb-1">👑 <strong>Admin :</strong> admin@actnow.cm / Admin2024!</p>
                        <p className="flex items-center gap-2">👤 <strong>User :</strong> marie@example.com / password123</p>
                    </div>

                    {/* Boutons Sociaux */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <a href="/auth/google" className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                            Google
                        </a>
                        <a href="/auth/facebook" className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
                            Facebook
                        </a>
                    </div>

                    <div className="relative flex items-center justify-center mb-6">
                        <span className="absolute px-3 text-xs text-gray-400 bg-white">Ou connectez-vous avec votre email</span>
                        <div className="w-full h-px bg-gray-100"></div>
                    </div>

                    <form onSubmit={submit}>
                        {/* Champ Email */}
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Adresse email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm focus:ring-[#1A8C4B] focus:border-[#1A8C4B] transition ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="exemple@email.com"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                        </div>

                        {/* Champ Mot de passe */}
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Mot de passe</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`w-full pl-10 pr-10 py-2.5 bg-white border rounded-xl text-sm focus:ring-[#1A8C4B] focus:border-[#1A8C4B] transition ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600">
                                    {showPassword ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
                        </div>

                        {/* Options */}
                        <div className="flex items-center justify-between mt-2 mb-6">
                            <label className="flex items-center cursor-pointer group">
                                <input type="checkbox" name="remember" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} className="rounded border-gray-300 text-[#1A8C4B] shadow-sm focus:ring-[#1A8C4B]" />
                                <span className="ml-2 text-xs font-medium text-gray-600 transition group-hover:text-gray-800">Se souvenir de moi</span>
                            </label>
                            {canResetPassword && (
                                <Link href={route('password.request')} className="text-xs font-medium text-[#1A8C4B] hover:underline">
                                    Mot de passe oublié ?
                                </Link>
                            )}
                        </div>

                        <button disabled={processing} className="w-full py-3 px-4 rounded-xl shadow-sm text-sm font-bold text-white bg-[#1A8C4B] hover:bg-[#15713c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A8C4B] transition disabled:opacity-50">
                            Se connecter
                        </button>

                        <p className="mt-6 text-xs font-medium text-center text-gray-500">
                            Pas encore de compte ?{' '}
                            <Link href={route('register')} className="text-[#1A8C4B] hover:underline font-bold">
                                S'inscrire gratuitement
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}