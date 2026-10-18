// One petal drawn as SVG (rounded leaf shape with a soft centre line)
export default function PetalShape({ id, palette }) {
  return (
    <svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg" className="block h-full w-full">
      <defs>
        <linearGradient id={`petal-g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.petal} />
          <stop offset="100%" stopColor={palette.edge} />
        </linearGradient>
      </defs>
      <path
        d="M30 5 C44 5 56 19 54 38 C52 54 40 65 30 66 C20 65 8 54 6 38 C4 19 16 5 30 5 Z"
        fill={`url(#petal-g-${id})`}
      />
      <path
        d="M30 14 C30 30 30 46 30 60"
        stroke="#fff"
        strokeOpacity=".45"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
