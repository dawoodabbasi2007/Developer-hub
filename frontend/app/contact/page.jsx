'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import API from '../../lib/axios';
import toast from 'react-hot-toast';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const contactInfo = [
  { icon: FiMail,    label: 'Email Us',    value: 'info@developershub.com'  },
  { icon: FiPhone,   label: 'Call Us',     value: '+1 (555) 123-4567'        },
  { icon: FiMapPin,  label: 'Our Office',  value: 'San Francisco, CA, USA'   },
];

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactPage() {
  const [form,    setForm]    = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/inquiries', form);
      toast.success('Message sent! We\'ll get back to you within 24 hours.');
      setForm(initialForm);
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 to-blue-950 text-white py-28 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-300">
              Have a project in mind? Let's talk. We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Let's Start a Conversation</h2>
              <p className="text-gray-500 leading-relaxed mb-10">
                Whether you have a big idea, a small project, or just want to explore
                possibilities — reach out and let's build something great together.
              </p>

              <div className="space-y-6">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{label}</p>
                      <p className="text-gray-500 text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required placeholder="Your Full Name" value={form.name} onChange={set('name')}
                    className="input-field bg-white" />
                  <input
                    required type="email" placeholder="Email Address" value={form.email} onChange={set('email')}
                    className="input-field bg-white" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    placeholder="Phone Number" value={form.phone} onChange={set('phone')}
                    className="input-field bg-white" />
                  <input
                    placeholder="Subject" value={form.subject} onChange={set('subject')}
                    className="input-field bg-white" />
                </div>
                <textarea
                  required rows={5} placeholder="Tell us about your project..."
                  value={form.message} onChange={set('message')}
                  className="input-field bg-white resize-none" />
                <button type="submit" disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2">
                  <FiSend size={16} />
                  {loading ? 'Sending...' : 'Send Message'}
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
