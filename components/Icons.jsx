// Hand-drawn hairline glyphs for this site: one stroke weight, round ends, slightly pencil-like.
const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export function ArrowRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 8.2c3.6-.3 7.3-.2 10.6 0" />
      <path d="M9.4 4.6c1.3 1.3 2.5 2.4 3.8 3.6-1.3 1.1-2.5 2.3-3.8 3.6" />
    </svg>
  );
}

export function ArrowDown(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8.1 2.4c-.2 3.4-.1 6.6 0 9.6" />
      <path d="M4.6 8.6c1.2 1.3 2.3 2.5 3.5 3.7 1.2-1.3 2.3-2.4 3.5-3.7" />
      <path d="M3 14.2c3.4.2 6.7.2 10 0" />
    </svg>
  );
}

export function ArrowOut(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12.1c2.6-2.7 5.2-5.3 7.9-8" />
      <path d="M6.2 3.9c1.9-.1 3.9-.1 5.9 0 .1 2 .1 3.9 0 5.9" />
    </svg>
  );
}

/** A loose red-pencil ring, drawn to circle a figure. */
export function PencilRing({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true" focusable="false">
      <path
        pathLength="1"
        d="M62 14c26 1 46 21 44 47-2 27-24 46-50 44-25-2-43-23-41-48 2-22 18-38 40-42 8-1 18 0 24 4"
      />
    </svg>
  );
}
