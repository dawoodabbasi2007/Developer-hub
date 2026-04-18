'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import API from '../../lib/axios';
import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';

export default function BlogPage() {
  const [blogs,   setBlogs]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/blog').then(r => setBlogs(r.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-gray-900 to-blue-950 text-white py-28 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-6">Our Blog</h1>
            <p className="text-xl text-gray-300">Insights, tutorials, and updates from our team.</p>
          </div>
        </section>

        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : blogs.length === 0 ? (
              <p className="text-center text-gray-400 py-20 text-lg">No blog posts yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map(blog => (
                  <article key={blog.id} className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col">
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                      {blog.image ? (
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">📝</div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      {blog.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {blog.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">{tag}</span>
                          ))}
                        </div>
                      )}
                      <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition line-clamp-2">{blog.title}</h2>
                      {blog.summary && <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-1">{blog.summary}</p>}
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                        <span className="flex items-center gap-1"><FiUser size={12} /> {blog.author}</span>
                        <span className="flex items-center gap-1"><FiCalendar size={12} />
                          {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <Link href={`/blog/${blog.id}`} className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:gap-2 transition-all">
                        Read More <FiArrowRight />
                      </Link>
                    </div>
                  </article>
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
