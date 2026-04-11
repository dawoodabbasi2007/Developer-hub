import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Developers<span className="text-blue-400">Hub</span>
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            A full-stack web development agency delivering modern, scalable, and
            high-performance digital solutions.
          </p>
          <div className="flex gap-4 mt-5">
            <a href="#" className="text-gray-400 hover:text-white transition"><FaGithub size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaLinkedin size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'],
              ['/portfolio', 'Portfolio'], ['/blog', 'Blog']].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Web Development</li>
            <li>Mobile Applications</li>
            <li>UI/UX Design</li>
            <li>API Development</li>
            <li>Cloud Deployment</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FiMail className="text-blue-400" />
              <span>info@developershub.com</span>
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="text-blue-400" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-2">
              <FiMapPin className="text-blue-400" />
              <span>San Francisco, CA</span>
            </li>
          </ul>
          <Link href="/contact"
            className="mt-5 inline-block bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Get In Touch
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 px-6 py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} DevelopersHub. All rights reserved.
      </div>
    </footer>
  );
}
