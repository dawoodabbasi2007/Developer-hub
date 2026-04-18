'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import API from '../../lib/axios';
import toast from 'react-hot-toast';
import { FiCalendar, FiClock, FiCheckCircle } from 'react-icons/fi';

const timeSlots = ['09:00 AM','10:00 AM','11:00 AM','02:00 PM','03:00 PM','04:00 PM','05:00 PM'];
const empty = { name: '', email: '', phone: '', date: '', time: '', topic: '' };

export default function BookingPage() {
  const [form,      setForm]      = useState(empty);
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const set = f => e => setForm({ ...form, [f]: e.target.value });
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/meetings', form);
      setSubmitted(true);
    } catch { toast.error('Failed to book. Please try again.'); }
    finally { setLoading(false); }
  };

  if (submitted) return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Meeting Booked!</h2>
          <p className="text-gray-500 mb-2">Thanks <span className="font-semibold text-gray-700">{form.name}</span>!</p>
          <p className="text-sm text-gray-400 mb-8">📅 {form.date} at {form.time}<br />We'll confirm at <strong>{form.email}</strong>.</p>
          <button onClick={() => { setForm(empty); setSubmitted(false); }} className="btn-primary w-full">
            Book Another Meeting
          </button>
        </div>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-gray-900 to-blue-950 text-white py-28 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-6">Book a Meeting</h1>
            <p className="text-xl text-gray-300">Schedule a free 30-minute discovery call with our team.</p>
          </div>
        </section>

        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-xl mx-auto">
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[['📝','Fill the Form'],['📅','Pick a Time Slot'],['✅','Get Confirmation']].map(([icon,label]) => (
                <div key={label} className="text-center bg-white rounded-xl p-4 shadow-sm">
                  <span className="text-2xl">{icon}</span>
                  <p className="text-xs text-gray-500 mt-2 font-medium">{label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FiCalendar className="text-blue-600" /> Schedule Your Meeting
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required placeholder="Full Name" value={form.name} onChange={set('name')} className="input-field" />
                  <input required type="email" placeholder="Email Address" value={form.email} onChange={set('email')} className="input-field" />
                </div>
                <input placeholder="Phone (optional)" value={form.phone} onChange={set('phone')} className="input-field" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1"><FiCalendar size={14} /> Preferred Date</label>
                    <input required type="date" value={form.date} onChange={set('date')} min={today} className="input-field" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1"><FiClock size={14} /> Preferred Time</label>
                    <select required value={form.time} onChange={set('time')} className="input-field">
                      <option value="">Select a time</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <input placeholder="Meeting Topic / Project Idea" value={form.topic} onChange={set('topic')} className="input-field" />
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Booking...' : '📅 Confirm Booking'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
