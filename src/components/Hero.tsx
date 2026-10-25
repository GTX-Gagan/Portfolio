import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDownRight, Download, Sparkles } from 'lucide-react';
import { lazy, Suspense, useEffect } from 'react';
import ResumeLink from './ResumeLink';
import { profile } from '../data';
import { useInteractive, useReducedMotion, useRich3D } from '../lib/capabilities';
import { GithubIcon, LinkedinIcon } from './icons';
import { Magnetic } from './primitives';
import { content } from '../data/content.js';

const HeroScene = lazy(() => import('./three/NeuralScene'));

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const rich3D = useRich3D();
  const interactive = useInteractive();
  const reduced = useReducedMotion();

  // Normalised pointer position (-1..1), smoothed
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [interactive, mx, my]);

  // Parallax depths: background < portrait < badges
  const bgX = useTransform(sx, (v) => v * -10);
  const bgY = useTransform(sy, (v) => v * -10);
  const cardX = useTransform(sx, (v) => v * 10);
  const cardY = useTransform(sy, (v) => v * 8);
  const cardRY = useTransform(sx, (v) => v * 7);
  const cardRX = useTransform(sy, (v) => v * -6);
  const badgeX = useTransform(sx, (v) => v * 22);
  const badgeY = useTransform(sy, (v) => v * 18);
  const lightX = useTransform(sx, (v) => `${62 + v * 12}%`);
  const lightY = useTransform(sy, (v) => `${38 + v * 10}%`);
  const light = useMotionTemplate`radial-gradient(640px circle at ${lightX} ${lightY}, rgba(0,123,167,0.18), transparent 60%)`;

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32">
      {/* Backdrop */}
      <motion.div aria-hidden className="absolute inset-0" style={interactive ? { x: bgX, y: bgY } : undefined}>
        <div className="grid-bg absolute inset-[-40px] [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,#000_30%,transparent_75%)]" />
      </motion.div>
      <motion.div aria-hidden className="absolute inset-0" style={{ background: light }} />
      <div aria-hidden className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-cyan/10 blur-[120px]" />

      {rich3D ? (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      ) : (
        // Static fallback when WebGL / motion is unavailable
        <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[18%] hidden h-[520px] w-[520px] rounded-full border border-violet/15 md:block">
          <div className="absolute inset-12 rounded-full border border-cyan/10" />
          <div className="absolute inset-28 rounded-full border border-violet/10" />
        </div>
      )}

      <div className="container-site relative z-10 grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
        {/* Text column */}
        <div className="max-w-[640px]">
          <motion.div {...enter(0.05)} className="glass mb-7 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-[12px] text-fog-2">
            <span className="pulse-dot h-2 w-2 rounded-full bg-violet" />
            {content.hero.status}
          </motion.div>

          <motion.p {...enter(0.12)} className="mb-4 font-display text-lg text-fog-2">
            {content.hero.greeting} <span className="font-semibold text-fog">{content.hero.name}</span>
          </motion.p>

          <motion.h1
            id="hero-title"
            {...enter(0.2)}
            className="max-w-[760px] text-[2.45rem] font-semibold leading-[1.03] sm:text-6xl lg:text-[4.35rem]"
          >
            {content.hero.headingLead}{' '}
            <span className="text-gradient">{content.hero.headingAccent}</span>
          </motion.h1>

          <motion.p {...enter(0.3)} className="mt-6 font-mono text-[12.5px] leading-relaxed tracking-wide text-cyan/90">
            {profile.role}
          </motion.p>

          <motion.p {...enter(0.36)} className="mt-5 max-w-[560px] text-[16px] leading-[1.75] text-fog-2 sm:text-[17px]">
            {content.hero.description}
          </motion.p>

          <motion.div {...enter(0.44)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#projects" className="btn-primary">
                {content.hero.workCta} <ArrowDownRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <ResumeLink className="btn-ghost">
                <Download className="h-4 w-4" /> {content.hero.resumeCta}
              </ResumeLink>
            </Magnetic>
          </motion.div>

          <motion.div {...enter(0.52)} className="mt-9 flex items-center gap-4 text-fog-3">
            <span className="h-px w-10 bg-white/10" />
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[13px] transition-colors hover:text-fog"
            >
              <GithubIcon /> {content.hero.github}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[13px] transition-colors hover:text-fog"
            >
              <LinkedinIcon /> {content.hero.linkedin}
            </a>
          </motion.div>
        </div>

        {/* Portrait column */}
        <motion.div
          {...(reduced ? {} : { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1, delay: 0.3, ease } })}
          className="relative mx-auto w-[220px] sm:w-[250px] lg:mx-0 lg:ml-auto lg:mr-10 lg:w-[268px]"
          style={{ perspective: 900 }}
        >
          <motion.div
            style={interactive ? { x: cardX, y: cardY, rotateY: cardRY, rotateX: cardRX } : undefined}
            className="relative"
          >
            {/* glow */}
            <div aria-hidden className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-violet/35 via-transparent to-cyan/30 opacity-70 blur-2xl" />
            {/* gradient frame */}
            <div className="animate-gradient relative rounded-[28px] bg-[linear-gradient(120deg,rgba(255,45,149,0.72),rgba(0,123,167,0.62),rgba(255,45,149,0.72))] p-px shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
              <div className="relative overflow-hidden rounded-[27px] bg-ink-2">
                <img
                  src={profile.portrait}
                  alt="Portrait of Gagandeep T in a navy suit"
                  width={640}
                  height={800}
                  className="block aspect-[4/5] w-full object-cover"
                />
                {/* soft edge shading so the white studio background sits in the dark theme */}
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[27px] shadow-[inset_0_0_40px_rgba(8,9,13,0.35)]" />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between px-1 font-mono text-[10.5px] text-fog-3">
              <span>{content.hero.location}</span>
              <span className="text-cyan/80">{content.hero.degree}</span>
            </div>
          </motion.div>

          {/* Floating glass card */}
          <motion.div
            style={interactive ? { x: badgeX, y: badgeY } : undefined}
            className="absolute -left-20 bottom-10 sm:-left-36"
          >
            <div className="animate-float rounded-2xl border border-white/10 bg-ink-2/90 px-3.5 py-3 backdrop-blur-md shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)]">
              <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fog-3">
                <Sparkles className="h-3 w-3 text-violet-soft" /> {content.hero.stackLabel}
              </p>
              <div className="flex flex-col gap-1.5">
                {content.hero.stack.map((l, i) => (
                  <span key={l} className="flex items-center gap-2 text-[12.5px] text-fog">
                    <span className={`h-1.5 w-1.5 rounded-full ${i === 1 ? 'bg-cyan' : 'bg-violet'}`} />
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            style={interactive ? { x: badgeX, y: badgeY } : undefined}
            className="absolute -right-4 -top-4 sm:-right-12"
          >
            <span className="animate-float-slow inline-flex border border-white/10 bg-ink-2/90 backdrop-blur-md items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] text-fog-2">
              <span className="text-cyan">{'</>'}</span> {content.hero.chip}
            </span>
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fog-3 transition-colors hover:text-fog md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">{content.hero.scroll}</span>
        <span className="relative h-9 w-[1px] overflow-hidden bg-white/10">
          <span className="animate-scan absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-transparent to-cyan" />
        </span>
      </a>
    </section>
  );
}
