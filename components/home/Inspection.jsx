'use client';
// Proof by doing: a dark, pinned chapter. As you scroll, a focus band walks down the 20 recorded
// candidates of one real task; each receives its digit when the band reaches it. At the end the
// highest digit wins, ties going to the original rank, and the red pencil circles it.
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger, reduced } from '../../motion/gsap';
import { PencilRing } from '../Icons';
import { ROWS, TASK, RUBRIC, WINNER, splitSymbol, pad2 } from './shared';
import { SAMPLE_TASK } from '../../lib/sampleTask';

const N = ROWS.length;
const TOP_COUNT = ROWS.filter((r) => r.score === WINNER.score).length;

export default function Inspection() {
  const el = useRef(null);
  const [idx, setIdx] = useState(-1);
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    if (reduced()) {
      setIdx(N - 1);
      setDecided(true);
      return;
    }
    const st = ScrollTrigger.create({
      trigger: el.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (s) => {
        const p = s.progress;
        const i = p < 0.06 ? -1 : Math.min(N - 1, Math.floor(((p - 0.06) / 0.74) * N));
        setIdx(i);
        setDecided(p > 0.84);
      },
    });
    return () => st.kill();
  }, []);

  const cur = idx >= 0 ? ROWS[idx] : null;
  const shown = decided ? WINNER : cur;
  const t20 = splitSymbol(SAMPLE_TASK.selectedT20);

  return (
    <section ref={el} className="ch inspect bleed" data-tone="dark" data-decided={decided || undefined} style={{ height: '380svh' }}>
      <div className="ch__stick">
        <div className="inspect__grid">
          <div className="inspect__copy">
            <h2 className="display">
              V20 reads each candidate <em>on its own.</em>
            </h2>
            <p className="chapter__lede">
              Twenty prompts, one definition each, a fixed 0&ndash;3 rubric. Only a single digit is accepted; the highest
              wins and ties follow the original rank.
            </p>
            <div className="inspect__panel" aria-live="polite">
              {shown ? (
                <>
                  <div className="inspect__digit">
                    <span className={'digit d' + shown.score}>{shown.score}</span>
                    {decided && <PencilRing className="ring ring--big" />}
                  </div>
                  <p className="inspect__rubric">{RUBRIC[shown.score]}</p>
                  <dl className="inspect__meta">
                    <div>
                      <dt>call</dt>
                      <dd>{pad2(shown.rank)} / 20</dd>
                    </div>
                    <div>
                      <dt>prompt</dt>
                      <dd>{shown.promptTokens} tok</dd>
                    </div>
                    <div>
                      <dt>time</dt>
                      <dd>{shown.seconds.toFixed(2)} s</dd>
                    </div>
                    <div>
                      <dt>peak</dt>
                      <dd>{shown.rssMiB.toLocaleString('en-US')} MiB</dd>
                    </div>
                  </dl>
                  <p className="inspect__note">
                    {decided ? (
                      <>
                        {TOP_COUNT > 1 ? `${TOP_COUNT} candidates scored ${WINNER.score}; rank ${WINNER.rank} comes first` : `Rank ${WINNER.rank} scored highest`}, so V20 picks{' '}
                        <code>{splitSymbol(WINNER.symbol).tail}</code>. On the same task, T20&rsquo;s four tournaments all
                        voted for <code>{t20.tail}</code>.
                      </>
                    ) : (
                      <>Gemma 4 E2B · LiteRT 0.19.1 · two CPU threads · temperature 0 · governor 1,500 MiB and 90 s.</>
                    )}
                  </p>
                </>
              ) : (
                <p className="inspect__wait">Scroll to run the twenty calls.</p>
              )}
            </div>
          </div>
          <div className="inspect__list" style={{ '--idx': Math.max(idx, 0) }}>
            <span className="inspect__band" data-on={idx >= 0 && !decided ? '' : undefined} aria-hidden="true" />
            {ROWS.map((r, i) => {
              const { head, tail } = splitSymbol(r.symbol);
              const done = i <= idx;
              const win = decided && r.rank === WINNER.rank;
              return (
                <div key={r.rank} className={'irow' + (done ? ' is-done' : '') + (win ? ' is-win' : '') + (i === idx && !decided ? ' is-cur' : '')}>
                  <span className="irow__n">{pad2(r.rank)}</span>
                  <span className="irow__sym" title={r.symbol}>
                    <span className="irow__head">{head}.</span>
                    <span className="irow__tail">{tail}</span>
                  </span>
                  <span className={'irow__d d' + r.score}>{done ? r.score : '·'}</span>
                  {win && <PencilRing className="ring ring--row" />}
                </div>
              );
            })}
          </div>
        </div>
        <p className="inspect__src">
          Recorded calls from evaluation task <code>{TASK}</code>. This shows the procedure, not whether this task
          was scored a success.
        </p>
      </div>
    </section>
  );
}
