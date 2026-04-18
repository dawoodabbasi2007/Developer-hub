'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { FiGrid, FiSettings, FiBriefcase, FiFileText, FiMail, FiCalendar, FiLogOut, FiExternalLink } from 'react-icons/fi';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard',  icon: FiGrid      },
  { href: '/admin/services',  label: 'Services',   icon: FiSettings  },
  { href: '/admin/portfolio', label: 'Portfolio',  icon: FiBriefcase },
  { href: '/admin/blog',      label: 'Blog Posts', icon: FiFileText  },
  { href: '/admin/inquiries', label: 'Inquiries',  icon: FiMail      },
  { href: '/admin/meetings',  label: 'Meetings',   icon: FiCalendar  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { admin, logout } = useAuth();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-gray-700">
        <h2 className="font-bold text-xl text-white">Developers<span className="text-blue-400">Hub</span></h2>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
        {admin && <p className="text-xs text-blue-300 mt-1 font-medium">{admin.name}</p>}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
              pathname === href ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}>
            <Icon size={18} /> {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700 space-y-2">
        <Link href="/" target="_blank"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition">
          <FiExternalLink size={16} /> View Website
        </Link>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-red-400 hover:bg-red-600 hover:text-white transition">
          <FiLogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}
