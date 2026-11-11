'use client';
// Turn: a pinned chapter. Scrolling narrows the candidates: every definition in the pre-patch source →
// 320 lexical candidates → 20 after rank fusion → 1 choice. The counts are the protocol's; the dot
// positions are a diagram, not real ranks.
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger, reduced } from '../../motion/gsap';

const COLS = 20;
const ROWS_N = 16; // 320 dots
const FIELD = 300; // faint dots standing for the rest of the inventory (diagrammatic)

// deterministic pseudo-random so server and client agree
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
const r = rng(42);
const POOL = Array.from({ length: COLS * ROWS_N }, (_, k) => ({ x: k % COLS, y: Math.floor(k / COLS) }));
const SHORT = new Set();
while (SHORT.size < 20) SHORT.add(Math.floor(r() * POOL.length));
const ONE = [...SHORT][7];
const OUTER = Array.from({ length: FIELD }, () => ({ x: r() * 34 - 7, y: r() * 26 - 5 }));

const STAGES = [
  {
    n: 'All',
    title: 'Every class and function',
    body: 'Pre-patch Python source becomes an AST inventory of module, class and function definitions.',
  },
  {
    n: '320',
    title: 'Lexical pool',
    body: 'Fielded lexical retrieval weights names and paths by two and bodies by one. Only the first 320 are embedded.',
  },
  {
    n: '20',
    title: 'Shared shortlist',
    body: 'CodeRankEmbed ranks join lexical ranks by equal-channel reciprocal-rank fusion. Every method sees these 20.',
  },
  {
    n: '1',
    title: 'One choice',
    body: 'V20, T20, T5 and Dense1 differ only in how they pick from the same 20. The task is choosing the existing definition, not writing a patch.',
  },
];

export default function Funnel() {
  const el = useRef(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduced()) {
      setStage(3);
      return;
    }
    const st = ScrollTrigger.create({
      trigger: el.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (s) => {
        const p = s.progress;
        setStage(p < 0.2 ? 0 : p < 0.45 ? 1 : p < 0.7 ? 2 : 3);
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={el} className="ch funnel bleed" data-stage={stage} style={{ height: '320svh' }}>
      <div className="ch__stick">
        <div className="funnel__grid">
          <div className="funnel__copy">
            <h2 className="display">
              From a whole repository <em>to one definition.</em>
            </h2>
            <div className="funnel__num" aria-hidden="true">
              <span className="funnel__col" style={{ transform: `translateY(${-stage * 25}%)` }}>
                {STAGES.map((s) => (
                  <span key={s.n}>{s.n}</span>
                ))}
              </span>
            </div>
            <ol className="funnel__steps">
              {STAGES.map((s, i) => (
                <li key={s.n} className={i === stage ? 'is-on' : i < stage ? 'is-past' : ''}>
                  <span className="funnel__t">{s.title}</span>
                  <span className="funnel__b">{s.body}</span>
                </li>
              ))}
            </ol>
          </div>
          <svg className="funnel__dots" viewBox="-8 -6 36 28" aria-hidden="true">
            <g className="g-outer">
              {OUTER.map((d, k) => (
                <circle key={k} cx={d.x.toFixed(2)} cy={d.y.toFixed(2)} r=".16" />
              ))}
            </g>
            <g className="g-pool">
              {POOL.map((d, k) =>
                SHORT.has(k) ? null : <circle key={k} cx={d.x} cy={d.y} r=".22" />,
              )}
            </g>
            <g className="g-short">
              {[...SHORT].map((k) =>
                k === ONE ? null : <circle key={k} cx={POOL[k].x} cy={POOL[k].y} r=".26" />,
              )}
            </g>
            <g className="g-one">
              <circle cx={POOL[ONE].x} cy={POOL[ONE].y} r=".34" />
              <circle className="g-one__ring" cx={POOL[ONE].x} cy={POOL[ONE].y} r="1.2" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
