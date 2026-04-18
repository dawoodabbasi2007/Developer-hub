'use client';
import { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import API from '../lib/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('adminInfo');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });
  const router = useRouter();

  const login = async (email, password) => {
    const { data } = await API.post('/auth', { action: 'login', email, password });
    Cookies.set('adminToken', data.token, { expires: 7 });
    localStorage.setItem('adminInfo', JSON.stringify(data));
    setAdmin(data);
    router.push('/admin/dashboard');
  };

  const logout = () => {
    Cookies.remove('adminToken');
    localStorage.removeItem('adminInfo');
    setAdmin(null);
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
