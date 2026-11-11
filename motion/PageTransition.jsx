'use client';
// Page transitions that never slow navigation: click → router.push immediately → a ruled sheet rises with
// the destination's name → once the route changes (and at least MIN_COVER has passed) it lifts away.
// Slow loads turn the sheet into a loader. Prefetches on intent.
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap, reduced } from './gsap';

const MIN_COVER = 420;
const WAITING_AFTER = 900;
const SAFETY = 9000;

const LABELS = {
  '/': 'Overview',
  '/method/': 'Method',
  '/results/': 'Results',
  '/code/': 'Code',
  '/evidence/': 'Evidence',
  '/models/': 'Models & Data',
};

export default function PageTransition() {
  const router = useRouter();
  const path = usePathname();
  const sheet = useRef(null);
  const [label, setLabel] = useState('');
  const st = useRef({ at: 0, up: false, timers: [] });
  const prev = useRef(path);

  const clearTimers = () => {
    st.current.timers.forEach((t) => clearTimeout(t));
    st.current.timers = [];
  };

  const lift = () => {
    const s = sheet.current;
    if (!s || !st.current.up) return;
    st.current.up = false;
    clearTimers();
    const wait = Math.max(0, MIN_COVER - (performance.now() - st.current.at));
    gsap.to(s, {
      yPercent: -100,
      borderRadius: '0 0 50% 50% / 0 0 18vh 18vh',
      duration: 0.7,
      ease: 'expo.inOut',
      delay: wait / 1000,
      onComplete: () => {
        gsap.set(s, { display: 'none' });
        s.classList.remove('is-waiting');
      },
    });
  };

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (url.pathname.startsWith('/downloads/')) return;
      e.preventDefault();
      router.push(url.pathname + url.search + url.hash);
      const s = sheet.current;
      if (reduced() || !s) return;
      clearTimers();
      setLabel(a.dataset.label ?? LABELS[url.pathname] ?? '');
      Object.assign(st.current, { at: performance.now(), up: true });
      gsap.set(s, { display: 'flex', yPercent: 100, borderRadius: '50% 50% 0 0 / 18vh 18vh 0 0' });
      gsap.to(s, { yPercent: 0, borderRadius: '0% 0% 0 0 / 0vh 0vh 0 0', duration: 0.55, ease: 'expo.inOut' });
      st.current.timers.push(window.setTimeout(() => s.classList.add('is-waiting'), WAITING_AFTER));
      st.current.timers.push(window.setTimeout(lift, SAFETY));
    };
    const prefetch = (e) => {
      const a = e.target.closest?.('a[href^="/"]');
      if (a && !a.hash && !a.pathname.startsWith('/downloads/')) router.prefetch(a.pathname);
    };
    document.addEventListener('click', onClick, true);
    document.addEventListener('pointerenter', prefetch, true);
    document.addEventListener('focusin', prefetch, true);
    document.addEventListener('touchstart', prefetch, { capture: true, passive: true });
    return () => {
      clearTimers();
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('pointerenter', prefetch, true);
      document.removeEventListener('focusin', prefetch, true);
      document.removeEventListener('touchstart', prefetch, true);
    };
  }, [router]);

  useEffect(() => {
    if (prev.current === path) return;
    prev.current = path;
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    lift();
    if (location.hash) setTimeout(() => document.querySelector(location.hash)?.scrollIntoView(), 450);
  }, [path]);

  return (
    <div ref={sheet} className="sheet" aria-hidden="true">
      <span className="sheet__label">{label}</span>
      <span className="sheet__track">
        <span className="sheet__bead" />
      </span>
    </div>
  );
}
