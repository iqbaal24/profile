export default function Footer() {
  return (
    <footer className="w-full border-t border-ink/10 bg-canvas flex-shrink-0">
      <div className="px-6 sm:px-10 md:px-16 xl:px-24 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-xs tracking-widest font-bold uppercase text-ink-muted">
            © 2024 Mohammad Iqbal
          </span>
        </div>

        <div className="flex gap-5">
          {[
            { label: 'GitHub', href: 'https://github.com/miqi4' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammad-iqbal-766023386/' },
            { label: 'Email', href: 'mailto:mdiqbaal412@gmail.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-xs tracking-widest font-semibold uppercase text-ink-muted hover:text-ink transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
