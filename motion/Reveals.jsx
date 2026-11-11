'use client';
// Soft reveals for flowing content. Blocks below the fold are tagged with data-reveal only when JS runs,
// so no-JS visitors and anything already on screen never flash hidden. One IntersectionObserver per page;
// blocks entering together are staggered. Elements with .bars/.grid60/.interval also get .is-in to start
// their own drawing transitions.
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { reduced } from './gsap';

const AUTO =
  'main .page > :is(h2, h3, p, ol, ul, pre, .tablewrap, .card, .grid, .callout, .cb, .ref), [data-reveal]';

export default function Reveals() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.classList.add('motion-ok'); // motion booted: the 6s safety unhide is not needed
    const fold = window.innerHeight * 0.92;
    const els = [...document.querySelectorAll(AUTO)].filter((el) => !el.classList.contains('is-in'));
    if (reduced() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const watch = [];
    for (const el of els) {
      if (el.getBoundingClientRect().top < fold) {
        el.classList.add('is-in');
        continue;
      }
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
      watch.push(el);
    }
    const io = new IntersectionObserver(
      (entries) => {
        let n = 0;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.style.setProperty('--d', `${n++ * 90}ms`);
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
    );
    watch.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}
