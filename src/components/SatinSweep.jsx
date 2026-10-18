// A slow band of light that glides across the page like satin
export default function SatinSweep() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="rp-shimmer absolute -top-1/4 left-0 h-[150%] w-1/5 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-2xl" />
    </div>
  );
}
