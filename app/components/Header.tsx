'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    const sectionIds = ['profile-section', 'skills-section', 'projects-section'];
    const sectionMap: Record<string, string> = {
      'profile-section': 'profile',
      'skills-section': 'skills',
      'projects-section': 'projects',
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionMap[entry.target.id] ?? 'profile');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-5xl">
      <nav className="bg-[rgba(229,229,229,0.7)] backdrop-blur-md rounded-full px-8 py-4 flex items-center justify-between shadow-sm">
        {/* Logo */}
        <button
          onClick={() => scrollTo('profile-section')}
          className="text-base font-black uppercase tracking-tight text-black"
        >
          MI
        </button>

        {/* Navigation Pills */}
        <div className="hidden md:flex items-center gap-2">
          {[
            { label: 'Profile', id: 'profile-section', key: 'profile' },
            { label: 'Skills', id: 'skills-section', key: 'skills' },
            { label: 'Projects', id: 'projects-section', key: 'projects' },
          ].map(({ label, id, key }) => (
            <button
              key={key}
              onClick={() => scrollTo(id)}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${
                activeSection === key
                  ? 'bg-black text-white'
                  : 'bg-transparent text-black hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Contact Button */}
        <a
          href="mailto:mdiqbaal412@gmail.com"
          className="hidden md:block px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wide bg-black text-white hover:bg-gray-800 transition-colors"
        >
          Contact
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => {
            const menu = document.getElementById('mobile-menu');
            menu?.classList.toggle('hidden');
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="hidden md:hidden mt-4 bg-[rgba(229,229,229,0.95)] backdrop-blur-md rounded-3xl px-6 py-6 flex flex-col gap-3"
      >
        {[
          { label: 'Profile', id: 'profile-section', key: 'profile' },
          { label: 'Skills', id: 'skills-section', key: 'skills' },
          { label: 'Projects', id: 'projects-section', key: 'projects' },
        ].map(({ label, id, key }) => (
          <button
            key={key}
            onClick={() => {
              scrollTo(id);
              document.getElementById('mobile-menu')?.classList.add('hidden');
            }}
            className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wide transition-all ${
              activeSection === key
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
        <a
          href="mailto:mdiqbaal412@gmail.com"
          className="px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wide bg-black text-white text-center"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
