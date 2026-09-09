"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a media query.
 *
 * Uses useSyncExternalStore rather than useEffect + setState: matchMedia IS an
 * external store, so this is the API built for it. It also avoids the cascading
 * render that a setState-in-effect causes, and returns the correct value on the
 * very first client render instead of flashing the fallback.
 *
 * Returns false during SSR, where no viewport exists.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
