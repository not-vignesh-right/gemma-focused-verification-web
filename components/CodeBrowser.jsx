'use client';
import { useState } from 'react';
import { CODE_FILES } from '../lib/codedata';

const GROUP_ORDER = [
  'Current study - experiment source',
  'Source dependencies',
  'Earlier completed experiment - source',
  'Evidence checker',
];

export default function CodeBrowser() {
  const [active, setActive] = useState(() => CODE_FILES.find((f) => f.path === 'current-study-captured/code/run_study.py') || CODE_FILES[0]);
  const groups = GROUP_ORDER.map((g) => ({ name: g, blurb: (CODE_FILES.find((f) => f.group === g) || {}).groupBlurb, files: CODE_FILES.filter((f) => f.group === g) })).filter((g) => g.files.length);
  return (
    <div className="cb">
      <div className="cb-side">
        {groups.map((g) => (
          <div key={g.name}>
            <div className="cb-group">{g.name} ({g.files.length})</div>
            {g.files.map((f) => (
              <button
                key={f.path}
                className={'cb-file' + (f.path === active.path ? ' active' : '')}
                onClick={() => setActive(f)}
              >
                {f.name}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="cb-main">
        <div className="cb-head">
          <div className="fn">{active.path}</div>
          {active.description && <div className="fd">{active.description}</div>}
          <div className="fm">{active.lines} lines &middot; {active.group === 'Evidence checker' ? 'Added 11 November 2026 for this evidence package' : 'Original experiment source, preserved as written'}</div>
        </div>
        <pre className="cb-code">
          {active.content.split('\n').map((line, i) => (
            <span className="ln" key={i}><span className="no">{i + 1}</span>{line}</span>
          ))}
        </pre>
      </div>
    </div>
  );
}
