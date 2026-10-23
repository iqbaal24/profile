'use client';

import { useEffect } from 'react';

export default function SkillsSection() {
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

  const skills = [
    {
      name: 'Next.js',
      level: '90%',
      description: 'Modern React framework for production-grade applications with SSR and SSG.',
    },
    {
      name: 'Laravel',
      level: '85%',
      description: 'PHP framework for elegant backend architecture and rapid API development.',
    },
    {
      name: 'Java',
      level: '80%',
      description: 'Enterprise development with focus on OOP, multithreading, and Spring Boot.',
    },
  ];

  const tools = [
    'PostgreSQL',
    'Docker',
    'Tailwind CSS',
    'Git',
    'TypeScript',
    'MySQL',
    'Redis',
    'Nginx',
    'Filament',
    'Composer',
    'NPM',
    'REST APIs',
  ];

  return (
    <section
      id="skills-section"
      className="min-h-screen w-full py-32 px-8 md:px-16 lg:px-24"
    >
      {/* Section Title */}
      <div className="mb-24">
        <h2
          className="fade-in text-[12vw] md:text-[8vw] lg:text-[6vw] font-black uppercase leading-[0.85] tracking-tighter text-black"
          style={{ transitionDelay: '0.1s' }}
        >
          TECHNICAL
          <br />
          EXPERTISE
        </h2>
      </div>

      {/* Core Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="fade-in"
            style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
          >
            <div className="border-2 border-black rounded-[24px] p-8 hover:bg-black hover:text-white transition-all duration-500 group h-full flex flex-col">
              {/* Skill Name */}
              <h3 className="text-3xl font-black uppercase mb-2">{skill.name}</h3>
              
              {/* Level */}
              <div className="text-sm font-bold mb-6 opacity-60">{skill.level}</div>
              
              {/* Description */}
              <p className="text-[12px] leading-relaxed mb-6 flex-grow">
                {skill.description}
              </p>
              
              {/* Progress Bar */}
              <div className="w-full h-1 bg-gray-200 group-hover:bg-gray-800 rounded-full overflow-hidden transition-colors">
                <div
                  className="h-full bg-black group-hover:bg-white transition-all duration-1000 ease-out"
                  style={{ width: skill.level }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Tools */}
      <div
        className="fade-in"
        style={{ transitionDelay: '0.6s' }}
      >
        <h3 className="text-xl font-black uppercase mb-8 tracking-tight">Additional Tools & Technologies</h3>
        <div className="flex flex-wrap gap-3">
          {tools.map((tool) => (
            <span
              key={tool}
              className="px-6 py-3 rounded-full border border-black text-xs font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition-all"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        className="fade-in mt-32 h-[2px] bg-black"
        style={{ transitionDelay: '0.8s' }}
      />
    </section>
  );
}
