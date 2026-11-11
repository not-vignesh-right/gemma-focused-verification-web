'use client';
// The intro: a ledger page is ruled, one cell is drawn, its digit rolls 0 → 3, a red pencil circles it,
// and the page is revealed through the cell. Plays once per session (long), only the exit on repeat
// visits (short), never for reduced motion (none). Decided before paint by introGateScript.
import { useEffect, useRef } from 'react';
import { gsap } from './gsap';
import { lockScroll, revealIntro, finishIntro } from './introGate';

export default function Intro() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    const mode = document.documentElement.dataset.intro;
    if (!el || (mode !== 'long' && mode !== 'short')) return;
    lockScroll('intro');
    const q = (s) => el.querySelectorAll(s);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finishIntro });
      if (mode === 'long') {
        tl.fromTo(q('.intro__rule'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, 0)
          .fromTo(q('.intro__cell'), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }, 0.25)
          .fromTo(q('.intro__col'), { yPercent: 0 }, { yPercent: -75, duration: 1.05, ease: 'steps(3)' }, 0.55)
          .fromTo(q('.intro__ring'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, 1.45)
          .fromTo(q('.intro__capcol'), { yPercent: 0 }, { yPercent: -50, duration: 0.6, ease: 'expo.inOut' }, 1.35)
          .to(el, { '--hole': '150vmax', duration: 1.0, ease: 'expo.inOut' }, 2.35)
          .add(revealIntro, 2.6);
      } else {
        tl.to(el, { '--hole': '150vmax', duration: 0.85, ease: 'expo.inOut' }, 0.05).add(revealIntro, 0.25);
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="intro" aria-hidden="true">
      <div className="intro__rules">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className="intro__rule" />
        ))}
      </div>
      <div className="intro__stage">
        <div className="intro__cell">
          <span className="intro__window">
            <span className="intro__col">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </span>
          </span>
          <svg className="intro__pencil" viewBox="0 0 120 120">
            <path
              className="intro__ring"
              pathLength="1"
              d="M62 14c26 1 46 21 44 47-2 27-24 46-50 44-25-2-43-23-41-48 2-22 18-38 40-42 8-1 18 0 24 4"
            />
          </svg>
        </div>
        <div className="intro__cap">
          <span className="intro__capcol">
            <span>One candidate</span>
            <span>One digit</span>
          </span>
        </div>
      </div>
    </div>
  );
}
