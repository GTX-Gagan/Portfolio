import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { type ReactNode, type PointerEvent, useRef } from 'react';
import { useInteractive, useReducedMotion } from '../lib/capabilities';

const spring = { stiffness: 220, damping: 22, mass: 0.6 };

/** Fades/slides children in when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Pulls its child gently toward the cursor. */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const active = useInteractive();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const onMove = (e: PointerEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}

/** Card that tilts in 3D following the cursor, with a soft moving highlight. */
export function TiltCard({
  children,
  className = '',
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const active = useInteractive();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const glow = useTransform(
    [px, py],
    ([gx, gy]: number[]) =>
      `radial-gradient(420px circle at ${gx * 100}% ${gy * 100}%, rgba(0,123,167,0.14), transparent 45%)`,
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!active) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={active ? { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' } : undefined}
        className={`group relative h-full ${className}`}
      >
        {active && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glow }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  id?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl sm:mb-14">
      <p className="eyebrow mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-violet to-cyan" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-semibold leading-[1.1] sm:text-[2.6rem]">
        {title}
      </h2>
      {lede && <p className="mt-4 text-[15px] leading-relaxed text-fog-2">{lede}</p>}
    </Reveal>
  );
}
