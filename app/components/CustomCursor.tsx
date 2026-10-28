'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const curRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only on pointer devices, not touch screens
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    dot.style.opacity = '1';

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      // Lerp with delay for smooth trailing effect
      curRef.current.x += (posRef.current.x - curRef.current.x) * 0.12;
      curRef.current.y += (posRef.current.y - curRef.current.y) * 0.12;

      if (dot) {
        dot.style.transform = `translate(${curRef.current.x}px, ${curRef.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const onEnterInteractive = () => dot?.classList.add('cursor-enlarged');
    const onLeaveInteractive = () => dot?.classList.remove('cursor-enlarged');

    const attachListeners = () => {
      document
        .querySelectorAll('a, button, [role="button"], input, textarea, select, label')
        .forEach(el => {
          el.removeEventListener('mouseenter', onEnterInteractive);
          el.removeEventListener('mouseleave', onLeaveInteractive);
          el.addEventListener('mouseenter', onEnterInteractive);
          el.addEventListener('mouseleave', onLeaveInteractive);
        });
    };

    const mutationObserver = new MutationObserver(attachListeners);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    attachListeners();

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="custom-cursor-dot"
      style={{ opacity: 0 }}
      aria-hidden="true"
    />
  );
}
