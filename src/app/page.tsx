import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Credentials } from "@/components/sections/Credentials";
import { Contact, Footer } from "@/components/sections/Contact";
import { ScrollProgress, MarqueeBand, Backdrop } from "@/components/sections/Chrome";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Backdrop />
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Expertise />
        <MarqueeBand />
        <Experience />
        <Projects />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
