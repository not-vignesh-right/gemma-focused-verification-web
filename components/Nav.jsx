'use client';
// Header: wordmark, route links whose letters roll on hover, a pencil bead under the active route,
// a reading-progress hairline, and a tone that flips over dark chapters.
import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger } from '../motion/gsap';

const LINKS = [
  ['/', 'Overview'],
  ['/method/', 'Method'],
  ['/results/', 'Results'],
  ['/code/', 'Code'],
  ['/evidence/', 'Evidence'],
  ['/models/', 'Models & Data'],
];

function Roll({ text }) {
  return (
    <span className="roll" aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} className="roll__cell" style={{ '--i': i }}>
          <span className="roll__char">
            {ch === ' ' ? ' ' : ch}
            <span className="roll__copy">{ch === ' ' ? ' ' : ch}</span>
          </span>
        </span>
      ))}
    </span>
  );
}

const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default function Nav() {
  const path = usePathname();
  const nav = useRef(null);
  const bar = useRef(null);
  const header = useRef(null);

  // bead under the active link
  useIsoLayout(() => {
    const n = nav.current;
    if (!n) return;
    const place = () => {
      const a = n.querySelector('[aria-current="page"]');
      if (!a) {
        n.style.setProperty('--bo', '0');
        return;
      }
      n.style.setProperty('--bx', `${a.offsetLeft + a.offsetWidth / 2 - 3}px`);
      n.style.setProperty('--bo', '1');
      if (n.scrollWidth > n.clientWidth) a.scrollIntoView({ block: 'nearest', inline: 'center' });
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [path]);

  // reading progress + tone over dark chapters
  useEffect(() => {
    const triggers = [];
    const b = bar.current;
    const h = header.current;
    const darks = [...document.querySelectorAll('[data-tone="dark"]')];
    const cy = 30; // the header's own vertical centre
    // Tone is recomputed from layout on every update, so instant jumps can never leave it stale.
    const tone = () => {
      if (!h) return;
      const dark = darks.some((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= cy && r.bottom > cy;
      });
      const next = dark ? 'dark' : 'light';
      if (h.dataset.tone !== next) h.dataset.tone = next;
    };
    triggers.push(
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (s) => {
          if (b) gsap.set(b, { scaleX: s.progress });
          tone();
        },
        onRefresh: tone,
      }),
    );
    tone();
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(t);
      triggers.forEach((x) => x.kill());
    };
  }, [path]);

  return (
    <header ref={header} className="topbar" data-tone="light">
      <div className="topbar-inner">
        <a className="brand" href="/" data-label="Overview">
          Focused <em>Verification</em>
        </a>
        <nav ref={nav} className="navlinks" aria-label="Site">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className="roll-host" aria-current={path === href ? 'page' : undefined} aria-label={label}>
              <Roll text={label} />
            </a>
          ))}
          <span className="navbead" aria-hidden="true" />
        </nav>
      </div>
      <span ref={bar} className="progress" aria-hidden="true" />
    </header>
  );
}
