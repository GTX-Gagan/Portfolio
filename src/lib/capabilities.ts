import { useEffect, useState } from 'react';

function query(q: string) {
  return typeof window !== 'undefined' && window.matchMedia(q).matches;
}

export function useMediaQuery(q: string) {
  const [match, setMatch] = useState(() => query(q));
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return match;
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** Desktop with a mouse/trackpad — where cursor effects make sense. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function isLowPower() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return true;
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4) return true;
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency < 4) return true;
  return false;
}

/**
 * Whether to run the WebGL hero scene: needs WebGL, a fine pointer, a wide
 * enough screen, motion allowed and a device that isn't obviously low-powered.
 */
export function useRich3D() {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const wide = useMediaQuery('(min-width: 900px)');
  const [capable, setCapable] = useState(false);
  useEffect(() => setCapable(hasWebGL() && !isLowPower()), []);
  return capable && fine && wide && !reduced;
}

/** Enables interactive cursor/tilt/magnetic effects. */
export function useInteractive() {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  return fine && !reduced;
}
