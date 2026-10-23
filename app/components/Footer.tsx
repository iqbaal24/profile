'use client';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 md:px-16 lg:px-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t-2 border-black">
        {/* Copyright */}
        <div className="text-xs font-semibold uppercase tracking-widest text-black">
          © 2024 Mohammad Iqbal
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/miqi4"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full border border-black text-xs font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition-all"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mohammad-iqbal-766023386/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full border border-black text-xs font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition-all"
          >
            LinkedIn
          </a>
          <a
            href="mailto:mdiqbaal412@gmail.com"
            className="px-6 py-2 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
