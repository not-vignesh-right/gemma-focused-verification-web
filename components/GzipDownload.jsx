'use client';

import { useState } from 'react';

// Downloads Captured-Test-Records.json.gz and restores the exact original
// Captured-Test-Records.json (37,524,773 bytes) in the browser via
// DecompressionStream. Falls back to saving the .gz itself when
// DecompressionStream is unavailable.
export default function GzipDownload() {
  const [busy, setBusy] = useState(false);

  async function onClick(e) {
    if (!('DecompressionStream' in window)) return; // plain .gz download
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch('/downloads/Captured-Test-Records.json.gz');
      if (!res.ok || !res.body) throw new Error('fetch failed');
      const stream = res.body.pipeThrough(new DecompressionStream('gzip'));
      const blob = await new Response(stream).blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Captured-Test-Records.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch {
      window.location.href = '/downloads/Captured-Test-Records.json.gz';
    } finally {
      setBusy(false);
    }
  }

  return (
    <a href="/downloads/Captured-Test-Records.json.gz" onClick={onClick}>
      {busy ? 'Preparing...' : 'Download'}
    </a>
  );
}
