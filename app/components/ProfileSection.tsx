'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const scrollToSection = (id: string) => {
  const mainScroll = document.getElementById('main-scroll');
  const el = document.getElementById(id);
  if (mainScroll && el) {
    mainScroll.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  }
};

export default function ProfileSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate title reveals on mount
    const timer = setTimeout(() => {
      const masks = document.querySelectorAll('#profile .reveal-mask');
      masks.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 120);
      });

      const fades = document.querySelectorAll('#profile .fade-up');
      fades.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 400 + i * 100);
      });

      const photos = document.querySelectorAll('#profile .photo-reveal');
      photos.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 200 + i * 150);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Parallax on photo
  useEffect(() => {
    const mainScroll = document.getElementById('main-scroll');
    const photo = photoRef.current;
    if (!mainScroll || !photo) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleScroll = () => {
      const scrollTop = mainScroll.scrollTop;
      photo.style.transform = `translateY(${scrollTop * 0.25}px)`;
    };

    mainScroll.addEventListener('scroll', handleScroll, { passive: true });
    return () => mainScroll.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden pt-28 sm:pt-36 md:pt-40 pb-24 md:pb-32"
    >
      {/* ── Grid layout ── */}
      <div className="px-6 sm:px-10 md:px-16 xl:px-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-start w-full">

          {/* Left: Text content */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10 relative" ref={contentRef}>

            {/* Label pill */}
            <div className="fade-up mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-ink/20 text-ink-muted text-xs uppercase tracking-widest font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                Junior Developer
              </span>
            </div>

            {/* Giant title — bleeds off screen */}
            <div ref={titleRef} className="mb-8 overflow-hidden">
              <div className="reveal-mask">
                <span
                  className="block text-[clamp(60px,12vw,140px)] leading-[0.9] font-black uppercase tracking-[-0.04em] text-ink whitespace-nowrap"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  Mohammad
                </span>
              </div>
              <div className="reveal-mask" style={{ transitionDelay: '80ms' }}>
                <span
                  className="block text-[clamp(60px,12vw,140px)] leading-[0.9] font-black uppercase tracking-[-0.04em] text-ink whitespace-nowrap"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  Iqbal
                </span>
              </div>
              <div className="reveal-mask" style={{ transitionDelay: '160ms' }}>
                <span
                  className="block text-[clamp(60px,12vw,140px)] leading-[0.9] font-black uppercase tracking-[-0.04em] text-ink-muted whitespace-nowrap"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  (Iqbaal)
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="fade-up max-w-md mb-10" style={{ transitionDelay: '0.1s' }}>
              <p className="text-sm leading-relaxed text-ink-muted text-justify font-medium">
                An Informatics Engineering student focused on software and web development,
                with a strong understanding of programming logic and problem-solving.
                Ready to grow and contribute as a Junior Developer.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="fade-up flex flex-wrap gap-3 mb-12" style={{ transitionDelay: '0.2s' }}>
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3 rounded-full bg-ink text-canvas text-xs uppercase tracking-widest font-bold hover:opacity-80 transition-opacity"
              >
                View Projects
              </button>
              <a
                href="#"
                className="px-6 py-3 rounded-full border border-ink/30 text-ink text-xs uppercase tracking-widest font-bold hover:border-ink hover:bg-ink/5 transition-all"
              >
                Download CV
              </a>
            </div>

            {/* Social links */}
            <div className="fade-up flex items-center gap-4" style={{ transitionDelay: '0.3s' }}>
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink-muted font-semibold">Connect</span>
              <span className="w-8 h-px bg-ink/20" />
              <a
                href="https://github.com/miqi4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted hover:text-ink transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/mohammad-iqbal-766023386/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted hover:text-ink transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Photo — editorial bold crop */}
          <div className="lg:col-span-5 relative flex justify-end items-start mt-16 lg:mt-0">
            {/* Page label pill */}
            <div className="absolute -left-4 bottom-8 z-20 hidden lg:block">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink text-canvas text-[10px] uppercase tracking-widest font-bold">
                01 / Profile
              </span>
            </div>

            {/* Photo */}
            <div
              ref={photoRef}
              className="relative w-[280px] sm:w-[340px] lg:w-[400px] xl:w-[440px] aspect-[3/4] overflow-hidden rounded-3xl"
              style={{ willChange: 'transform' }}
            >
              <div className="photo-reveal w-full h-full">
                <Image
                  alt="Mohammad Iqbal"
                  src="/profil.jpeg"
                  fill
                  className="object-cover grayscale contrast-125 brightness-90"
                  priority
                />
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent rounded-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="fade-up absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ transitionDelay: '0.6s' }}>
        <button
          onClick={() => scrollToSection('skills')}
          className="flex flex-col items-center gap-2 text-ink-muted hover:text-ink transition-colors group"
          aria-label="Scroll to Skills"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Scroll</span>
          <div className="w-px h-10 bg-ink/20 group-hover:bg-ink/50 transition-colors" />
        </button>
      </div>
    </section>
  );
}
