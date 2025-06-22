'use client';

import { useAuth } from './lib/auth/config';
import Loading from './components/loading';

export default function Home() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}