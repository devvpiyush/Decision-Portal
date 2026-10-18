/**
 * A question card with two choices.
 *
 * Props:
 *  - icon:           a React node (see icons.jsx)
 *  - kicker:         small line above the title
 *  - title:          the big question
 *  - subtitle:       smaller line under the title
 *  - primaryLabel / onPrimary      the main (filled) button
 *  - secondaryLabel / onSecondary  the second (outlined) button
 *  - step, totalSteps:             optional progress dots
 */
function DecisionCard({
  icon,
  kicker,
  title,
  subtitle,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  step,
  totalSteps,
}) {
  return (
    <div className="rp-rise relative w-full max-w-md overflow-hidden rounded-md bg-white px-6 pb-8 pt-10 text-center shadow-[0_30px_80px_-20px_rgba(190,40,100,0.45)] ring-1 ring-white/70 sm:px-10">
      {/* soft pink wash behind the badge */}
      <div className="pointer-events-none absolute -top-16 left-1/2 h-44 w-72 -translate-x-1/2 rounded-full bg-rose-100/80 blur-3xl" />

      {/* icon badge */}
      <div className="relative mx-auto h-16 w-16">
        <span className="rp-pulse absolute inset-0 rounded-full bg-rose-300/60 blur-xl" />
        <div className="rp-pop relative flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-rose-400 to-pink-500 text-white shadow-lg ring-4 ring-white">
          {icon}
        </div>
      </div>

      {kicker && (
        <p className="rp-serif relative mt-5 text-base font-semibold italic tracking-wide text-rose-400">
          {kicker}
        </p>
      )}

      <h1 className="rp-bebas relative mt-1 text-4xl font-normal leading-tight tracking-[0.12em] text-rose-950 sm:text-5xl">
        {title}
      </h1>

      {/* divider */}
      <div className="relative mx-auto mt-3 flex w-32 items-center gap-3 text-rose-400">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-rose-300" />
        <span className="h-1.5 w-1.5 rotate-45 bg-rose-300" />
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-rose-300" />
      </div>

      {subtitle && (
        <p className="relative mt-4 text-sm font-medium leading-relaxed text-rose-900/60">
          {subtitle}
        </p>
      )}

      {/* progress dots */}
      {totalSteps > 1 && (
        <div
          className="relative mt-5 flex justify-center gap-2"
          aria-label={`Step ${step} of ${totalSteps}`}
        >
          {Array.from({ length: totalSteps }, (_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i + 1 === step
                  ? "w-6 bg-rose-400"
                  : i + 1 < step
                    ? "w-1.5 bg-rose-300"
                    : "w-1.5 bg-rose-100"
              }`}
            />
          ))}
        </div>
      )}

      {/* choices */}
      <div className="relative mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onPrimary}
          className="flex-1 cursor-pointer rounded-md bg-linear-to-r from-rose-400 to-pink-500 px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-rose-300/50 transition hover:brightness-105 active:scale-[0.98]"
        >
          {primaryLabel}
        </button>
        <button
          type="button"
          onClick={onSecondary}
          className="flex-1 cursor-pointer rounded-md bg-white px-4 py-3 text-sm font-semibold tracking-wide text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-50 active:scale-[0.98]"
        >
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}

export default DecisionCard;
