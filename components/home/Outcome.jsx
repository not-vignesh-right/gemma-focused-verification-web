import { ResultBars } from '../Charts';

// Results, drawn honestly. The 60 cells are derived from the reported counts (V20 15, T20 10,
// 7 V20-only wins, 2 T20-only wins), sorted by outcome rather than task order.
const BOTH = 8; // 15 - 7
const V_ONLY = 7;
const T_ONLY = 2;
const NEITHER = 60 - BOTH - V_ONLY - T_ONLY; // 43
const CELLS = [
  ...Array(BOTH).fill('both'),
  ...Array(V_ONLY).fill('v'),
  ...Array(T_ONLY).fill('t'),
  ...Array(NEITHER).fill('none'),
];

// interval axis in percentage points
const LO = -5;
const HI = 20;
const X = (v) => ((v - LO) / (HI - LO)) * 100;

function Interval({ label, lo, hi, point }) {
  return (
    <div className="ivrow">
      <span className="ivrow__label">{label}</span>
      <div className="ivrow__track">
        <span className="ivrow__span" style={{ left: X(lo) + '%', width: X(hi) - X(lo) + '%' }} />
        <span className="ivrow__pt" style={{ left: X(point) + '%' }} />
        <span className="ivrow__lo" style={{ left: X(lo) + '%' }}>
          {lo > 0 ? '+' : lo < 0 ? '−' : ''}
          {Math.abs(lo).toFixed(2)}
        </span>
        <span className="ivrow__hi" style={{ left: X(hi) + '%' }}>
          +{hi.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default function Outcome() {
  return (
    <section className="chapter outcome">
      <div className="chapter__head" data-reveal>
        <h2 className="display">
          Fifteen against ten. <em>Not yet a verdict.</em>
        </h2>
        <p className="chapter__lede">
          Exact existing-definition localization on all 60 evaluation tasks. Dense1 reaches 12 with no Gemma selection
          calls at all, so this cannot claim broad baseline dominance.
        </p>
      </div>

      <div className="outcome__grid">
        <div className="panel" data-reveal>
          <ResultBars
            max={60}
            unit="/60"
            items={[
              { name: 'V20', value: 15, win: true, label: '15/60' },
              { name: 'Dense1', value: 12, label: '12/60' },
              { name: 'T5', value: 11, label: '11/60' },
              { name: 'T20', value: 10, label: '10/60' },
            ]}
          />
        </div>

        <div className="panel" data-reveal>
          <div className="grid60" role="img" aria-label="60 tasks: 8 found by both, 7 by V20 only, 2 by T20 only, 43 by neither">
            {CELLS.map((c, i) => (
              <span key={i} className={'cell cell--' + c} style={{ '--i': i }} />
            ))}
          </div>
          <ul className="legend">
            <li>
              <span className="cell cell--both" /> both <b>{BOTH}</b>
            </li>
            <li>
              <span className="cell cell--v" /> V20 only <b>{V_ONLY}</b>
            </li>
            <li>
              <span className="cell cell--t" /> T20 only <b>{T_ONLY}</b>
            </li>
            <li>
              <span className="cell cell--none" /> neither <b>{NEITHER}</b>
            </li>
          </ul>
          <p className="footnote">Paired V20 &minus; T20 outcomes, grouped by outcome rather than task order.</p>
        </div>
      </div>

      <div className="interval" data-reveal>
        <div className="interval__head">
          <p className="interval__big">
            +8.33 <span>points observed, V20 &minus; T20</span>
          </p>
          <p className="interval__say">
            The task interval crosses zero and the repository-cluster interval touches it. The gain is observed, not
            established; it motivates further testing of focused inspection.
          </p>
        </div>
        <div className="interval__plot">
          <div className="interval__axis" aria-hidden="true">
            {[-5, 0, 5, 10, 15, 20].map((t) => (
              <span key={t} className={'tick' + (t === 0 ? ' tick--zero' : '')} style={{ left: X(t) + '%' }}>
                <i>{t > 0 ? '+' + t : t < 0 ? '−' + Math.abs(t) : '0'}</i>
              </span>
            ))}
          </div>
          <Interval label="Paired task bootstrap, 95%" lo={-1.67} hi={18.33} point={8.33} />
          <Interval label="Ten-repository cluster, 95%" lo={0} hi={16.67} point={8.33} />
        </div>
        <p className="footnote">10,000-draw paired bootstraps, seeds 42 and 43. Descriptive intervals over a selected public-benchmark sample.</p>
      </div>
    </section>
  );
}
