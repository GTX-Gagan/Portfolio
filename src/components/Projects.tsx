import { ArrowUpRight, Clock } from 'lucide-react';
import { profile, projects } from '../data';
import { GithubIcon } from './icons';
import { Reveal, SectionHeading, TiltCard } from './primitives';
import { ProjectVisualArt } from './ProjectVisuals';
import { content } from '../data/content.js';

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section-glow relative overflow-hidden py-20 sm:py-24">
      <div aria-hidden className="absolute left-1/2 top-40 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-violet/[0.07] blur-[120px]" />
      <div className="container-site relative">
        <SectionHeading
          id="projects-title"
          eyebrow={content.projects.eyebrow}
          title={content.projects.title}
          lede={content.projects.lede}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <TiltCard className="rounded-[22px]">
                <article className="glass project-card flex h-full flex-col overflow-hidden rounded-[22px]">
                  <div className="relative h-[168px] border-b border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent">
                    <div className="grid-bg absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
                    <div className="absolute inset-x-0 bottom-0 top-7">
                      <ProjectVisualArt kind={p.visual} />
                    </div>
                    <span className="absolute left-4 top-3 font-mono text-[10.5px] text-fog-3">
                      {p.index} / {p.short}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(20px)' }}>
                    <h3 className="text-[19px] font-semibold leading-snug">{p.title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-fog-2">{p.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={content.projects.technologies}>
                      {p.tags.map((t) => (
                        <li key={t} className="tag">
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-cyan transition-colors hover:text-white"
                        >
                          View Project <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ) : (
                        // Placeholder until a real repo/demo URL is added in src/data.ts
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          <span
                            aria-disabled="true"
                            title="Add the repository URL in src/data.ts"
                            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-white/15 px-3 py-1.5 text-[12px] text-fog-3"
                          >
                            <Clock className="h-3.5 w-3.5" /> {content.projects.comingSoon}
                          </span>
                          <a
                            href={profile.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[12.5px] text-fog-2 transition-colors hover:text-fog"
                          >
                            <GithubIcon className="h-3.5 w-3.5" /> {content.projects.githubProfile}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
