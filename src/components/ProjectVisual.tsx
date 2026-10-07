import type { VisualKind } from "@/data/projects";

type Props = { kind: VisualKind; className?: string };

const AMBER = "#d9a441";
const BONE = "#efede7";
const DIM = "#3a3a42";

export default function ProjectVisual({ kind, className = "" }: Props) {
  return (
    <div
      className={`relative overflow-hidden border border-line bg-[#0a0a0e] ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, #14141a 1px, transparent 1px), linear-gradient(to bottom, #14141a 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <svg
        viewBox="0 0 480 320"
        className="relative h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {kind === "grid" && <GridMark />}
        {kind === "route" && <RouteMark />}
        {kind === "stack" && <StackMark />}
        {kind === "scan" && <ScanMark />}
      </svg>
    </div>
  );
}

function GridMark() {
  const m = 130;
  const s = 74;
  const cells: [number, number, "x" | "o"][] = [
    [0, 0, "x"],
    [1, 0, "o"],
    [2, 1, "x"],
    [0, 2, "o"],
    [1, 1, "x"],
    [2, 2, "o"],
  ];
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line
            x1={m + i * s}
            y1={m - 20}
            x2={m + i * s}
            y2={m + s * 3 - 20}
            stroke={DIM}
            strokeWidth={1.5}
          />
          <line
            x1={m - 20}
            y1={m + i * s - 20}
            x2={m + s * 3 - 20}
            y2={m + i * s - 20}
            stroke={DIM}
            strokeWidth={1.5}
          />
        </g>
      ))}
      {cells.map(([cx, cy, t], i) => {
        const x = m + cx * s + s / 2 - 20;
        const y = m + cy * s + s / 2 - 20;
        const r = 17;
        return t === "x" ? (
          <g key={i} stroke={AMBER} strokeWidth={2.4} strokeLinecap="round">
            <line x1={x - r} y1={y - r} x2={x + r} y2={y + r} />
            <line x1={x + r} y1={y - r} x2={x - r} y2={y + r} />
          </g>
        ) : (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            stroke={BONE}
            strokeWidth={2.4}
            opacity={0.85}
          />
        );
      })}
      <rect x={356} y={44} width={84} height={26} stroke={DIM} strokeWidth={1} />
      <rect x={356} y={44} width={52} height={26} fill={AMBER} opacity={0.18} />
      <text
        x={398}
        y={61}
        fill={AMBER}
        fontSize={11}
        fontFamily="monospace"
        textAnchor="middle"
      >
        00:14
      </text>
      <text
        x={44}
        y={276}
        fill={DIM}
        fontSize={11}
        fontFamily="monospace"
        letterSpacing={2}
      >
        UNDO · SCORE · TIMER
      </text>
    </g>
  );
}

function RouteMark() {
  const nodes: [number, number][] = [
    [64, 90],
    [168, 56],
    [262, 128],
    [136, 196],
    [340, 74],
    [396, 190],
    [258, 244],
  ];
  const links: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [2, 4],
    [2, 6],
    [3, 6],
    [6, 5],
    [4, 5],
  ];
  return (
    <g>
      <path
        d="M40 150 L110 120 L196 168 L268 132 L344 186 L430 150"
        stroke="#16161c"
        strokeWidth={26}
        strokeLinejoin="round"
      />
      <path
        d="M40 150 L110 120 L196 168 L268 132 L344 186 L430 150"
        stroke={DIM}
        strokeWidth={1}
        strokeDasharray="6 7"
      />
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={DIM}
          strokeWidth={1}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <rect
            x={x - 7}
            y={y - 7}
            width={14}
            height={14}
            fill="#0a0a0e"
            stroke={i === 2 || i === 6 ? AMBER : BONE}
            strokeWidth={1.6}
          />
          {(i === 2 || i === 6) && (
            <rect x={x - 3} y={y - 3} width={6} height={6} fill={AMBER} />
          )}
        </g>
      ))}
      <rect
        x={300}
        y={252}
        width={140}
        height={30}
        stroke={AMBER}
        strokeWidth={1}
        opacity={0.7}
      />
      <text
        x={370}
        y={272}
        fill={AMBER}
        fontSize={11}
        fontFamily="monospace"
        textAnchor="middle"
        letterSpacing={1.5}
      >
        ROUTED · AI
      </text>
      <text
        x={44}
        y={56}
        fill={DIM}
        fontSize={11}
        fontFamily="monospace"
        letterSpacing={2}
      >
        CITIZEN → OFFICIAL
      </text>
    </g>
  );
}

function StackMark() {
  const bars = [
    { w: 300, label: "COURSE" },
    { w: 246, label: "NOTES" },
    { w: 196, label: "QUIZ" },
    { w: 150, label: "VIDEO" },
  ];
  return (
    <g>
      {bars.map((b, i) => (
        <g key={b.label}>
          <rect
            x={58}
            y={78 + i * 54}
            width={b.w}
            height={38}
            fill="#101015"
            stroke={i === 0 ? AMBER : DIM}
            strokeWidth={1.2}
          />
          <rect
            x={58}
            y={78 + i * 54}
            width={i === 0 ? 5 : 3}
            height={38}
            fill={i === 0 ? AMBER : "#2a2a32"}
          />
          <text
            x={78}
            y={102 + i * 54}
            fill={i === 0 ? BONE : "#6b6b76"}
            fontSize={12}
            fontFamily="monospace"
            letterSpacing={2}
          >
            {b.label}
          </text>
        </g>
      ))}
      <g stroke={AMBER} strokeWidth={1.4}>
        <line x1={392} y1={96} x2={430} y2={96} />
        <line x1={430} y1={96} x2={422} y2={90} />
        <line x1={430} y1={96} x2={422} y2={102} />
      </g>
      <text
        x={392}
        y={132}
        fill={AMBER}
        fontSize={14}
        fontFamily="monospace"
        letterSpacing={1}
      >
        अ → A
      </text>
      <text
        x={392}
        y={156}
        fill={DIM}
        fontSize={10}
        fontFamily="monospace"
        letterSpacing={1}
      >
        TRANSLATE
      </text>
      <text
        x={58}
        y={296}
        fill={DIM}
        fontSize={11}
        fontFamily="monospace"
        letterSpacing={2}
      >
        FLASK · REST · SQLite
      </text>
    </g>
  );
}

function ScanMark() {
  return (
    <g>
      {[118, 88, 58, 28].map((r, i) => (
        <circle
          key={r}
          cx={196}
          cy={158}
          r={r}
          stroke={i === 1 ? AMBER : DIM}
          strokeWidth={i === 1 ? 1.4 : 1}
          opacity={i === 1 ? 0.9 : 0.65}
        />
      ))}
      <circle cx={196} cy={158} r={5} fill={AMBER} />
      <line x1={196} y1={26} x2={196} y2={62} stroke={DIM} strokeWidth={1} />
      <line x1={196} y1={254} x2={196} y2={290} stroke={DIM} strokeWidth={1} />
      <line x1={64} y1={158} x2={100} y2={158} stroke={DIM} strokeWidth={1} />
      <line x1={292} y1={158} x2={328} y2={158} stroke={DIM} strokeWidth={1} />

      <rect x={158} y={126} width={64} height={56} stroke={AMBER} strokeWidth={1.4} />
      <rect x={158} y={112} width={46} height={13} fill={AMBER} />
      <text
        x={163}
        y={122}
        fill="#0a0a0e"
        fontSize={9}
        fontFamily="monospace"
        letterSpacing={1}
      >
        ROI 01
      </text>

      {[
        { l: "REGION A", v: 0.78 },
        { l: "REGION B", v: 0.52 },
        { l: "REGION C", v: 0.31 },
      ].map((row, i) => (
        <g key={row.l}>
          <text
            x={336}
            y={116 + i * 44}
            fill="#6b6b76"
            fontSize={10}
            fontFamily="monospace"
            letterSpacing={1}
          >
            {row.l}
          </text>
          <rect x={336} y={124 + i * 44} width={104} height={6} fill="#17171d" />
          <rect
            x={336}
            y={124 + i * 44}
            width={104 * row.v}
            height={6}
            fill={AMBER}
            opacity={0.85}
          />
        </g>
      ))}

      <text
        x={58}
        y={296}
        fill={DIM}
        fontSize={11}
        fontFamily="monospace"
        letterSpacing={2}
      >
        PREPROCESS · CLASSIFY · SCORE
      </text>
    </g>
  );
}
