'use client';

import { useEffect, useRef, useState } from 'react';

const scrollToSection = (id: string) => {
  const mainScroll = document.getElementById('main-scroll');
  const el = document.getElementById(id);
  if (mainScroll && el) {
    mainScroll.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  }
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mainScroll = document.getElementById('main-scroll');
    const section = sectionRef.current;
    if (!mainScroll || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animate skill bars
          setTimeout(() => {
            section.querySelectorAll('.reveal-mask').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
            section.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), 200 + i * 80);
            });
            // Skill bars
            setTimeout(() => {
              section.querySelectorAll('.skill-bar').forEach((bar, i) => {
                const width = bar.getAttribute('data-width');
                if (width) {
                  setTimeout(() => {
                    (bar as HTMLElement).style.width = width;
                  }, i * 100);
                }
              });
            }, 400);
          }, 100);

          observer.disconnect();
        }
      },
      { root: mainScroll, threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'Next.js', level: 90, desc: 'Building performant, SEO-optimized React apps with SSR and SSG.' },
    { name: 'Laravel + Filament', level: 85, desc: 'Architecting scalable backend systems and powerful admin panels.' },
    { name: 'Java', level: 80, desc: 'Enterprise-grade apps with OOP, multithreading, and Spring Boot.' },
  ];

  const additionalRow1 = [
    'PostgreSQL', 'Docker', 'Tailwind CSS', 'Git', 'RESTful APIs', 'TypeScript', 'MySQL', 'Linux', 'Nginx', 'Redis',
  ];
  const additionalRow2 = [
    'Filament', 'Blade', 'Composer', 'NPM', 'Vite', 'MVC', 'OOP', 'GitHub Actions', 'Postman', 'Docker Compose',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden pt-28 sm:pt-36 md:pt-40 pb-24 md:pb-32"
    >
      <div className="px-6 sm:px-10 md:px-16 xl:px-24 w-full">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 border-b border-ink/10 pb-6">
          <div>
            {/* Oversize title that bleeds */}
            <div className="overflow-hidden mb-2">
              <div className="reveal-mask">
                <span className="block text-[clamp(52px,10vw,120px)] leading-[0.9] font-black uppercase tracking-[-0.04em] text-ink">
                  Technical
                </span>
              </div>
              <div className="reveal-mask">
                <span className="block text-[clamp(52px,10vw,120px)] leading-[0.9] font-black uppercase tracking-[-0.04em] text-ink">
                  Proficiency
                </span>
              </div>
            </div>
          </div>

          {/* Page label pill */}
          <div className="fade-up hidden sm:block shrink-0 mb-1">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink/20 text-ink-muted text-[10px] uppercase tracking-widest font-bold">
              02 / Skills
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="fade-up max-w-xl mb-16" style={{ transitionDelay: '0.1s' }}>
          <p className="text-sm leading-relaxed text-ink-muted text-justify">
            A comprehensive overview of my core engineering capabilities, emphasizing robust backend architectures
            and modern frontend frameworks.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="fade-up group flex flex-col justify-between p-8 rounded-3xl border border-ink/10 bg-ink/[0.02] hover:bg-ink/5 transition-all duration-500"
              style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
            >
              <div>
                {/* Skill name */}
                <h3 className="text-2xl font-black uppercase tracking-tight text-ink mb-4 leading-none">
                  {skill.name}
                </h3>
                <p className="text-xs leading-relaxed text-ink-muted font-medium mb-8">
                  {skill.desc}
                </p>
              </div>

              {/* Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-ink-muted">Proficiency</span>
                  <span className="text-[10px] font-black text-ink">{skill.level}%</span>
                </div>
                <div className="w-full h-1 rounded-full bg-ink/10 overflow-hidden">
                  <div
                    className="skill-bar h-full rounded-full bg-ink w-0 transition-all duration-[1500ms] ease-out"
                    data-width={`${skill.level}%`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Arsenal */}
        <div className="fade-up mb-16" style={{ transitionDelay: '0.4s' }}>
          <h3 className="text-sm font-black uppercase tracking-[0.15em] text-ink-muted mb-6">
            Additional Arsenal
          </h3>

          {/* Marquee row 1 */}
          <div className="overflow-hidden py-2 mb-2">
            <div className="flex gap-2 animate-marquee-left" style={{ width: 'max-content' }}>
              {[...additionalRow1, ...additionalRow1].map((tech, i) => (
                <span
                  key={`r1-${i}`}
                  className="inline-flex items-center px-4 py-2 rounded-full border border-ink/15 text-xs tracking-widest font-semibold text-ink-muted uppercase bg-canvas hover:bg-ink hover:text-canvas hover:border-ink transition-all duration-200 cursor-default whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Marquee row 2 */}
          <div className="overflow-hidden py-2">
            <div className="flex gap-2 animate-marquee-right" style={{ width: 'max-content' }}>
              {[...additionalRow2, ...additionalRow2].map((tech, i) => (
                <span
                  key={`r2-${i}`}
                  className="inline-flex items-center px-4 py-2 rounded-full border border-ink/15 text-xs tracking-widest font-semibold text-ink-muted uppercase bg-canvas hover:bg-ink hover:text-canvas hover:border-ink transition-all duration-200 cursor-default whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA to Projects */}
        <div className="fade-up flex items-center gap-6" style={{ transitionDelay: '0.5s' }}>
          <div className="w-16 h-px bg-ink/20" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink-muted font-semibold">
            See what I&apos;ve built
          </p>
          <button
            onClick={() => scrollToSection('projects')}
            className="ml-auto px-6 py-3 rounded-full bg-ink text-canvas text-xs uppercase tracking-widest font-bold hover:opacity-80 transition-opacity"
          >
            View Projects →
          </button>
        </div>
      </div>
    </section>
  );
}
