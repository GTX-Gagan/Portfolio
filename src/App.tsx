import About from './components/About';
import Atmosphere from './components/Atmosphere';
import Contact, { Footer } from './components/Contact';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import { Certifications, Education, Experience } from './components/Journey';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';

export default function App() {
  return (
    <>
      <Atmosphere />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-ink-2 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Cursor />
      <Navbar />
      <main id="main" className="[overflow-x:clip]">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
