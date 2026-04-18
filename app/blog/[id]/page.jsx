'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import API from '../../../lib/axios';
import { FiCalendar, FiUser, FiArrowLeft, FiTag } from 'react-icons/fi';

export default function BlogDetailPage() {
  const { id }    = useParams();
  const [blog,    setBlog]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    if (!id) return;
    API.get(`/blog/${id}`)
      .then(r => setBlog(r.data))
      .catch(() => setError('Blog post not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <><Navbar />
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div><Footer /></>
  );

  if (error) return (
    <><Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-gray-500 text-lg">{error}</p>
      <Link href="/blog" className="text-blue-600 hover:underline flex items-center gap-1"><FiArrowLeft /> Back to Blog</Link>
    </div><Footer /></>
  );

  return (
    <>
      <Navbar />
      <main className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="flex items-center gap-2 text-blue-600 hover:underline mb-8 text-sm font-medium">
            <FiArrowLeft /> Back to Blog
          </Link>
          {blog.image && (
            <div className="h-72 rounded-2xl overflow-hidden mb-8">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag, i) => (
                <span key={i} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                  <FiTag size={10} /> {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-5 leading-tight">{blog.title}</h1>
          <div className="flex items-center gap-6 text-sm text-gray-400 mb-8 pb-8 border-b">
            <span className="flex items-center gap-1"><FiUser size={14} /> {blog.author}</span>
            <span className="flex items-center gap-1"><FiCalendar size={14} />
              {new Date(blog.created_at).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </main>
      <Footer />
    </>
  );
}
