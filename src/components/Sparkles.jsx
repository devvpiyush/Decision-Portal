import { useMemo } from "react";
import { rand } from "../utils/random";

// Tiny white dots that twinkle at random places
export default function Sparkles({ count = 30 }) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: rand(3, 8),
        left: `${rand(0, 100)}%`,
        top: `${rand(0, 100)}%`,
        delay: `${rand(0, 5).toFixed(2)}s`,
        duration: `${rand(4, 9).toFixed(2)}s`,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="rp-twinkle absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 3}px ${s.size}px rgba(255,255,255,0.65)`,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}
