'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);

            // Set/clear cookie for middleware
            if (user) {
                document.cookie = `__session=${user.uid}; path=/; max-age=86400; samesite=strict`;
            } else {
                document.cookie = '__session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
        });

        return () => unsubscribe();
    }, []);

    // Handle route protection on the client side
    useEffect(() => {
        if (loading) return; // Don't redirect while loading

        const protectedRoutes = ['/dashboard'];
        const authRoutes = ['/login'];

        const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
        const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

        // If user is not authenticated and trying to access protected route
        if (isProtectedRoute && !user) {
            router.replace('/login');
            return;
        }

        // If user is authenticated and trying to access auth routes
        if (isAuthRoute && user) {
            router.replace('/dashboard');
            return;
        }

        // If user is on root and authenticated, go to dashboard
        if (pathname === '/' && user) {
            router.replace('/dashboard');
            return;
        }

        // If user is on root and not authenticated, go to login
        if (pathname === '/' && !user) {
            router.replace('/login');
            return;
        }
    }, [user, loading, pathname, router]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};