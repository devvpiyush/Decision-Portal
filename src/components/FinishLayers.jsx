// Film grain + soft edge shading for a premium feel
export default function FinishLayers() {
  return (
    <>
      <div className="rp-grain pointer-events-none absolute inset-0" />
      <div className="rp-vignette pointer-events-none absolute inset-0" />
    </>
  );
}
