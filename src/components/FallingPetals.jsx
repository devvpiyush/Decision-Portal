import useFallingPetals from "../hooks/useFallingPetals";
import PetalShape from "./PetalShape";

// Layer with all the tiny red petals falling (sits above the card)
export default function FallingPetals() {
  const { petals, petalEls } = useFallingPetals();

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {petals.map((p, i) => (
        <div
          key={p.id}
          ref={(el) => (petalEls.current[i] = el)}
          className="rp-petal"
          style={{ width: p.w, height: p.h }}
        >
          <PetalShape id={p.id} palette={p.palette} />
        </div>
      ))}
    </div>
  );
}
