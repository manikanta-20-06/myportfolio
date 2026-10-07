import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Backdrop from "@/components/Backdrop";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <Backdrop />
      <CustomCursor />
      <Navigation />

      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Connect />
      </main>

      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
