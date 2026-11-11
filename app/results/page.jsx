import { ResultBars } from '../../components/Charts';

export const metadata = { title: 'Results - Focused candidate verification' };

export default function Results() {
  return (
    <>
      <h1>Measured results</h1>
      <p className="lede narrow">
        All reported inference, scoring and audits are finished as of 11 November 2026. Every number below is the
        frozen value from the completed study; the evidence package preserves the aggregate records and the captured
        task-level outputs listed under <a href="/evidence/">Evidence &amp; Verification</a>.
      </p>

      <h2>Primary results, 60 evaluation tasks</h2>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Method</th><th className="num">Exact definition</th><th className="num">Function-only</th><th className="num">Coarse module</th></tr>
          </thead>
          <tbody>
            <tr className="hl"><td><strong>V20</strong></td><td className="num">15/60 (25.00%)</td><td className="num">12/60</td><td className="num">33/60</td></tr>
            <tr><td>Dense1</td><td className="num">12/60 (20.00%)</td><td className="num">12/60</td><td className="num">25/60</td></tr>
            <tr><td>T5</td><td className="num">11/60 (18.33%)</td><td className="num">9/60</td><td className="num">34/60</td></tr>
            <tr><td>T20</td><td className="num">10/60 (16.67%)</td><td className="num">8/60</td><td className="num">35/60</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
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

      <h2>Pairwise comparisons with uncertainty</h2>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Comparison</th><th className="num">Delta</th><th className="num">W / L / T</th><th className="num">Task 95% interval</th></tr>
          </thead>
          <tbody>
            <tr className="hl"><td><strong>V20 &minus; T20</strong> (primary)</td><td className="num">+8.33 pp</td><td className="num">7 / 2 / 51</td><td className="num">[&minus;1.67, +18.33]</td></tr>
            <tr><td>V20 &minus; T5</td><td className="num">+6.67 pp</td><td className="num">&mdash;</td><td className="num">[&minus;1.67, +16.67]</td></tr>
            <tr><td>V20 &minus; Dense1</td><td className="num">+5.00 pp</td><td className="num">&mdash;</td><td className="num">[&minus;5.00, +15.00]</td></tr>
            <tr><td>T20 &minus; T5</td><td className="num">&minus;1.67 pp</td><td className="num">&mdash;</td><td className="num">[&minus;10.00, +5.00]</td></tr>
          </tbody>
        </table>
      </div>
      <p className="narrow" style={{ marginTop: 14 }}>
        For the primary comparison, the ten-repository cluster interval is [0.00, +16.67] points. The task interval
        crosses zero and the cluster interval touches zero: <strong>established superiority is not supported</strong>.
        More tournament calls alone did not improve exact performance in this sample, and Dense1 reaches 12/60 without
        any Gemma selection calls, so the primary comparison cannot imply broad baseline dominance or the best
        accuracy-cost tradeoff. Among the 56 tasks without duplicate-symbol ambiguity, exact scores are V20 14, T5 10,
        T20 9 and Dense1 11. V20&rsquo;s lower coarse-module score than T20 shows how endpoint granularity changes the
        story.
      </p>

      <h2>Where the pipeline loses tasks</h2>
      <div className="grid grid-3">
        <div className="card"><div className="stat-num">44/60</div><div className="stat-label">Shared 320-candidate pool contains a strict target</div></div>
        <div className="card"><div className="stat-num">35/60</div><div className="stat-label">Shared 20-candidate shortlist contains a strict target</div></div>
        <div className="card"><div className="stat-num">20 vs 25</div><div className="stat-label">Shortlist-present selection misses: V20 vs T20 (T5: 24)</div></div>
      </div>
      <p className="small muted" style={{ marginTop: 10 }}>
        Retrieval and selection both remain limiting. One T20 call is invalid; V20 has none. All final methods return
        a candidate, and no invalid decision is repaired.
      </p>

      <h2>Resource accounting</h2>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Method</th><th className="num">Calls</th><th className="num">Raw prompt tokens</th><th className="num">Returned-text tokens</th><th className="num">Generation seconds</th><th className="num">Governed process seconds</th></tr>
          </thead>
          <tbody>
            <tr><td>T5</td><td className="num">300</td><td className="num">259,053</td><td className="num">300</td><td className="num">989.3</td><td className="num">1,038.0</td></tr>
            <tr><td>T20</td><td className="num">1,200</td><td className="num">1,036,589</td><td className="num">1,200</td><td className="num">3,593.9</td><td className="num">3,783.4</td></tr>
            <tr className="hl"><td><strong>V20</strong></td><td className="num">1,200</td><td className="num">610,149</td><td className="num">1,200</td><td className="num">2,455.0</td><td className="num">2,644.1</td></tr>
          </tbody>
        </table>
      </div>
      <p className="narrow" style={{ marginTop: 14 }}>
        All 2,400 distinct evaluation calls pass the limits; T5 is contained in T20 and is not added again. Maximum
        governed RSS is 1,503,488 KiB against the 1,536,000 KiB cap, and the maximum prompt length is 960 tokens.
        Relative to T20, V20 uses 41.1% fewer raw prompt tokens and 31.7% lower measured generation time at equal
        call count &mdash; measured generation accounting, not an end-to-end speed, energy or monetary saving.
        Evaluation retrieval logically requires 19,260 query/candidate vector exposures; the combined physical cache
        holds 30,943 vectors, and a three-archive restore reconstructs all of them with all fields exact.
      </p>

      <h2>Later exploratory comparison: CodeSage-small-v2</h2>
      <p className="narrow">
        After the original results were known, a separate CodeSage-small-v2 comparison was frozen on all 60 tasks
        without task replacement, tuning or changing the original study: official Apache-2.0 checkpoint, pinned
        revision <code>4844c2f2</code>, same frozen lexical-320 pool and identical candidate text.
      </p>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Reference</th><th className="num">Exact definition top 1</th><th className="num">Function-only top 1</th></tr>
          </thead>
          <tbody>
            <tr className="hl"><td><strong>V20</strong></td><td className="num">15/60</td><td className="num">12/60</td></tr>
            <tr><td>CodeRank Dense1</td><td className="num">12/60</td><td className="num">12/60</td></tr>
            <tr><td>CodeSage-small-v2</td><td className="num">10/60</td><td className="num">10/60</td></tr>
          </tbody>
        </table>
      </div>
      <p className="narrow" style={{ marginTop: 14 }}>
        V20 versus CodeSage has six wins, one loss and 53 ties: +8.33 points with a descriptive task interval of
        [0.00, +16.67] and repository-cluster interval [+1.67, +15.00]. CodeSage versus CodeRank has two wins, four
        losses and 54 ties; CodeRank remains the stronger dense reference on this sample. Independent scalar float64
        dot products recover every top-one decision across 19,260 vector occurrences. This comparison reuses exposed
        outcomes and is explicitly exploratory.
      </p>

      <div className="callout note">
        <div className="t">Strongest-system comparison remains unresolved</div>
        SweRank+ reports function Acc@10 of 89.78% on SWE-bench Lite and 81.18% on Verified with a large multilingual
        retriever plus a 32B reranker, under a different endpoint (all relevant functions in the top 10, full-repository
        candidates). Those numbers cannot establish a performance gap against this study, and the documented large
        systems do not fit the 1,500&nbsp;MiB memory budget. A separate Apache-2.0 Qwen3-Embedding-0.6B gate stopped at
        1,542,052 KiB, above the cap; no accuracy is assigned to a resource failure. No matched strongest-system
        reproduction or commercial-product comparison has been executed.
      </div>

      <h2>The earlier experiment: a completed negative result</h2>
      <p className="narrow">
        The separate completed structural-rescue experiment (12 development tasks, 192 calls; 60 evaluation tasks,
        960 calls) scored <strong>structural rescue 14/60 versus semantic control 16/60</strong>, task interval
        [&minus;13.33, +5.00] points; the plain tournament scored 11/60 and the fielded single candidate 12/60. Its
        full output records, receipts and derived labels are included in the evidence package, and the offline checker
        recomputes these exact counts from the captured records. The negative result is reported as carefully as the
        positive one.
      </p>

      <h2>Status and next steps</h2>
      <p className="narrow">
        As of 11 November 2026 all reported inference, scoring and audits are finished; no further model experiment is
        running. A fresh cohort, a token-matched ablation, robustness across seeds, strongest-system reproduction and
        repair tests are proposed, not performed. No patch-success or production-benefit experiment has been performed.
      </p>
    </>
  );
}
