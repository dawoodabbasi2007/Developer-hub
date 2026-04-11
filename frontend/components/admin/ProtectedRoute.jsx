'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { admin } = useAuth();
  const router    = useRouter();

  useEffect(() => {
    if (!admin) {
      router.push('/admin/login');
    }
  }, [admin, router]);

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return children;
}
