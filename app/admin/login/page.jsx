'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back, Admin!');
    } catch {
      toast.error('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold">Developers<span className="text-blue-600">Hub</span></h1>
          <p className="text-gray-400 text-sm mt-2">Admin Panel — Secure Login</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input required type="email" placeholder="admin@developershub.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input required type="password" placeholder="••••••••"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              className="input-field" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">Restricted area. Authorized personnel only.</p>
      </div>
    </div>
  );
}
