// External Modules
import { useEffect, useRef, useState } from "react";

function Code({
  secret = "NISHTHA",
  caseSensitive = false,
  disabled = false,
  onComplete,
}) {
  const length = secret.length;

  const [digits, setDigits] = useState(Array(length).fill(""));
  const inputs = useRef([]);
  const code = digits.join("");
  const complete = code.length === length;

  const norm = (s) => (caseSensitive ? s : s.toLowerCase());
  const isMatch = (ch, i) => norm(ch) === norm(secret[i]);
  const isCorrect = complete && digits.every(isMatch);

  // Submit automatically when all boxes are filled
  useEffect(() => {
    if (complete) onComplete?.(code, isCorrect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const setAt = (i, value) =>
    setDigits((d) => {
      const next = [...d];
      next[i] = value;
      return next;
    });

  const handleChange = (i, e) => {
    // keep only the last typed character (any character is allowed)
    const v = e.target.value.replace(/\s/g, "").toUpperCase();
    if (!v) return setAt(i, "");
    setAt(i, v.slice(-1));
    if (i < length - 1) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[i]) setAt(i, "");
      else if (i > 0) {
        setAt(i - 1, "");
        inputs.current[i - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      inputs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < length - 1) {
      inputs.current[i + 1]?.focus();
    } else if (e.key === "Enter" && complete) {
      onComplete?.(code, isCorrect);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData
      .getData("text")
      .replace(/\s/g, "")
      .slice(0, length);
    if (!text) return;
    const next = Array(length).fill("");
    text.split("").forEach((ch, k) => (next[k] = ch));
    setDigits(next);
    inputs.current[Math.min(text.length, length - 1)]?.focus();
  };

  // Border / ring colours: empty = rose, correct = green, wrong = red
  const stateClasses = (d, i) => {
    if (!d)
      return "border-rose-100 focus:border-rose-400 focus:ring-4 focus:ring-rose-200/60";
    return isMatch(d, i)
      ? "border-green-500 bg-green-50 focus:ring-4 focus:ring-green-200/70"
      : "border-red-500 bg-red-50 focus:ring-4 focus:ring-red-200/70";
  };

  return (
    <div className="flex justify-center gap-1.5 sm:gap-2" onPaste={handlePaste}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          value={d}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          autoComplete="off"
          spellCheck={false}
          maxLength={1}
          disabled={disabled}
          autoFocus={i === 0}
          aria-label={`Character ${i + 1}`}
          aria-invalid={!!d && !isMatch(d, i)}
          className={`h-9 w-9 rounded-full border bg-white text-center text-lg font-semibold text-rose-950 caret-rose-500 outline-none transition sm:h-11 sm:w-11 sm:text-md ${stateClasses(
            d,
            i,
          )}`}
        />
      ))}
    </div>
  );
}

export default Code;
