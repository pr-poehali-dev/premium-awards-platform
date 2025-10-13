import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function AlternativeHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/alt', label: 'ГЛАВНАЯ' },
    { path: '/catalog', label: 'КАТАЛОГ' },
    { path: '/portfolio', label: 'ПОРТФОЛИО' },
    { path: '/constructor', label: 'КОНСТРУКТОР' },
    { path: '/contact', label: 'КОНТАКТЫ' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-8 md:px-16 py-6">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center group">
              <img 
                src="https://cdn.poehali.dev/files/22ce25dc-a953-4ec4-bfe3-9b8eaa50205b.png" 
                alt="ART STEKLOV" 
                className="h-10 md:h-12 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wider transition-all hover:text-white ${
                    isActive(link.path)
                      ? 'text-white border-b-2 border-white pb-1'
                      : 'text-white/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button className="w-10 h-10 rounded-full border border-white/30 hover:border-white/60 backdrop-blur-sm flex items-center justify-center transition-all">
                <Icon name="Search" size={18} className="text-white" />
              </button>
              <button className="w-10 h-10 rounded-full border border-white/30 hover:border-white/60 backdrop-blur-sm flex items-center justify-center transition-all">
                <Icon name="User" size={18} className="text-white" />
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} className="text-white" />
            </button>
          </nav>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-20 right-8 bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10 p-8 min-w-[280px]">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium tracking-wider transition-all hover:text-white ${
                    isActive(link.path) ? 'text-white' : 'text-white/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-4 pt-4 border-t border-white/10">
                <button className="flex-1 h-12 rounded-full border border-white/30 hover:border-white/60 backdrop-blur-sm flex items-center justify-center gap-2 transition-all text-white">
                  <Icon name="Search" size={18} />
                  <span className="text-sm">Поиск</span>
                </button>
                <button className="w-12 h-12 rounded-full border border-white/30 hover:border-white/60 backdrop-blur-sm flex items-center justify-center transition-all">
                  <Icon name="User" size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
