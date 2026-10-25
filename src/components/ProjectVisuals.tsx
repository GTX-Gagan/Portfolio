import type { ProjectVisual } from '../data';

/** Compact, decorative previews for each project card (pure SVG/CSS). */
export function ProjectVisualArt({ kind }: { kind: ProjectVisual }) {
  if (kind === 'network') return <NetworkArt />;
  if (kind === 'language') return <LanguageArt />;
  return <ScanArt />;
}

const nodes: [number, number][] = [
  [40, 50], [95, 28], [150, 62], [210, 30], [262, 70],
  [70, 110], [130, 120], [190, 104], [245, 128], [300, 40], [310, 112],
];
const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 2], [6, 7], [7, 3], [7, 8], [4, 8], [3, 9], [9, 4], [8, 10], [4, 10], [1, 6],
];
const flagged = 7;

function NetworkArt() {
  return (
    <svg viewBox="0 0 340 150" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="nodeGlow">
          <stop offset="0%" stopColor="#007BA7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#007BA7" stopOpacity="0" />
        </radialGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={b === flagged || a === flagged ? '#FF2D95' : '#007BA7'}
          strokeOpacity={b === flagged || a === flagged ? 0.55 : 0.32}
          strokeWidth="1"
          strokeDasharray={i % 3 === 0 ? '4 6' : undefined}
          className={i % 3 === 0 ? 'animate-dash' : undefined}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          {i === flagged ? (
            <>
              <circle cx={x} cy={y} r="11" fill="none" stroke="#FF2D95" strokeOpacity="0.5">
                <animate attributeName="r" values="6;14;6" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r="4" fill="#FF2D95" />
            </>
          ) : (
            <>
              <circle cx={x} cy={y} r="8" fill="url(#nodeGlow)" opacity="0.35" />
              <circle cx={x} cy={y} r="2.6" fill={i % 2 ? '#007BA7' : '#FF2D95'} />
            </>
          )}
        </g>
      ))}
      <g fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#6B7080">
        <text x="12" y="142">packets → features → classifier</text>
        <text x="258" y="142" fill="#FF2D95" fillOpacity="0.8">● anomaly</text>
      </g>
    </svg>
  );
}

const fragments = [
  { t: 'ತುಳು', x: '24%', y: '20%', d: 0, size: 'text-[15px] text-fog' },
  { t: '<bos>', x: '58%', y: '8%', d: 1.2, size: 'text-[10px] text-fog-3' },
  { t: 'tokens', x: '60%', y: '64%', d: 0.6, size: 'text-[11px] text-cyan/80' },
  { t: 'attention', x: '27%', y: '72%', d: 1.8, size: 'text-[11px] text-violet-soft' },
  { t: 'fine-tune', x: '44%', y: '84%', d: 2.4, size: 'text-[10px] text-fog-3' },
  { t: 'embed', x: '42%', y: '30%', d: 0.9, size: 'text-[10px] text-fog-3' },
];

function LanguageArt() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg viewBox="0 0 340 150" className="absolute inset-0 h-full w-full">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M 60 ${40 + i * 14} C 140 ${20 + i * 20}, 200 ${130 - i * 16}, 280 ${44 + i * 13}`}
            fill="none"
            stroke={i % 2 ? '#007BA7' : '#FF2D95'}
            strokeOpacity={0.12 + (i % 3) * 0.08}
            strokeWidth="1"
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`a${i}`} x={44} y={34 + i * 18} width="14" height="10" rx="3" fill="#FF2D95" fillOpacity={0.25 + i * 0.1} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`b${i}`} x={282} y={38 + i * 16} width="14" height="9" rx="3" fill="#007BA7" fillOpacity={0.6 - i * 0.1} />
        ))}
      </svg>
      {fragments.map((f) => (
        <span
          key={f.t}
          className={`absolute font-mono ${f.size}`}
          style={{ left: f.x, top: f.y, animation: `drift 6s ease-in-out ${f.d}s infinite` }}
        >
          {f.t}
        </span>
      ))}
    </div>
  );
}

function ScanArt() {
  return (
    <div className="relative flex h-full w-full items-start justify-center px-5 pt-1" aria-hidden>
      <div className="w-full max-w-[290px] overflow-hidden rounded-xl border border-white/10 bg-ink/70">
        <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="ml-2 flex-1 truncate rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[9.5px] text-fog-2">
            https://example.com/<span className="text-violet-soft/80">login-verify</span>?id=…
          </span>
        </div>
        <div className="relative space-y-1.5 px-3 py-2.5">
          {[
            ['url length', 'w-3/4'],
            ['domain tokens', 'w-1/2'],
            ['redirects', 'w-2/3'],
            ['page content', 'w-5/12'],
          ].map(([l, w]) => (
            <div key={l} className="flex items-center gap-2">
              <span className="w-[82px] shrink-0 font-mono text-[9px] text-fog-3">{l}</span>
              <span className="h-1.5 flex-1 rounded-full bg-white/[0.05]">
                <span className={`block h-full rounded-full bg-gradient-to-r from-violet/70 to-cyan/70 ${w}`} />
              </span>
            </div>
          ))}
          <div className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent via-cyan/15 to-transparent" />
        </div>
      </div>
    </div>
  );
}
