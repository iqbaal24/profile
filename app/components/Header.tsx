'use client';

import { useState, useEffect } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    const mainScroll = document.getElementById('main-scroll');
    if (!mainScroll) return;

    const sections = ['profile', 'skills', 'projects'];
    const handleScroll = () => {
      const scrollTop = mainScroll.scrollTop;
      const containerHeight = mainScroll.clientHeight;
      let current = 'profile';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollTop >= el.offsetTop - containerHeight / 3) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    mainScroll.addEventListener('scroll', handleScroll, { passive: true });
    return () => mainScroll.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const mainScroll = document.getElementById('main-scroll');
    const el = document.getElementById(id);
    if (mainScroll && el) {
      const targetTop = Math.max(0, el.offsetTop - 30);
      mainScroll.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'profile', label: 'Profile' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
  ];

  return (
    <header className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-fit max-w-[95vw]">
      {/* Main floating pill */}
      <div className="pointer-events-auto inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full backdrop-blur-md bg-ink/5 dark:bg-white/10 border border-ink/10 dark:border-white/15 shadow-sm shadow-black/5">
        {/* Logo */}
        <button
          onClick={() => scrollTo('profile')}
          className="text-[11px] font-black uppercase tracking-[0.2em] text-ink px-2.5 py-1 hover:opacity-70 transition-opacity whitespace-nowrap"
        >
          Iqbaal
        </button>

        {/* Divider */}
        <div className="w-px h-3.5 bg-ink/15 dark:bg-white/20 mx-0.5" />

        {/* Desktop Nav Items */}
        <nav className="hidden sm:inline-flex items-center gap-1">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-3.5 py-1 rounded-full text-[11px] uppercase tracking-widest transition-all duration-200 whitespace-nowrap ${
                activeSection === id
                  ? 'bg-ink text-canvas font-bold shadow-sm'
                  : 'text-ink/65 dark:text-white/70 hover:text-ink dark:hover:text-white hover:bg-ink/8 dark:hover:bg-white/10 font-semibold'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-px h-3.5 bg-ink/15 dark:bg-white/20 mx-0.5 hidden sm:block" />

        {/* Theme Switcher */}
        <div className="flex items-center">
          <ThemeSwitcher />
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="sm:hidden p-1 rounded-full text-ink/70 hover:text-ink transition-colors ml-0.5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="pointer-events-auto mt-2 flex flex-col gap-1 p-2 rounded-2xl backdrop-blur-md bg-canvas/95 dark:bg-canvas/95 border border-ink/10 dark:border-white/15 shadow-xl w-48 mx-auto">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-semibold text-left transition-all duration-200 ${
                activeSection === id
                  ? 'bg-ink text-canvas font-bold'
                  : 'text-ink/70 hover:bg-ink/8 hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
