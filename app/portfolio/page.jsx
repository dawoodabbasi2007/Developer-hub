'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import API from '../../lib/axios';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

export default function PortfolioPage() {
  const [items,    setItems]    = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    API.get('/portfolio')
      .then(r => { setItems(r.data); setFiltered(r.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(items.map(i => i.category).filter(Boolean))];

  const handleFilter = (cat) => {
    setCategory(cat);
    setFiltered(cat === 'All' ? items : items.filter(i => i.category === cat));
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-gray-900 to-blue-950 text-white py-28 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-6">Our Portfolio</h1>
            <p className="text-xl text-gray-300">A showcase of projects we've designed, built, and deployed.</p>
          </div>
        </section>

        <section className="py-10 px-6 bg-white border-b">
          <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button key={cat} onClick={() => handleFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  category === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-gray-400 py-20 text-lg">No projects found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map(item => (
                  <div key={item.id} className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                    <div className="h-52 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-blue-400 text-4xl font-bold">
                          {item.title?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{item.category}</span>
                      <h3 className="text-lg font-bold mt-3 mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{item.description}</p>
                      {item.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.technologies.map((tech, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{tech}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-3">
                        {item.live_url && (
                          <a href={item.live_url} target="_blank" rel="noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
                            <FiExternalLink size={14} /> Live Demo
                          </a>
                        )}
                        {item.github_url && (
                          <a href={item.github_url} target="_blank" rel="noreferrer"
                            className="flex items-center gap-1 text-sm text-gray-600 hover:underline">
                            <FiGithub size={14} /> GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
