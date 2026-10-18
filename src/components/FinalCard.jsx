/**
 * The last card of a path: big icon, thank-you title, a short paragraph
 * and a signature line.
 */
function FinalCard({ icon, kicker, title, paragraph, signature, beating = false, children }) {
  return (
    <div className="rp-rise relative w-full max-w-lg overflow-hidden rounded-md bg-white px-6 pb-9 pt-11 text-center shadow-[0_30px_80px_-20px_rgba(190,40,100,0.45)] ring-1 ring-white/70 sm:px-12">
      <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-rose-100/80 blur-3xl" />

      <div className="relative mx-auto h-20 w-20">
        <span className="rp-pulse absolute inset-0 rounded-full bg-rose-300/60 blur-xl" />
        <div
          className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-rose-400 to-pink-500 text-white shadow-lg ring-4 ring-white ${
            beating ? "rp-heartbeat" : ""
          }`}
        >
          {icon}
        </div>
      </div>

      {kicker && (
        <p className="rp-serif relative mt-6 text-base font-semibold italic tracking-wide text-rose-400">
          {kicker}
        </p>
      )}

      <h1 className="rp-bebas relative mt-1 text-4xl font-normal leading-tight tracking-[0.12em] text-rose-950 sm:text-5xl">
        {title}
      </h1>

      <div className="relative mx-auto mt-3 flex w-32 items-center gap-3 text-rose-400">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-rose-300" />
        <span className="h-1.5 w-1.5 rotate-45 bg-rose-300" />
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-rose-300" />
      </div>

      <p className="relative mt-5 text-[15px] leading-relaxed text-rose-950/75">
        {paragraph}
      </p>

      <p className="rp-serif relative mt-6 text-2xl font-semibold italic text-rose-700">
        {signature}
      </p>

      {children}
    </div>
  );
}

export default FinalCard;
