'use client';
// One place that registers GSAP plugins, browser only. Import gsap from here everywhere.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, SplitText);

export const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger, SplitText };
