'use client';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../context/AuthContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style:   { background: '#1e293b', color: '#fff' },
          success: { style: { background: '#16a34a' } },
          error:   { style: { background: '#dc2626' } },
        }}
      />
    </AuthProvider>
  );
}
