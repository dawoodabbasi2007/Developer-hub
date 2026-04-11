import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FiUsers, FiAward, FiTrendingUp, FiHeart } from 'react-icons/fi';

export const metadata = { title: 'DevelopersHub — About Us' };

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients'      },
  { value: '3+',  label: 'Years Experience'   },
  { value: '10+', label: 'Team Members'        },
];

const values = [
  { icon: FiUsers,     title: 'Client-First',  desc: 'Everything we build starts with understanding your goals and your users.' },
  { icon: FiAward,     title: 'Quality Code',  desc: 'We write clean, tested, and maintainable code that scales with your business.' },
  { icon: FiTrendingUp,title: 'Growth Mindset',desc: 'We stay ahead of the curve, always learning and adopting the best tools.' },
  { icon: FiHeart,     title: 'Passion Driven',desc: 'We genuinely love building things. That passion shows in every project.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 to-blue-950 text-white py-28 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-6">About DevelopersHub</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We are a passionate team of full-stack developers, designers, and strategists
              dedicated to building world-class digital products.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-blue-600 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map(s => (
              <div key={s.label}>
                <p className="text-5xl font-extrabold">{s.value}</p>
                <p className="text-blue-100 mt-2 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At DevelopersHub, our mission is simple: deliver high-quality, scalable,
                and user-friendly web applications that help businesses grow and succeed in the
                digital world.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe great software is built through collaboration, clear communication,
                and a deep commitment to craftsmanship. Every line of code we write is a
                reflection of that belief.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-10 text-center">
              <p className="text-6xl mb-4">🚀</p>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Built to Launch</h3>
              <p className="text-blue-700 text-sm">
                From MVP to enterprise-scale — we have the expertise to take your product
                from idea to production.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide everything we do.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card text-center border border-gray-100">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Icon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
