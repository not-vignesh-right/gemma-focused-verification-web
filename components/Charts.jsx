// Horizontal result bars. Fills draw in (scaleX) once an ancestor is revealed (.is-in), staggered by row.
export function ResultBars({ items, max, unit }) {
  return (
    <div className="bars">
      {items.map((i, n) => (
        <div className={'bar-row' + (i.win ? ' is-win' : '')} key={i.name} style={{ '--i': n }}>
          <div className="bar-name">{i.name}</div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: Math.max(3, (i.value / max) * 100) + '%' }} />
          </div>
          <div className="bar-val">{i.label || i.value + unit}</div>
        </div>
      ))}
    </div>
  );
}
