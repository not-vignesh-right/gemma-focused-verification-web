import { ArrowRight } from '../Icons';

// Trust: the evidence package as a ledger with dotted leaders, then the invitation.
const LINES = [
  ['Package files hashed against the manifest', '5,210'],
  ['Current-study model outputs captured', '1,266'],
  ['Completed task receipts replayed', '31'],
  ['Earlier-study outputs captured', '1,152'],
  ['Evaluation decisions rebuilt by the independent audit', '2,400'],
  ['Original Python source files, preserved as written', '41'],
];

export default function Receipts() {
  return (
    <section className="chapter receipts">
      <div className="chapter__head" data-reveal>
        <h2 className="display">
          Every number keeps <em>its receipt.</em>
        </h2>
        <p className="chapter__lede">
          The package ships the experiment source, captured model responses and task receipts, plus an offline checker
          that needs nothing but Python&rsquo;s standard library. No model, network or benchmark run.
        </p>
      </div>

      <dl className="ledger" data-reveal>
        {LINES.map(([k, v]) => (
          <div className="ledger__row" key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
        <div className="ledger__row ledger__row--total">
          <dt>Offline consistency check</dt>
          <dd>pass</dd>
        </div>
      </dl>

      <div className="receipts__notes" data-reveal>
        <p>
          Scoring is strict. Each old patch hunk must uniquely match its context in the pre-patch source; unresolved or
          ambiguous cases score zero rather than being guessed. A separate audit implementation reconstructs every label
          and agrees with the evaluator.
        </p>
        <p>
          An earlier, separate experiment is reported just as plainly: structural rescue scored 14/60 against a semantic
          control&rsquo;s 16/60. That negative result motivated looking at the final selection step.
        </p>
      </div>

      <div className="invite" data-reveal>
        <a className="btn btn--ink btn--lg" href="/evidence/">
          Run the evidence check <ArrowRight />
        </a>
        <a className="btn btn--lg" href="/code/">
          Browse the code
        </a>
        <a className="btn btn--quiet btn--lg" href="/results/">
          Full results and tables
        </a>
      </div>
    </section>
  );
}
