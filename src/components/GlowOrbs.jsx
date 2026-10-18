// Soft blurred colour glows drifting slowly in the background
export default function GlowOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="rp-drift1 absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full bg-white/50 blur-3xl" />
      <div className="rp-drift2 absolute top-1/4 -right-32 h-[38rem] w-[38rem] rounded-full bg-rose-300/55 blur-3xl" />
      <div className="rp-drift3 absolute -bottom-40 left-1/4 h-[40rem] w-[40rem] rounded-full bg-fuchsia-300/40 blur-3xl" />
      <div className="rp-drift2 absolute bottom-1/4 -left-20 h-80 w-80 rounded-full bg-orange-200/55 blur-3xl" />
      <div className="rp-drift1 absolute top-10 right-1/3 h-64 w-64 rounded-full bg-amber-100/70 blur-3xl" />
      <div className="rp-breathe absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-100/50 blur-3xl" />
    </div>
  );
}
