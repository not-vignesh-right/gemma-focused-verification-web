'use client';
// Lenis smooth scroll on GSAP's ticker: one clock for scrolling, triggers and per-frame code.
// Reduced motion keeps native scrolling; touch keeps native momentum.
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, reduced } from './gsap';
import { isScrollLocked } from './introGate';

export default function SmoothScroll() {
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true, anchors: true });
    window.__lenis = lenis;
    if (isScrollLocked()) lenis.stop();
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return null;
}
