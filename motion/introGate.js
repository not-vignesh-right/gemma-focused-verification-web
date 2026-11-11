// Decides the intro before first paint: "long" on a first visit this session, "short" on repeat visits,
// "none" for reduced motion, ?shot= screenshots, or blocked storage. Also adds html.js and a 6s safety
// class that unhides everything if motion never boots.
export const INTRO_KEY = 'fv-intro-seen';

export const introGateScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var q=location.search.indexOf('shot=')>-1;var r=matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.intro=(q||r)?'none':(sessionStorage.getItem('${INTRO_KEY}')?'short':'long')}catch(e){d.dataset.intro='none'}setTimeout(function(){if(!d.classList.contains('motion-ok'))d.classList.add('motion-fallback')},6000)})();`;

/** Run fn once the intro has revealed the page (immediately if it already has or never played). */
export function afterIntro(fn) {
  const d = document.documentElement;
  if (d.dataset.intro === 'none' || d.dataset.intro === 'done') {
    fn();
    return () => {};
  }
  let ran = false;
  const once = () => {
    if (!ran) {
      ran = true;
      fn();
    }
  };
  window.addEventListener('intro:reveal', once, { once: true });
  window.addEventListener('intro:done', once, { once: true });
  return () => {
    window.removeEventListener('intro:reveal', once);
    window.removeEventListener('intro:done', once);
  };
}

export const revealIntro = () => window.dispatchEvent(new Event('intro:reveal'));

export function finishIntro() {
  try {
    sessionStorage.setItem(INTRO_KEY, '1');
  } catch {
    /* private mode */
  }
  document.documentElement.dataset.intro = 'done';
  unlockScroll('intro');
  window.dispatchEvent(new Event('intro:done'));
}

// Scroll lock with owners, so one component releasing its lock cannot undo another's.
const owners = new Set();
const lenis = () => window.__lenis;

export function lockScroll(owner) {
  owners.add(owner);
  document.documentElement.classList.add('is-locked');
  lenis()?.stop();
}
export function unlockScroll(owner) {
  owners.delete(owner);
  if (owners.size) return;
  document.documentElement.classList.remove('is-locked');
  lenis()?.start();
}
export const isScrollLocked = () => owners.size > 0;
