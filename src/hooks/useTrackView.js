// External Modules
import { useEffect, useRef } from "react";

// Local Modules
import { track } from "../lib/tracker";

// Records "she opened this screen" once per visit to the screen
// (the ref stops React StrictMode's double-run from logging it twice).
export default function useTrackView(screen) {
  const last = useRef(null);

  useEffect(() => {
    if (!screen || last.current === screen) return;
    last.current = screen;
    track({ type: "view", screen });
  }, [screen]);
}
