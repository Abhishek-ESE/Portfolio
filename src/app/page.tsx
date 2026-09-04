import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Credentials } from "@/components/sections/Credentials";
import { Contact, Footer } from "@/components/sections/Contact";
import { ScrollProgress, MarqueeBand, Backdrop } from "@/components/sections/Chrome";

export default function Home() {
  return (
    <>
      <Backdrop />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <MarqueeBand />
        <Expertise />
        <Experience />
        <MarqueeBand />
        <Projects />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
