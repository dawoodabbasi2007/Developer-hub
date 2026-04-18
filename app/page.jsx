import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiArrowRight, FiCode, FiLayout, FiServer, FiShield } from 'react-icons/fi';

export const metadata = {
  title: 'DevelopersHub — Home',
};

const features = [
  { icon: FiLayout,  title: 'Modern UI/UX',       desc: 'Beautiful, responsive interfaces built with latest design trends.' },
  { icon: FiServer,  title: 'Robust Backend',      desc: 'Scalable APIs and server-side logic that power your business.' },
  { icon: FiCode,    title: 'Clean Code',           desc: 'Maintainable, well-structured code following industry standards.' },
  { icon: FiShield,  title: 'Secure & Fast',        desc: 'Security-first approach with optimized performance at every layer.' },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero Section ───────────────────────────────────────────────── */}
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 flex items-center justify-center text-white px-6 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-blue-600 opacity-5 blur-3xl rounded-full w-96 h-96 mx-auto top-1/3"></div>

          <div className="text-center max-w-4xl z-10">
            <span className="bg-blue-600/20 text-blue-300 text-sm font-semibold px-4 py-2 rounded-full border border-blue-600/30 mb-6 inline-block">
              Full-Stack Web Development Agency
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mt-4 mb-6 leading-tight">
              We Build
              <span className="text-blue-400"> Digital</span>
              <br />Experiences
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              From concept to deployment — we craft modern, scalable, and
              high-performance web applications tailored to your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                Explore Services <FiArrowRight />
              </Link>
              <Link href="/booking"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition">
                Book a Free Call
              </Link>
            </div>
          </div>
        </section>

        {/* ── Features Section ───────────────────────────────────────────── */}
        <section className="py-24 bg-white px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-title">Why Choose DevelopersHub?</h2>
            <p className="section-subtitle">
              We combine technical expertise with creative thinking to deliver
              products that truly make an impact.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card text-center hover:border-blue-200 border border-transparent">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Icon size={26} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ────────────────────────────────────────────────── */}
        <section className="py-24 bg-blue-600 px-6 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Let's turn your idea into a real product. Book a free discovery call today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition">
                Contact Us
              </Link>
              <Link href="/portfolio"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition">
                See Our Work
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
