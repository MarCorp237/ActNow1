import React from 'react';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
            <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white border border-gray-100 shadow-md sm:max-w-md sm:rounded-2xl">
                {children}
            </div>
        </div>
    );
}
