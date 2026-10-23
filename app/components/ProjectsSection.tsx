'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { projects } from '../projects/project-data';

export default function ProjectsSection() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects-section"
      className="min-h-screen w-full py-32 px-8 md:px-16 lg:px-24"
    >
      {/* Section Title */}
      <div className="mb-24">
        <h2
          className="fade-in text-[12vw] md:text-[8vw] lg:text-[6vw] font-black uppercase leading-[0.85] tracking-tighter text-black"
          style={{ transitionDelay: '0.1s' }}
        >
          SELECTED
          <br />
          WORK
        </h2>
      </div>

      {/* Projects Grid - Asymmetric */}
      <div className="space-y-12 md:space-y-20">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div
              key={project.slug}
              className={`fade-in grid grid-cols-1 ${
                isEven ? 'lg:grid-cols-12' : 'lg:grid-cols-12'
              } gap-8 lg:gap-12 items-center`}
              style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
            >
              {/* Image Column */}
              <div
                className={`${
                  isEven ? 'lg:col-span-7 lg:order-1' : 'lg:col-span-7 lg:order-2'
                } relative`}
              >
                <div className="aspect-[16/10] relative rounded-[32px] overflow-hidden bg-gray-200 group">
                  {project.previewImage && (
                    <Image
                      src={project.previewImage}
                      alt={project.previewImageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  
                  {/* Project Number Overlay */}
                  <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <span className="text-2xl font-black">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div
                className={`${
                  isEven ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-1'
                } space-y-6`}
              >
                {/* Labels */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                    {project.projectType}
                  </span>
                  {project.statusLabel && (
                    <span className="px-4 py-2 rounded-full border border-black text-[10px] font-bold uppercase tracking-widest">
                      {project.statusLabel}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] leading-relaxed text-justify">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1 text-[10px] font-semibold uppercase tracking-wide border border-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                {project.previewEnabled ? (
                  <a
                    href={`/projects/${project.slug}`}
                    className="inline-block px-8 py-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    View Case Study
                  </a>
                ) : (
                  <span className="inline-block px-8 py-3 rounded-full border border-gray-300 text-gray-400 text-xs font-bold uppercase tracking-wider">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div
        className="fade-in mt-32 h-[2px] bg-black"
        style={{ transitionDelay: '0.8s' }}
      />
    </section>
  );
}
