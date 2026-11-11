'use client';
// Hook: the protagonist is the single digit Gemma returns. The card on the right performs the method:
// it steps through the 20 recorded calls of one real evaluation task, one candidate at a time.
import { useEffect, useRef, useState } from 'react';
import { gsap, SplitText, reduced } from '../../motion/gsap';
import { afterIntro } from '../../motion/introGate';
import { ArrowRight } from '../Icons';
import { REPO_URL, REPO_LABEL } from '../../lib/links';
import { ROWS, TASK, RUBRIC, splitSymbol, pad2 } from './shared';

const STEP_MS = 1900;

function CallCard() {
  const [i, setI] = useState(1); // start on the call that wins (rank 2, digit 3)
  const [running, setRunning] = useState(false);
  const card = useRef(null);

  useEffect(() => {
    if (reduced()) return;
    const el = card.current;
    let visible = false;
    let hovered = false;
    let timer;
    const sync = () => setRunning(visible && !hovered && !document.hidden);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(el);
    const enter = () => {
      hovered = true;
      sync();
    };
    const leave = () => {
      hovered = false;
      sync();
    };
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', sync);
    const off = afterIntro(() => {
      timer = setTimeout(sync, 400);
    });
    return () => {
      clearTimeout(timer);
      off();
      io.disconnect();
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setI((n) => (n + 1) % ROWS.length), STEP_MS);
    return () => clearTimeout(t);
  }, [running, i]);

  const r = ROWS[i];
  const { head, tail } = splitSymbol(r.symbol);

  return (
    <figure ref={card} className="callcard" data-reveal-hero>
      <div className="callcard__top">
        <span>
          Call <b>{pad2(r.rank)}</b> of 20
        </span>
        <span>{r.promptTokens} prompt tokens</span>
      </div>
      <div className="callcard__body" key={i}>
        <p className="callcard__head">{head}.</p>
        <p className="callcard__tail">{tail}</p>
        <div className="callcard__digit">
          <span className={'digit d' + r.score}>{r.score}</span>
          <p className="callcard__rubric">{RUBRIC[r.score]}</p>
        </div>
      </div>
      <div className="callcard__meta">
        <span>{r.seconds.toFixed(2)} s</span>
        <span>{r.rssMiB.toLocaleString('en-US')} MiB peak</span>
        <span>out {r.outputSha}…</span>
      </div>
      <span className={'callcard__timer' + (running ? ' is-running' : '')} key={'t' + i} style={{ '--ms': STEP_MS + 'ms' }} />
      <div className="callcard__tape" aria-label="All 20 recorded digits for this task">
        {ROWS.map((row, n) => (
          <button
            key={row.rank}
            type="button"
            className={'tape' + (n === i ? ' is-on' : '') + ' d' + row.score}
            onClick={() => setI(n)}
            aria-label={`Call ${row.rank}: digit ${row.score}`}
          >
            {row.score}
          </button>
        ))}
      </div>
      <figcaption>
        Recorded V20 calls for evaluation task <code>{TASK}</code>, from the captured test records.
      </figcaption>
    </figure>
  );
}

export default function Hero() {
  const root = useRef(null);

  // the scroll cue leaves once the visitor has scrolled a quarter screen
  useEffect(() => {
    const cue = root.current?.querySelector('.scroll-cue');
    if (!cue) return;
    const on = () => cue.classList.toggle('is-gone', window.scrollY > window.innerHeight * 0.25);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (reduced()) {
      el.classList.add('is-ready');
      return;
    }
    let split;
    const ctx = gsap.context(() => {
      split = SplitText.create(el.querySelectorAll('.hero__line'), { type: 'words,chars', mask: 'chars' });
      split.masks.forEach((m) => Object.assign(m.style, { padding: '0 .12em .16em', margin: '0 -.12em -.16em' }));
      gsap.set(split.chars, { yPercent: 160 });
      gsap.set(el.querySelectorAll('[data-reveal-hero]'), { opacity: 0, y: 24, filter: 'blur(8px)' });
      el.classList.add('is-ready');
    }, el);
    const off = afterIntro(() => {
      ctx.add(() => {
        gsap.to(split.chars, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.022 });
        gsap.to(el.querySelectorAll('[data-reveal-hero]'), {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.09,
          delay: 0.35,
          clearProps: 'filter',
        });
      });
    });
    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="hero bleed">
      <div className="hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__line">One candidate.</span>
            <span className="hero__line">
              <em>One digit.</em>
            </span>
          </h1>
          <p className="hero__paper" data-reveal-hero>
            Focused candidate verification for CPU-only software issue localization
          </p>
          <p className="hero__lede" data-reveal-hero>
            A small Gemma model reads each of twenty shortlisted definitions on its own and answers with a single
            digit. On 60 SWE-bench issues, that found the exact definition 15 times; four fixed tournaments over the
            same candidates found it 10 times.
          </p>
          <div className="hero__actions" data-reveal-hero>
            <a className="btn btn--ink" href="/method/">
              Read the method <ArrowRight />
            </a>
            <a className="btn" href="/results/">
              See the results
            </a>
            <a className="btn btn--quiet" href="/evidence/">
              Run the evidence check
            </a>
          </div>
          <p className="hero__by" data-reveal-hero>
            Vignesh B S &middot; 11 November 2026 &middot;{' '}
            <a href="https://www.kaggle.com/competitions/gemma-4-developer-agent-paper">Kaggle Gemma 4 Developer Agent Paper</a>
            <br />
            Source and evidence: <a href={REPO_URL}>{REPO_LABEL}</a>
          </p>
        </div>
        <CallCard />
      </div>
      <div className="scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
