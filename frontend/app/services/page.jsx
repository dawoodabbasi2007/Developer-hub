'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import API from '../../lib/axios';
import { FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    API.get('/services')
      .then(r => setServices(r.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 to-blue-950 text-white py-28 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-6">Our Services</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              End-to-end web development services designed to help your business
              scale, grow, and succeed online.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : services.length === 0 ? (
              <p className="text-center text-gray-400 py-20 text-lg">
                No services available yet. Check back soon!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, idx) => (
                  <div key={service._id}
                    className="border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mb-5 group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.description}</p>
                    {service.features?.length > 0 && (
                      <ul className="space-y-2">
                        {service.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <FiCheckCircle className="text-green-500 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-blue-600 text-white text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-blue-100 mb-8">
              Let's discuss your project requirements and build something amazing together.
            </p>
            <Link href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition inline-block">
              Talk to Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
