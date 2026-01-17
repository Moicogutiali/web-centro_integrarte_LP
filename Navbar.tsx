
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Capacitación', path: '/capacitacion' },
    { name: 'Profesionales', path: '/profesionales' },
    { name: 'Asistente IA', path: '/asistente' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold transition-all px-3 py-1.5 rounded-lg ${isActive(link.path) ? 'text-primary bg-primary/5' : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/solicitud"
              className="bg-primary hover:bg-blue-600 text-white text-xs font-black uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">gavel</span>
              Solicitar Conciliación
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 p-4 space-y-3 animate-fade-in-down">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block text-base font-semibold px-4 py-2 rounded-lg ${isActive(link.path) ? 'bg-primary/10 text-primary' : 'text-slate-600'
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/solicitud"
            className="block w-full text-center bg-primary text-white font-bold py-3 rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Solicitar Conciliación
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
