import { useEffect, useMemo, useRef } from "react";
import { rand, pick } from "../utils/random";
import { PETAL_PALETTES, PETAL_RATIO } from "../constants/petalPalettes";

/**
 * Creates the petals and moves them every frame with natural motion:
 * gentle sway, tilt that follows the sway, flutter, slow spin and fade in/out.
 *
 * Returns:
 *  - petals:   static list to render (id, size, palette)
 *  - petalEls: ref array — attach each rendered petal element to petalEls.current[index]
 */
export default function useFallingPetals() {
  const petalEls = useRef([]);

  // Static, random config (created once)
  const petals = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const total = isMobile ? 12 : 22;

    return Array.from({ length: total }, (_, i) => {
      const depth = Math.random(); // 0 = far (small, slow) → 1 = near (bigger, quicker)
      const w = 7 + depth * 9; // 7 – 16 px
      return {
        id: i,
        depth,
        w,
        h: w * PETAL_RATIO,
        op: 0.6 + depth * 0.4,
        palette: pick(PETAL_PALETTES),
      };
    });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Give a petal fresh random motion values
    const reset = (p, initial) => {
      p.x0 = rand(-0.03, 1.03) * W;
      p.y = initial ? rand(-0.1, 1) * H : -p.h - rand(0, H * 0.3);
      p.vy = 55 + p.depth * 55 + rand(-8, 8); // fall speed (px/s)
      p.amp = rand(14, 38) * (0.6 + p.depth * 0.7); // sway width
      p.freq = rand(0.55, 1.05); // sway speed (rad/s)
      p.phase = rand(0, Math.PI * 2);
      p.windDrift = rand(-10, 10); // slow sideways drift (px/s)
      p.spin = rand(-0.5, 0.5); // slow spin (rad/s)
      p.rot0 = rand(0, Math.PI * 2);
      p.t = 0;
    };

    const state = petals.map((cfg) => {
      const p = { ...cfg };
      reset(p, true);
      return p;
    });

    let last = performance.now();
    let raf;

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05); // clamp after tab switches
      last = now;

      state.forEach((p, i) => {
        const el = petalEls.current[i];
        if (!el) return;

        p.t += dt;
        p.y += p.vy * dt;

        const phase = p.freq * p.t + p.phase;
        const s = Math.sin(phase);
        const c = Math.cos(phase);

        const x = p.x0 + p.windDrift * p.t + p.amp * s;
        const rot = p.rot0 + p.spin * p.t + c * 0.7; // tilt follows sway
        const flutter = 0.65 + 0.35 * Math.abs(Math.cos(p.freq * 0.8 * p.t + p.phase));

        const fadeIn = Math.min(1, Math.max(0, (p.y + p.h) / (H * 0.12)));
        const fadeOut = Math.min(1, Math.max(0, (H - p.y) / (H * 0.12)));

        el.style.opacity = (p.op * Math.min(fadeIn, fadeOut)).toFixed(3);
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) rotate(${rot.toFixed(
          3
        )}rad) scaleX(${flutter.toFixed(3)})`;

        if (p.y > H + 20) reset(p, false);
      });

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [petals]);

  return { petals, petalEls };
}
