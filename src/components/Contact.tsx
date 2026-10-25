import { ArrowUpRight, Check, Copy, Download, Mail } from 'lucide-react';
import { useState } from 'react';
import ResumeLink from './ResumeLink';
import { profile } from '../data';
import { GithubIcon, LinkedinIcon } from './icons';
import { Magnetic, Reveal } from './primitives';
import { content } from '../data/content.js';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-glow relative py-20 sm:py-24">
      <div className="container-site">
        <Reveal>
          <div className="contact-card relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-ink-2 px-6 py-14 sm:px-12 sm:py-16">
            <div aria-hidden className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,#000,transparent_70%)]" />
            <div aria-hidden className="absolute -top-32 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-violet/20 blur-[100px]" />
            <div aria-hidden className="absolute -bottom-28 right-0 h-56 w-80 rounded-full bg-cyan/10 blur-[90px]" />

            <div className="relative mx-auto max-w-2xl text-center">
              <p className="eyebrow mb-5">{content.contact.eyebrow}</p>
              <h2 id="contact-title" className="text-3xl font-semibold leading-[1.12] sm:text-[2.7rem]">
                {content.contact.titleLead} <span className="text-gradient">{content.contact.titleAccent}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-[15.5px] leading-relaxed text-fog-2">
                {content.contact.description}
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Magnetic>
                  <a href={`mailto:${profile.email}?subject=Hello%20Gagandeep`} className="btn-primary">
                    <Mail className="h-4 w-4" /> {content.contact.connect}
                  </a>
                </Magnetic>
                <Magnetic>
                  <ResumeLink className="btn-ghost">
                    <Download className="h-4 w-4" /> {content.contact.download}
                  </ResumeLink>
                </Magnetic>
              </div>

              <div className="mx-auto mt-10 flex max-w-md items-center justify-between gap-3 rounded-full border border-white/10 bg-ink/60 py-1.5 pl-5 pr-1.5">
                <a href={`mailto:${profile.email}`} className="truncate font-mono text-[13px] text-fog hover:text-cyan">
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-2 text-[12px] text-fog-2 transition-colors hover:text-white"
                  aria-live="polite"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-violet-soft" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? content.contact.copied : content.contact.copy}
                </button>
              </div>

              <div className="mt-7 flex items-center justify-center gap-3">
                {[
                  { href: profile.linkedin, label: 'LinkedIn', Icon: LinkedinIcon, handle: 'in/gagandeep03' },
                  { href: profile.github, label: 'GitHub', Icon: GithubIcon, handle: 'GTX-Gagan' },
                ].map(({ href, label, Icon, handle }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${label} — ${handle}`}
                    className="glass group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-fog-2 transition-colors hover:text-white"
                  >
                    <Icon className="h-4 w-4" /> {handle}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="container-site flex flex-col items-center justify-between gap-3 text-[12.5px] text-fog-3 sm:flex-row">
        <p>{content.footer.credit} © {new Date().getFullYear()}</p>
        <a href="#home" className="font-mono transition-colors hover:text-fog">
          {content.footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
