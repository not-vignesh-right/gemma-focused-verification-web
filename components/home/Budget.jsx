// Tension: the prompt ceiling is small. A tournament splits it five ways; V20 gives it to one candidate.
// Starting allowances from the frozen protocol; both shrink by eight tokens at a time to fit 960.
const CEIL = 960;
const pct = (n) => `${(n / CEIL) * 100}%`;

function Strip({ label, calls, segs }) {
  return (
    <div className="strip">
      <div className="strip__label">
        <span className="strip__name">{label}</span>
        <span className="strip__calls">{calls}</span>
      </div>
      <div className="strip__bar">
        <span className="seg seg--issue" style={{ width: pct(256), '--i': 0 }}>
          <span>issue 256</span>
        </span>
        {segs.map((s, i) => (
          <span key={i} className={'seg ' + s.cls} style={{ width: pct(s.n), '--i': i + 1 }}>
            <span>{s.text}</span>
          </span>
        ))}
        <span className="strip__ceiling" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function Budget() {
  return (
    <section className="chapter budget">
      <div className="chapter__head" data-reveal>
        <h2 className="display">
          A small model reads very little. <em>Where should the reading go?</em>
        </h2>
        <p className="chapter__lede">
          Every call to the pinned Gemma 4 E2B fits inside a 960-token raw prompt. A tournament shares that page among
          five candidates. V20 spends it on one.
        </p>
      </div>
      <div className="strips" data-reveal>
        <Strip
          label="T20 · one tournament call"
          calls="5 candidates, 128 source tokens each"
          segs={[1, 2, 3, 4, 5].map((n) => ({ n: 128, cls: 'seg--cand', text: `c${n}` }))}
        />
        <Strip
          label="V20 · one verification call"
          calls="1 candidate, up to 640 source tokens"
          segs={[{ n: 640, cls: 'seg--focus', text: 'one candidate · 640' }]}
        />
        <div className="strips__axis" aria-hidden="true">
          <span>0</span>
          <span>960-token ceiling</span>
        </div>
      </div>
      <p className="footnote" data-reveal>
        Starting allowances. The shared issue text begins at 256 tokens; both procedures shrink their source allowance by
        eight tokens until the prompt fits. Equal call counts are not equal token exposure: this compares whole
        procedures, not excerpt length alone.
      </p>
    </section>
  );
}
