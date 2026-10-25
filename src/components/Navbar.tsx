import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ResumeLink from './ResumeLink';
import { navItems, type NavId } from '../data';
import { content } from '../data/content.js';

// Sections without their own nav entry highlight the nearest one.
const sectionToNav: Record<string, NavId> = {
  home: 'home',
  about: 'about',
  skills: 'skills',
  projects: 'projects',
  experience: 'experience',
  education: 'experience',
  certifications: 'experience',
  contact: 'contact',
};

export default function Navbar() {
  const [active, setActive] = useState<NavId>('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(sectionToNav[e.target.id] ?? 'home');
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    Object.keys(sectionToNav).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-[max(12px,env(safe-area-inset-top))] sm:px-5">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-site items-center justify-between rounded-2xl px-3 py-2 transition-all duration-500 sm:px-4 ${
          scrolled || open ? 'glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]' : 'border border-transparent'
        }`}
      >
        <a href="#home" className="group flex items-center gap-2.5 rounded-lg py-1 pr-2" aria-label="Gagandeep T — home">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet to-cyan font-display text-[13px] font-bold text-ink">
            GT
          </span>
          <span className="hidden font-display text-sm font-medium text-fog sm:block">Gagandeep T</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`relative block rounded-full px-3.5 py-2 text-[13px] transition-colors ${
                  active === item.id ? 'text-white' : 'text-fog-2 hover:text-fog'
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ResumeLink
            className="hidden items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2 text-[13px] text-fog transition-colors hover:border-cyan/40 hover:text-white sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" /> {content.navigation.resume}
          </ResumeLink>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl text-fog md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass mx-auto mt-2 max-w-site rounded-2xl p-2 md:hidden"
          >
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-[15px] ${
                      active === item.id ? 'bg-white/[0.06] text-white' : 'text-fog-2'
                    }`}
                  >
                    {item.label}
                    {active === item.id && <span className="h-1.5 w-1.5 rounded-full bg-cyan" />}
                  </a>
                </li>
              ))}
              <li className="mt-1 border-t border-white/5 pt-2">
                <ResumeLink
                  onDone={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-[15px] text-cyan"
                >
                  <Download className="h-4 w-4" /> {content.navigation.downloadPdf}
                </ResumeLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
