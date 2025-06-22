'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faFileInvoice,
    faUsers,
    faCog,
    faUser,
    faBars,
    faTimes,
    faSignOutAlt,
    faBell,
    faSearch,
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: faHome },
    { name: 'Invoices', href: '/invoices', icon: faFileInvoice },
    { name: 'Clients', href: '/clients', icon: faUsers },
    { name: 'Settings', href: '/settings', icon: faCog },
    { name: 'Profile', href: '/profile', icon: faUser },
];

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!mounted) {
        return null; // Prevent hydration mismatch
    }

    const sidebarWidth = sidebarCollapsed ? 'w-20' : 'w-72';
    const mainMargin = sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full ${sidebarWidth} bg-white/95 backdrop-blur-xl shadow-2xl border-r border-slate-200/60
                transform transition-all duration-300 ease-in-out lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full'}
            `}>
                {/* Sidebar header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200/60 bg-gradient-to-r from-blue-600 to-blue-700">
                    <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon icon={faFileInvoice} className="w-5 h-5 text-white" />
                        </div>
                        {(!sidebarCollapsed || sidebarOpen) && (
                            <div className="transition-all duration-300">
                                <h2 className="text-xl font-bold text-white whitespace-nowrap">BTWise</h2>
                                <p className="text-xs text-blue-100 whitespace-nowrap">Invoice System</p>
                            </div>
                        )}
                    </div>

                    {/* Mobile close button */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                    </button>

                    {/* Desktop collapse button */}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden lg:block p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <FontAwesomeIcon
                            icon={sidebarCollapsed ? faChevronRight : faChevronLeft}
                            className="w-4 h-4"
                        />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:shadow-md'
                                    }
                                    ${sidebarCollapsed ? 'justify-center' : ''}
                                `}
                                onClick={() => setSidebarOpen(false)}
                                title={sidebarCollapsed ? item.name : ''}
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500'
                                        } ${sidebarCollapsed ? '' : 'mr-3'}`}
                                />
                                {(!sidebarCollapsed || sidebarOpen) && (
                                    <>
                                        <span className="transition-all duration-300">{item.name}</span>
                                        {isActive && (
                                            <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                                        )}
                                    </>
                                )}

                                {/* Tooltip for collapsed state */}
                                {sidebarCollapsed && !sidebarOpen && (
                                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                                        {item.name}
                                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout button */}
                <div className="p-4 border-t border-slate-200/60">
                    <button
                        onClick={handleLogout}
                        className={`
                            flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 group relative
                            ${sidebarCollapsed ? 'justify-center' : ''}
                        `}
                        title={sidebarCollapsed ? 'Logout' : ''}
                    >
                        <FontAwesomeIcon
                            icon={faSignOutAlt}
                            className={`w-5 h-5 transition-transform group-hover:scale-110 ${sidebarCollapsed ? '' : 'mr-3'}`}
                        />
                        {(!sidebarCollapsed || sidebarOpen) && (
                            <span className="transition-all duration-300">Logout</span>
                        )}

                        {/* Tooltip for collapsed state */}
                        {sidebarCollapsed && !sidebarOpen && (
                            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                                Logout
                                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                            </div>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className={`transition-all duration-300 ${mainMargin}`}>
                {/* Top navigation */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
                    <div className="flex items-center justify-between px-4 sm:px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            >
                                <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
                            </button>

                            {/* Search bar - hidden on mobile */}
                            <div className="hidden md:flex items-center space-x-3">
                                <div className="relative">
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search invoices, clients..."
                                        className="pl-10 pr-4 py-2 w-80 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            {/* Mobile search button */}
                            <button className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                                <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
                            </button>

                            {/* Notifications */}
                            <button className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                                <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                            </button>

                            {/* User profile */}
                            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
                                <div className="hidden sm:block text-right">
                                    <p className="text-sm font-medium text-slate-900">Welcome back!</p>
                                    <p className="text-xs text-slate-500">Ready to manage invoices?</p>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}