import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInteractive } from '../lib/capabilities';

/** Glowing dot + trailing ring. Desktop with fine pointer only. */
export default function Cursor() {
  const enabled = useInteractive();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-custom-cursor');
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setShown(true);
      const el = e.target as HTMLElement | null;
      setHover(!!el?.closest('a, button, [role="button"], [data-cursor="hover"]'));
    };
    const leave = () => setShown(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]" style={{ opacity: shown ? 1 : 0 }}>
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-cyan/50"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hover ? 44 : 30,
          height: hover ? 44 : 30,
          backgroundColor: hover ? 'rgba(255,45,149,0.08)' : 'rgba(0,123,167,0)',
          borderColor: hover ? 'rgba(255,45,149,0.7)' : 'rgba(0,123,167,0.55)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />
      <motion.div
        className="absolute left-0 top-0 h-[6px] w-[6px] rounded-full bg-cyan"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 12px 2px rgba(255,45,149,0.72)',
        }}
      />
    </div>
  );
}
