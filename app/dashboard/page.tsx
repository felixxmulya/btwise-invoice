'use client';

import { useAuth } from '../lib/auth/config';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase/config';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-900">BTWise Invoice</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700">
                                Welcome, {user?.email}
                            </span>
                            <button
                                onClick={handleSignOut}
                                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
                        <p className="text-gray-600">
                            Welcome to your BTWise Invoice dashboard! You are successfully logged in.
                        </p>
                        
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-900">Total Invoices</h3>
                                <p className="text-2xl font-bold text-blue-600">0</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-green-900">Paid Invoices</h3>
                                <p className="text-2xl font-bold text-green-600">0</p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-yellow-900">Pending Invoices</h3>
                                <p className="text-2xl font-bold text-yellow-600">0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}