// The closing line of the ledger: a double rule, as when the books are closed.
import { REPO_URL, REPO_LABEL } from '../lib/links';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="closing">
          <span className="closing__rule" aria-hidden="true" />
          <p className="closing__line">
            Closed <em>11 November 2026.</em>
          </p>
        </div>
        <div className="footer-cols">
          <p>
            Vignesh B S &middot; Prepared for the{' '}
            <a href="https://www.kaggle.com/competitions/gemma-4-developer-agent-paper">
              Kaggle Gemma 4 Developer Agent Paper competition
            </a>
            . Source, captured records and the offline checker:{' '}
            <a href={REPO_URL}>{REPO_LABEL}</a>.
          </p>
          <p>
            Experiment source code is preserved as written; this site makes no new license election on the
            author&rsquo;s behalf. Upstream models and datasets keep their own terms. AI assistance was used to
            prepare code, analyze results and write the paper.
          </p>
          <nav className="footer-links" aria-label="Footer">
            <a href="/method/">Method</a>
            <a href="/results/">Results</a>
            <a href="/code/">Code</a>
            <a href="/evidence/">Evidence</a>
            <a href="/models/">Models &amp; Data</a>
            <a href={REPO_URL}>GitHub repository</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
