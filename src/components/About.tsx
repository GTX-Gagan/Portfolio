import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Target } from 'lucide-react';
import { useRef } from 'react';
import { aboutFacts, profile } from '../data';
import { useReducedMotion } from '../lib/capabilities';
import { Reveal, SectionHeading } from './primitives';
import { content } from '../data/content.js';

const icons = [GraduationCap, Target, Briefcase, MapPin];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [28, -28]);
  const frameY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-12, 12]);

  return (
    <section id="about" aria-labelledby="about-title" className="section-glow relative py-20 sm:py-24">
      <div className="container-site">
        <SectionHeading id="about-title" eyebrow={content.about.eyebrow} title={content.about.title} />

        <div ref={ref} className="grid items-start gap-12 md:grid-cols-[minmax(0,260px)_1fr] lg:gap-20">
          {/* Editorial photo card */}
          <Reveal className="mx-auto w-full max-w-[240px] md:mx-0">
            <motion.figure style={{ y: frameY }} className="relative">
              <div aria-hidden className="absolute -right-3 -top-3 h-full w-full rounded-[22px] border border-violet/25" />
              <div className="relative overflow-hidden rounded-[22px] bg-ink-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.95)] hairline">
                <motion.img
                  style={{ y: imgY, scale: 1.12 }}
                  src={profile.fullPhoto}
                  alt="Gagandeep T standing in a corridor, wearing a navy suit"
                  width={640}
                  height={855}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[3/4] w-full object-cover object-[50%_25%]"
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
                <figcaption className="absolute bottom-3 left-4 font-mono text-[10.5px] tracking-wide text-fog-2">
                  {content.about.caption}
                </figcaption>
              </div>
            </motion.figure>
          </Reveal>

          <div>
            <Reveal>
              <p className="max-w-[62ch] text-[17px] leading-[1.75] text-fog-2 sm:text-lg">
                {content.about.bioLead} <span className="text-fog">{content.about.bioLeadEmphasis}</span> {content.about.bioMiddle}{' '}
                <span className="text-fog">{content.about.bioResearch}</span> {content.about.bioAnd}{' '}<span className="text-fog">{content.about.bioDevelopment}</span>
                {' '}{content.about.bioRest}
              </p>
            </Reveal>

            <dl className="mt-10 grid gap-3 sm:grid-cols-2">
              {aboutFacts.map((f, i) => {
                const Icon = icons[i];
                return (
                  <Reveal key={f.label} delay={i * 0.06}>
                    <div className="glass group flex h-full gap-4 rounded-2xl p-4 transition-colors duration-300 hover:border-white/15">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-cyan transition-colors group-hover:text-violet-soft">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <dt className="eyebrow mb-1 text-[10px]">{f.label}</dt>
                        <dd className="text-[14px] leading-snug text-fog">{f.value}</dd>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
