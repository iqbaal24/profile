'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { projects } from '../projects/project-data';

const iconMap: Record<string, React.ReactNode> = {
  code: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  database: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  printer: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm-6-4h.01M7 20h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v13a2 2 0 002 2z" />
    </svg>
  ),
  bus: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12a2 2 0 012 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2zM8 9v6m4-6v6m4-6v6M9 19h6" />
    </svg>
  ),
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mainScroll = document.getElementById('main-scroll');
    const section = sectionRef.current;
    if (!mainScroll || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.querySelectorAll('.reveal-mask').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100);
          });
          section.querySelectorAll('.fade-up').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), 200 + i * 80);
          });
          observer.disconnect();
        }
      },
      { root: mainScroll, threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen pt-28 sm:pt-36 md:pt-40 pb-28 md:pb-36"
    >
      <div className="px-6 sm:px-10 md:px-16 xl:px-24 w-full">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 border-b border-ink/10 pb-6">
          <div className="overflow-hidden">
            <div className="reveal-mask">
              <span className="block text-[clamp(52px,10vw,120px)] leading-[0.9] font-black uppercase tracking-[-0.04em] text-ink">
                Featured
              </span>
            </div>
            <div className="reveal-mask">
              <span className="block text-[clamp(52px,10vw,120px)] leading-[0.9] font-black uppercase tracking-[-0.04em] text-ink">
                Projects
              </span>
            </div>
          </div>

          {/* Page label pill */}
          <div className="fade-up hidden sm:block shrink-0 mb-1">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-canvas text-[10px] uppercase tracking-widest font-bold">
              03 / Projects
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="fade-up max-w-xl mb-16" style={{ transitionDelay: '0.1s' }}>
          <p className="text-sm leading-relaxed text-ink-muted text-justify">
            A selection of projects built with modern web technologies, combining Next.js,
            Laravel, PHP, and MySQL for robust and scalable applications.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`fade-up group flex flex-col h-full p-8 rounded-3xl border border-ink/10 bg-ink/[0.02] hover:bg-ink/5 transition-all duration-500 ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
              style={{ transitionDelay: `${0.15 + index * 0.08}s` }}
            >
              {/* Top row */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-ink text-canvas text-[10px] font-bold uppercase tracking-widest">
                    {project.projectType}
                  </span>
                  {project.statusLabel && (
                    <span className="px-3 py-1 rounded-full border border-accent text-accent text-[10px] font-bold uppercase tracking-widest">
                      {project.statusLabel}
                    </span>
                  )}
                </div>
                <span className="text-ink-muted shrink-0 ml-3">
                  {iconMap[project.icon]}
                </span>
              </div>

              {/* Title */}
              <h2 className={`font-black uppercase tracking-tight text-ink mb-4 leading-tight ${
                index === 0 ? 'text-[clamp(28px,4vw,52px)]' : 'text-2xl md:text-3xl'
              }`}>
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-sm leading-relaxed text-ink-muted mb-8 flex-grow font-medium">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-ink/10 text-ink-muted text-[10px] font-semibold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              {project.previewEnabled ? (
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas text-xs uppercase tracking-widest font-bold hover:opacity-80 transition-opacity w-fit"
                >
                  Preview
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <span className="inline-flex items-center px-6 py-3 rounded-full border border-ink/20 text-ink-muted text-xs uppercase tracking-widest font-bold w-fit">
                  Preview unavailable
                </span>
              )}
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
