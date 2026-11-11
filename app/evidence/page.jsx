import GzipDownload from '../../components/GzipDownload';

export const metadata = { title: 'Evidence and verification - Focused candidate verification' };

export default function Evidence() {
  return (
    <>
      <h1>Captured test evidence, checkable offline</h1>
      <p className="lede narrow">
        The submission includes an evidence package: the actual experiment source code, captured numeric model
        outputs, task receipts, frozen rankings and an offline checker that re-verifies the package with Python&rsquo;s
        standard library alone &mdash; no model, no network, no benchmark execution.
      </p>

      <h2>What the package contains</h2>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Material</th><th className="num">Included records</th></tr>
          </thead>
          <tbody>
            <tr><td>Original experiment source files (plus one evidence checker)</td><td className="num">41 Python files</td></tr>
            <tr><td>Current-study resource-development model outputs</td><td className="num">480</td></tr>
            <tr><td>Current-study evaluation model outputs</td><td className="num">786</td></tr>
            <tr><td>Current-study completed evaluation task receipts</td><td className="num">19</td></tr>
            <tr><td>Current-study frozen candidate rankings</td><td className="num">72 tasks</td></tr>
            <tr><td>Earlier-study resource-development outputs</td><td className="num">192</td></tr>
            <tr><td>Earlier-study evaluation outputs</td><td className="num">960</td></tr>
            <tr><td>Earlier-study completed evaluation receipts and derived labels</td><td className="num">60 tasks</td></tr>
          </tbody>
        </table>
      </div>
      <p className="narrow" style={{ marginTop: 14 }}>
        Each captured output records candidate identifiers, the response digit, prompt SHA256 and token count, and
        measured generation time and peak RSS &mdash; not raw input prompts. Task receipts record call hashes and
        decisions stage by stage. The captured current-study records support call parsing, resource checks and
        decision replay for 19 completed evaluation tasks; the offline check does not reproduce the paper&rsquo;s
        complete 60-task result, whose final values survive as the reported aggregates on the{' '}
        <a href="/results/">Results</a> page. The earlier experiment is a separate completed comparison
        (structural rescue 14/60 versus semantic control 16/60), and the two cohorts are kept separate throughout.
      </p>

      <h2>Optional: re-check the packaged records</h2>
      <p className="narrow">
        Reviewers who want to go further can re-verify the internal consistency of the packaged records with a small
        helper written for that purpose on 11 November 2026. It is reviewer tooling, not part of the experiment.
        Download <code>Implementation-Source.json</code>, <code>Captured-Test-Records.json</code> and{' '}
        <code>Verify-Submission.py</code> from the table below into the same folder, then with Python 3.10 or newer:
      </p>
      <pre className="codeblock"><code>python Verify-Submission.py</code></pre>
      <p className="narrow">
        The entry point restores the included logical directory layout in a temporary folder and runs only the
        supplied offline checker &mdash; no original inference script, model, benchmark repository or network request.
        Its actual output is quoted below. Alternatively, with
        the complete archive <code>gemma-submission-code-20261111.zip</code>, extract it entirely and run{' '}
        <code>python verify_evidence.py</code> from its folder; both routes perform the same checks. The checker uses
        only the standard library and performs no downloads, model loading, inference, training, API calls or
        benchmark execution. It checks:
      </p>
      <ol className="steps">
        <li><span className="st">Package integrity</span>SHA256 of all 5,210 package files against the manifest, plus output and receipt hashes.</li>
        <li><span className="st">Captured resource records</span>Prompt-token counts, peak RSS, elapsed time and governor statuses for preserved calls.</li>
        <li><span className="st">Decision replay</span>Numeric response parsing, pointwise ranking and tournament voting for the captured current-study completed receipts (12 development, 19 evaluation).</li>
        <li><span className="st">Earlier-study recomputation</span>Exact-success counts from captured final choices and derived labels: plain tournament 11, semantic 16, structural 14, fielded single 12.</li>
      </ol>

      <div className="card" style={{ marginTop: 20 }}>
        <h3 style={{ marginTop: 0 }}>Actual result of this optional check</h3>
        <p className="small" style={{ marginBottom: 10 }}>
          Run on the packaged files during preparation, 11 November 2026; also stored as{' '}
          <code>Verification-Results.json</code>. A passing result means the packaged records are internally
          consistent; the study&rsquo;s measurements themselves are on the <a href="/results/">Results</a> page.
        </p>
        <pre className="codeblock"><code>{`{
  "pass": true,
  "package_files_hashed": 5210,
  "current_study_captured_outputs": { "development": 480, "evaluation": 786 },
  "current_study_completed_receipts_replayed": { "development": 12, "evaluation": 19 },
  "earlier_study_outputs": { "development": 192, "evaluation": 960 },
  "earlier_study_receipts_checked": { "development": 12, "evaluation": 60 },
  "earlier_study_exact_scores_recomputed": {
    "A_plain_tournament": 11, "B_semantic_tournament": 16,
    "C_structural_tournament": 14, "D_fielded_single": 12
  },
  "verification_scope": [
    "Captured-record integrity and decision replay; no inference rerun.",
    "Earlier-study scores recomputed from captured labels, not source/patch rebinding.",
    "This check does not reproduce the complete current-study paper result."
  ]
}`}</code></pre>
      </div>

      <h2>Provenance and integrity</h2>
      <p className="narrow">
        <code>MANIFEST.json</code> and <code>PROVENANCE.json</code> carry per-file hashes and provenance
        distinctions for the whole package. The archive itself is <code>gemma-submission-code-20261111.zip</code>,
        9,336,343 bytes, SHA256:
      </p>
      <pre className="codeblock"><code>1728af283e89c7c3a4274f832aa2dc8d8f2cce575e67860ec9bea536dc05b446</code></pre>
      <p className="narrow">
        Hashes establish consistency with the manifest &mdash; not authorship or independent timestamp authenticity.
        The checker accepts captured labels rather than rebinding them from upstream patches, and it establishes that
        the included records are internally consistent; it does not establish that omitted records are present.
      </p>

      <h2>Scope of the evidence</h2>
      <p className="narrow">
        This package preserves the implementation and the captured records listed above. The current study&rsquo;s
        final 15/60 result and its uncertainty interval are reported aggregates, and the later CodeSage comparison is
        reported in the paper; their complete task-level records are not part of this package, and the checker does
        not independently reproduce those final values. No new model was trained, and the package contains no model
        weights, runtime wheels, raw issue text, patches, repository source trees or full prompts; upstream artifacts
        keep their own terms. The original source files are inspectable snapshots with their original path
        assumptions, not a freshly built portable distribution &mdash; the inference prerequisites for an end-to-end
        rerun are listed under <a href="/models/">Models &amp; Data</a>.
      </p>

      <h2>Download the evidence</h2>
      <p className="narrow">
        The evidence ships as individually named files &mdash; ordinary files, not a ZIP &mdash; so every part can be
        inspected directly. The first three are the project evidence; the two after them are the optional reviewer
        tooling described above.
      </p>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>File</th><th>What it is</th><th className="num">Size</th><th></th></tr>
          </thead>
          <tbody>
            <tr><td><code>Implementation-Source.json</code></td><td>All 42 Python source files, indexed by original relative path; each value preserves the exact source text. An inspectable source collection, not one merged program.</td><td className="num">181 KB</td><td><a href="/downloads/Implementation-Source.json" download>Download</a></td></tr>
            <tr><td><code>Captured-Test-Records.json</code></td><td>Captured outputs, receipts, rankings, model pins, derived labels, metadata and manifests; each value preserves one original UTF-8 record, losslessly. Transferred compressed and restored to the exact original file in your browser.</td><td className="num">37.5 MB</td><td><GzipDownload /></td></tr>
            <tr><td><code>Model-Setup.md</code></td><td>Model versions, exact hashes, inference settings, data provenance and inference setup requirements.</td><td className="num">5 KB</td><td><a href="/downloads/Model-Setup.md" download>Download</a></td></tr>
            <tr><td><code>Verify-Submission.py</code></td><td>Optional reviewer tooling: offline consistency-check entry point. Beside the two JSON collections, run <code>python Verify-Submission.py</code> (Python 3.10+); it restores the logical layout in a temporary folder and runs only the supplied offline checker.</td><td className="num">2 KB</td><td><a href="/downloads/Verify-Submission.py" download>Download</a></td></tr>
            <tr><td><code>Verification-Results.json</code></td><td>Optional reviewer tooling: actual output of the consistency check run on these files.</td><td className="num">1 KB</td><td><a href="/downloads/Verification-Results.json" download>Download</a></td></tr>
          </tbody>
        </table>
      </div>
      <p className="narrow" style={{ marginTop: 14 }}>
        These submission files are available to download individually above. For anyone who wants the original folder
        layout in one download, the complete archive <code>gemma-submission-code-20261111.zip</code> (SHA256 above)
        packages the same evidence. Project repository:{' '}
        <a href="https://github.com/vigneshbs33/gemma-focused-verification">github.com/vigneshbs33/gemma-focused-verification</a>{' '}
       . Nothing in the package phones home.
      </p>
    </>
  );
}
