import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        telephone: '',
        pays: 'Cameroun',
        ville: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        if (!data.terms) {
            toast.error("Veuillez accepter les conditions d'utilisation.");
            return;
        }

        post(route('register'), {
            onSuccess: () => toast.success('Inscription réussie ! Bienvenue dans la communauté ActNow.'),
            onError: () => toast.error('Veuillez corriger les erreurs du formulaire.')
        });
    };

    return (
        <div className="flex min-h-screen font-sans bg-gray-50">
            <Head title="Créer un compte" />

            {/* --- PARTIE GAUCHE (Image & Texte) --- */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#1A8C4B] text-white flex-col justify-center px-16 xl:px-24 overflow-hidden">
                <div
                    className="absolute inset-0 bg-center bg-cover opacity-30 mix-blend-overlay"
                    style={{ backgroundImage: "url('/storage/images/hero-bg.jpg')" }}
                ></div>

                <div className="relative z-10 w-full max-w-lg">
                    {/* Logo ActNow */}
                    <div className="absolute left-0 flex items-center gap-3 -top-16">
                        <img src="/images/logo.png" alt="ActNow Logo" className="object-contain w-10 h-10 p-1 bg-white rounded-full" />
                        <span className="text-2xl font-bold tracking-tight">ActNow</span>
                    </div>

                    <h1 className="mb-6 text-4xl font-bold leading-tight xl:text-5xl">Rejoignez notre communauté</h1>
                    <p className="text-[#A7D8B9] text-lg font-medium mb-12 max-w-md">
                        Ensemble, faisons la différence. Créez votre compte et commencez à soutenir des causes qui comptent.
                    </p>

                    <ul className="space-y-6">
                        <li className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            </div>
                            <span className="font-medium text-[15px]">Soutenez des causes locales</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </div>
                            <span className="font-medium text-[15px]">Paiements 100% sécurisés</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                            </div>
                            <span className="font-medium text-[15px]">Suivez l'impact de vos dons</span>
                        </li>
                    </ul>
                </div>

                <div className="absolute bottom-8 left-16 xl:left-24 text-[#A7D8B9] text-sm">
                    © 2026 ActNow. Tous droits réservés.
                </div>
            </div>

            {/* --- PARTIE DROITE (Formulaire) --- */}
            <div className="relative flex items-center justify-center w-full p-6 overflow-y-auto lg:w-1/2 sm:p-12">
                <div className="w-full max-w-[480px] bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 my-auto">
                    <div className="mb-8 text-center">
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">Créer un compte</h2>
                        <p className="text-sm text-gray-500">Rejoignez ActNow et commencez à faire la différence</p>
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
                        <span className="absolute px-3 text-xs text-gray-400 bg-white">Ou inscrivez-vous avec votre email</span>
                        <div className="w-full h-px bg-gray-100"></div>
                    </div>

                    <form onSubmit={submit} className="space-y-4">

                        {/* Nom complet */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nom complet</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                </div>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm focus:ring-[#1A8C4B] focus:border-[#1A8C4B] ${errors.name ? 'border-red-500' : 'border-gray-200'}`} placeholder="Ex: Jean Dupont" />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Adresse email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm focus:ring-[#1A8C4B] focus:border-[#1A8C4B] ${errors.email ? 'border-red-500' : 'border-gray-200'}`} placeholder="exemple@email.com" />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                        </div>

                        {/* Téléphone */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Téléphone</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                </div>
                                <input type="text" value={data.telephone} onChange={e => setData('telephone', e.target.value)} className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm focus:ring-[#1A8C4B] focus:border-[#1A8C4B] ${errors.telephone ? 'border-red-500' : 'border-gray-200'}`} placeholder="Ex: 690123456" />
                            </div>
                            {errors.telephone && <p className="text-red-500 text-xs mt-1.5">{errors.telephone}</p>}
                        </div>

                        {/* Pays et Ville */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Pays</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    </div>
                                    <select value={data.pays} onChange={e => setData('pays', e.target.value)} className={`w-full pl-10 pr-8 py-2.5 bg-white border rounded-xl text-sm appearance-none focus:ring-[#1A8C4B] focus:border-[#1A8C4B] ${errors.pays ? 'border-red-500' : 'border-gray-200'}`}>
                                        <option value="Cameroun">Cameroun</option>
                                        <option value="Sénégal">Sénégal</option>
                                        <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                    {/* Select Arrow Icon */}
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                                {errors.pays && <p className="text-red-500 text-xs mt-1.5">{errors.pays}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Ville</label>
                                <input type="text" value={data.ville} onChange={e => setData('ville', e.target.value)} className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:ring-[#1A8C4B] focus:border-[#1A8C4B] ${errors.ville ? 'border-red-500' : 'border-gray-200'}`} placeholder="Ex: Yaoundé" />
                                {errors.ville && <p className="text-red-500 text-xs mt-1.5">{errors.ville}</p>}
                            </div>
                        </div>

                        {/* Mot de passe */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Mot de passe</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                </div>
                                <input type={showPassword ? "text" : "password"} value={data.password} onChange={e => setData('password', e.target.value)} className={`w-full pl-10 pr-10 py-2.5 bg-white border rounded-xl text-sm focus:ring-[#1A8C4B] focus:border-[#1A8C4B] ${errors.password ? 'border-red-500' : 'border-gray-200'}`} placeholder="••••••••" />
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

                        {/* Confirmer Mot de passe */}
                        <div className="mb-6">
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Confirmer le mot de passe</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                </div>
                                <input type={showConfirmPassword ? "text" : "password"} value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-[#1A8C4B] focus:border-[#1A8C4B] transition" placeholder="••••••••" />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600">
                                    {showConfirmPassword ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Conditions */}
                        <div className="mb-6">
                            <label className="flex items-start cursor-pointer group">
                                <input type="checkbox" name="terms" checked={data.terms} onChange={e => setData('terms', e.target.checked)} className="rounded border-gray-300 text-[#1A8C4B] shadow-sm focus:ring-[#1A8C4B] mt-0.5" />
                                <span className="ml-2 text-[11px] leading-relaxed text-gray-500">
                                    J'accepte les <a href="#" className="text-[#1A8C4B] hover:underline font-semibold">conditions d'utilisation</a> et la <a href="#" className="text-[#1A8C4B] hover:underline font-semibold">politique de confidentialité</a>
                                </span>
                            </label>
                        </div>

                        <button disabled={processing} className="w-full py-3 px-4 rounded-xl shadow-sm text-sm font-bold text-white bg-[#1A8C4B] hover:bg-[#15713c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A8C4B] transition disabled:opacity-50">
                            Créer mon compte
                        </button>

                        <p className="mt-6 text-xs font-medium text-center text-gray-500">
                            Vous avez déjà un compte ?{' '}
                            <Link href={route('login')} className="text-[#1A8C4B] hover:underline font-bold">
                                Connectez-vous
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
