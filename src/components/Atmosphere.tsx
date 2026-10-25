import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../lib/capabilities';

export default function Atmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      ref.current?.style.setProperty('--scroll-y', `${window.scrollY * -0.035}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return <div ref={ref} aria-hidden className="ambient-field" />;
}
