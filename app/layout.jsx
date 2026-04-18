import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../context/AuthContext';
import './globals.css';

export const metadata = {
  title:       'DevelopersHub — Full-Stack Agency',
  description: 'Professional web development agency delivering modern, scalable solutions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: '#1e293b', color: '#fff' },
              success: { style: { background: '#16a34a' } },
              error:   { style: { background: '#dc2626' } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
