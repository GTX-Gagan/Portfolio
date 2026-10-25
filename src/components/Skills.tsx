import { motion } from 'framer-motion';
import { Brain, Code2, Globe, Layers, Wrench } from 'lucide-react';
import { skillGroups } from '../data';
import { Reveal, SectionHeading, TiltCard } from './primitives';
import { content } from '../data/content.js';

const icons = { code: Code2, ai: Brain, web: Globe, tools: Wrench, core: Layers } as const;
// Visual order: two wide cards on top, three narrow below
const order = ['ai', 'web', 'code', 'tools', 'core'];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-glow relative py-20 sm:py-24">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-site">
        <SectionHeading
          id="skills-title"
          eyebrow={content.skills.eyebrow}
          title={content.skills.title}
          lede={content.skills.lede}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {[...skillGroups]
            .sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key))
            .map((g, i) => {
            const Icon = icons[g.key];
            const span = g.key === 'ai' || g.key === 'web' ? 'lg:col-span-3' : 'lg:col-span-2';
            return (
              <Reveal key={g.key} delay={i * 0.05} className={`${span} ${g.key === 'core' ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
                <TiltCard max={5} className="rounded-2xl">
                  <div className="glass h-full rounded-2xl p-5 sm:p-6">
                    <div className="mb-5 flex items-center gap-3" style={{ transform: 'translateZ(24px)' }}>
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet/25 to-cyan/15 text-cyan ring-1 ring-white/10">
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="text-[15px] font-medium">{g.title}</h3>
                    </div>
                    <ul className="flex flex-wrap gap-2" style={{ transform: 'translateZ(14px)' }}>
                      {g.items.map((s) => (
                        <motion.li
                          key={s}
                          whileHover={{ y: -2 }}
                          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[13px] text-fog-2 transition-colors hover:border-cyan/35 hover:text-fog"
                        >
                          {s}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
