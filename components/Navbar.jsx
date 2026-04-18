'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiLock } from 'react-icons/fi';

const navLinks = [
  { href: '/',          label: 'Home'      },
  { href: '/about',     label: 'About'     },
  { href: '/services',  label: 'Services'  },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog',      label: 'Blog'      },
  { href: '/contact',   label: 'Contact'   },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) return null;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link href="/" className="text-2xl font-bold text-blue-600">
          Developers<span className="text-gray-900">Hub</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === link.href ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}>
              {link.label}
            </Link>
          ))}
          <Link href="/booking" className="btn-primary text-sm px-5 py-2">
            Book a Meeting
          </Link>
          <Link href="/admin/login"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 border border-gray-300 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200">
            <FiLock size={13} /> Admin
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-700 text-2xl">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-3">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className={`block text-sm font-medium py-1 ${
                pathname === link.href ? 'text-blue-600' : 'text-gray-700'
              }`}>
              {link.label}
            </Link>
          ))}
          <div className="pt-2 space-y-2">
            <Link href="/booking" onClick={() => setOpen(false)}
              className="block btn-primary text-sm text-center">
              Book a Meeting
            </Link>
            <Link href="/admin/login" onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-500 border border-gray-300 px-4 py-2.5 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all">
              <FiLock size={13} /> Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
