// Same 20 calls, less reading: measured generation accounting from the frozen results.
const PAIRS = [
  {
    what: 'Raw prompt tokens',
    v: 610149,
    t: 1036589,
    fmt: (n) => n.toLocaleString('en-US'),
    delta: '41.1% fewer',
  },
  {
    what: 'Measured generation seconds',
    v: 2455.0,
    t: 3593.9,
    fmt: (n) => n.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
    delta: '31.7% lower',
  },
];

export default function Cost() {
  return (
    <section className="chapter cost">
      <div className="chapter__head" data-reveal>
        <h2 className="display">
          The same twenty calls, <em>less reading.</em>
        </h2>
        <p className="chapter__lede">
          1,200 calls each across the 60 tasks. V20 found five more exact definitions than T20 while sending far fewer
          prompt tokens.
        </p>
      </div>
      <div className="cost__rows">
        {PAIRS.map((p) => (
          <div className="pair" key={p.what} data-reveal>
            <div className="pair__head">
              <span className="pair__what">{p.what}</span>
              <span className="pair__delta">{p.delta}</span>
            </div>
            <div className="pair__bar">
              <span className="pair__name">V20</span>
              <span className="pair__track">
                <span className="pair__fill pair__fill--v" style={{ width: (p.v / p.t) * 100 + '%' }} />
              </span>
              <span className="pair__val">{p.fmt(p.v)}</span>
            </div>
            <div className="pair__bar">
              <span className="pair__name">T20</span>
              <span className="pair__track">
                <span className="pair__fill pair__fill--t" style={{ width: '100%' }} />
              </span>
              <span className="pair__val">{p.fmt(p.t)}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="footnote" data-reveal>
        A different selection procedure, not a better underlying model. This is generation accounting, not an end-to-end
        speed, energy or cost claim.
      </p>
    </section>
  );
}
