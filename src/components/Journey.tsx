import { motion, useScroll, useSpring } from 'framer-motion';
import { Award, Calendar, GraduationCap, MapPin, Trophy } from 'lucide-react';
import { useRef } from 'react';
import { achievement, certifications, education, experience } from '../data';
import { useReducedMotion } from '../lib/capabilities';
import { Reveal, SectionHeading } from './primitives';
import { content } from '../data/content.js';

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" aria-labelledby="exp-title" className="section-glow relative py-20 sm:py-24">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-site">
        <SectionHeading id="exp-title" eyebrow={content.journey.experienceEyebrow} title={content.journey.experienceTitle} />

        <ol ref={ref} className="relative ml-2 max-w-3xl sm:ml-4">
          {/* rail */}
          <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-white/[0.08]" />
          <motion.span
            aria-hidden
            className="absolute left-0 top-2 w-px origin-top bg-gradient-to-b from-violet via-cyan to-violet"
            style={{ bottom: 8, scaleY: reduced ? 1 : progress }}
          />

          {experience.map((job, i) => (
            <li key={job.company} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
              <motion.span
                aria-hidden
                initial={reduced ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                className="absolute -left-[7px] top-6 grid h-[15px] w-[15px] place-items-center rounded-full border border-cyan/60 bg-ink"
              >
                <span className="h-[5px] w-[5px] rounded-full bg-cyan shadow-[0_0_10px_2px_rgba(0,123,167,0.7)]" />
              </motion.span>

              <Reveal delay={i * 0.05}>
                <article className="glass timeline-card rounded-2xl p-6 transition-colors duration-300 hover:border-white/15 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                    <div>
                      <h3 className="text-lg font-semibold sm:text-xl">{job.role}</h3>
                      <p className="mt-1 text-[14.5px] text-violet-soft">{job.company}</p>
                    </div>
                    <div className="space-y-1 text-right font-mono text-[11.5px] text-fog-3 max-sm:text-left">
                      <p className="flex items-center gap-1.5 sm:justify-end">
                        <Calendar className="h-3.5 w-3.5" /> {job.period}
                      </p>
                      <p className="flex items-center gap-1.5 sm:justify-end">
                        <MapPin className="h-3.5 w-3.5" /> {job.location}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[14.5px] leading-relaxed text-fog-2">
                        <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-cyan/70" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" aria-labelledby="edu-title" className="section-glow relative py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading id="edu-title" eyebrow={content.journey.educationEyebrow} title={content.journey.educationTitle} />
        <div className="grid gap-4 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="glass group relative h-full overflow-hidden rounded-2xl p-6 sm:p-7"
              >
                <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
                <div className="relative flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-cyan">
                    <GraduationCap className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-semibold leading-snug">{e.degree}</h3>
                    <p className="mt-1.5 text-[14px] leading-snug text-fog-2">{e.school}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="tag">{e.period}</span>
                      <span className="tag !text-cyan/90">{e.score}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Certifications() {
  return (
    <section id="certifications" aria-labelledby="cert-title" className="section-glow relative py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading id="cert-title" eyebrow={content.journey.certificationsEyebrow} title={content.journey.certificationsTitle} />
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <ul className="glass divide-y divide-white/[0.06] rounded-2xl">
              {certifications.map((c) => (
                <li key={c.title} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.02] sm:px-6">
                  <Award className="h-4 w-4 shrink-0 text-violet-soft" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="text-[14.5px] text-fog">{c.title}</p>
                    <p className="text-[12.5px] text-fog-3">{c.issuer}</p>
                  </div>
                  {c.date && <span className="shrink-0 font-mono text-[11px] text-fog-3">{c.date}</span>}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-2xl p-px">
              <div aria-hidden className="animate-gradient absolute inset-0 bg-[linear-gradient(120deg,rgba(255,45,149,0.5),rgba(0,123,167,0.35),rgba(255,45,149,0.5))]" />
              <div className="relative flex h-full flex-col rounded-[15px] bg-ink-2 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet/30 to-cyan/20 text-cyan ring-1 ring-white/10">
                  <Trophy className="h-[18px] w-[18px]" />
                </span>
                <p className="eyebrow mt-5">{content.journey.leadership} · {achievement.date}</p>
                <h3 className="mt-2 text-lg font-semibold">{achievement.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-fog-2">{achievement.detail}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
