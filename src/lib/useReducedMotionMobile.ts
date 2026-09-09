"use client";

import { useEffect, useState } from "react";

/* small/touch screens (mostly Android phones) can't keep up with the full
   animated background: dozens of backdrop-blur cards on top of a constantly
   moving, blurred layer causes visible flicker there. Desktop keeps the
   full effect; this only trims it down on the devices that struggle. */
const QUERY = "(max-width: 768px), (pointer: coarse)";

export function useReducedMotionMobile() {
  // starts false to match server-rendered output, then syncs to the real
  // value on mount; unavoidable one-line setState-in-effect for this pattern
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(query.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}
