import CodeBrowser from '../../components/CodeBrowser';
import { REPO_URL, REPO_LABEL } from '../../lib/links';

export const metadata = { title: 'Source code - Focused candidate verification' };

export default function Code() {
  return (
    <>
      <h1>The actual implementation</h1>
      <p className="lede narrow">
        41 original Python files from the experiments plus the offline evidence checker, preserved as written and
        browsable here in full. The same files ship in the evidence package with per-file SHA256 hashes in its
        manifest. The same files, with the captured records and the offline checker, are in the public repository{' '}
        <a href={REPO_URL}>{REPO_LABEL}</a>.
      </p>
      <p className="narrow">
        The pipeline in reading order: <code>qualify_new.py</code> selects the cohort;{' '}
        <code>acquire_sources.py</code> fetches pinned pre-patch source; <code>method.py</code> builds the AST
        inventory and bounded candidate pool; <code>embed_chunk.py</code> and <code>finalize_rankings.py</code>{' '}
        produce the frozen 20-candidate shortlist; <code>prepare_packs.py</code> freezes prompts;{' '}
        <code>run_study.py</code> and <code>run_arm.py</code> execute governed Gemma calls and parse responses;{' '}
        <code>gold_bind.py</code> binds patch hunks to definitions; <code>evaluate_verifier.py</code> computes frozen
        results; <code>audit_verifier.py</code> independently re-audits source, labels, decisions and metrics.
      </p>
      <CodeBrowser />
      <p className="small muted" style={{ marginTop: 12 }}>
        The original files are source snapshots with their original directory assumptions and import paths; the
        offline checker <code>verify_evidence.py</code> is the only file written for the evidence package (11 November
        2026) and runs anywhere with Python 3.10+. Inference prerequisites are documented under{' '}
        <a href="/models/">Models &amp; Data</a>.
      </p>
    </>
  );
}
