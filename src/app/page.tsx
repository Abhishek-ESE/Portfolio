import Image from "next/image";
import { site } from "@/data/site";
import { capabilities, career, developmentFocus } from "@/data/portfolio";
import { Navigation } from "@/components/portfolio/Navigation";
import { ArchitectureExplorer } from "@/components/portfolio/ArchitectureExplorer";
import { WorkGallery } from "@/components/portfolio/WorkGallery";
import { CopyEmail } from "@/components/portfolio/CopyEmail";
import { Arrow, CircuitMark, TechnicalIcon } from "@/components/portfolio/Icons";
import { PortfolioMotion } from "@/components/portfolio/PortfolioMotion";
import { AutomotiveFocus } from "@/components/portfolio/AutomotiveFocus";

export default function Home() {
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <PortfolioMotion/>
    <Navigation/>
    <main id="main">
      <section className="hero shell" id="top" aria-labelledby="hero-title">
        <div className="hero-copy" data-reveal>
          <div className="eyebrow hero-eyebrow"><span className="small-cross">+</span> FIRMWARE. HARDWARE. THE ROAD AHEAD.</div>
          <h1 id="hero-title">Engineering<br/>the <span className="electric-word">electric<svg viewBox="0 0 350 18" preserveAspectRatio="none" aria-hidden="true"><path d="M2 13Q155-1 347 8"/></svg></span><br/>future<span className="title-dot">.</span></h1>
          <div className="hero-intro"><div className="intro-rule"/><p>I’m <strong>Abhishek Agrahari.</strong><br/>An embedded software engineer connecting the vehicle, its firmware, and the world beyond it.</p></div>
          <p className="hero-detail">Building EV IoT systems at Vecmocon. Working across CAN, MCU firmware, cellular connectivity, and fleet telemetry.</p>
          <div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <Arrow diagonal/></a><a className="button button-text" href={site.resumeHref} target="_blank" rel="noopener noreferrer">View résumé <span>↓</span></a></div>
          <div className="hero-availability"><span className="status-light"/> Open to embedded & EV engineering roles <span className="availability-location">Noida, India</span></div>
        </div>
        <div className="hero-system" data-reveal><ArchitectureExplorer/></div>
      </section>
      <div className="proof-strip shell" aria-label="Engineering focus" data-reveal><div className="proof-label"><span className="eyebrow">FROM THE BENCH</span><strong>To the real world.</strong></div><div><strong>Vehicle firmware</strong><span>TI MCU · STM32 · ESP32</span></div><div><strong>Connected systems</strong><span>CAN · Cellular · BLE · MQTT</span></div><div><strong>Production mindset</strong><span>Bring-up · Debugging · Validation</span></div><a href="#experience" aria-label="Explore engineering experience"><Arrow diagonal/></a></div>
      <section className="section shell" id="work" aria-labelledby="work-title">
        <div className="section-heading" data-reveal><div><span className="eyebrow section-label"><span>01 /</span> SELECTED WORK</span><h2 id="work-title">Closer to the hardware.<br/>Further into the details.</h2></div><p>A selection of systems I’ve worked on, from vehicle connectivity to devices that sense, move, and respond.</p></div>
        <WorkGallery/>
      </section>
      <section className="expertise-section" id="expertise" aria-labelledby="expertise-title"><div className="shell section">
        <div className="section-heading" data-reveal><div><span className="eyebrow section-label"><span>02 /</span> ENGINEERING TOOLKIT</span><h2 id="expertise-title">Across the stack.<br/><span>Down to the signal.</span></h2></div><p>My work sits at the intersection of embedded software, electronics, and connected vehicles.</p></div>
        <div className="capabilities-grid">{capabilities.map((item, index) => <article className="capability" key={item.title}><div className="capability-top"><TechnicalIcon kind={index}/><span>0{index+1}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="capability-tools">{item.tools.map(tool => <span key={tool}>{tool}</span>)}</div></article>)}</div>
        <div className="learning-row"><span><span className="status-light"/> CURRENTLY EXPLORING</span><p>{developmentFocus.join("  /  ")}</p><span className="learning-plus">+</span></div>
      </div></section>
      <AutomotiveFocus/>
      <section className="section shell experience-section" id="experience" aria-labelledby="experience-title">
        <div className="experience-heading" data-reveal><span className="eyebrow section-label"><span>04 /</span> THE JOURNEY</span><h2 id="experience-title">Built through<br/>hands-on work.</h2><p>From bare-metal foundations to connected electric vehicles.</p><a className="text-link" href={site.resumeHref} target="_blank" rel="noopener noreferrer">The full story, in my résumé <Arrow diagonal/></a></div>
        <div className="career-list" data-reveal>{career.map((job, index) => <article className={`career-item ${job.current ? "current-role" : ""}`} key={job.company}><div className="career-marker">{index === 0 ? <span/> : <span className="past-marker"/>}</div><div className="career-top"><span>{job.period}</span>{job.current && <span className="current-tag">CURRENT</span>}</div><h3>{job.company}</h3><p className="career-role">{job.role}</p><p className="career-description">{job.description}</p><ul>{job.points.map(point => <li key={point}>{point}</li>)}</ul><div className="tags">{job.stack.map(tech => <span key={tech}>{tech}</span>)}</div></article>)}</div>
      </section>
      <section className="about-section" id="about" aria-labelledby="about-title"><div className="shell section about-grid">
        <div className="about-portrait"><div className="portrait-frame"><Image src={site.photo} alt="Abhishek Agrahari, embedded software engineer" width={400} height={460} sizes="(max-width: 700px) 85vw, 340px"/><div className="portrait-caption"><span>ABHISHEK AGRAHARI</span><span>ENGINEER, ALWAYS CURIOUS ↗</span></div></div><div className="portrait-coordinate"><span>BASED IN NOIDA, INDIA</span><span>28.53° N / 77.39° E</span></div></div>
        <div className="about-copy" data-reveal><span className="eyebrow section-label"><span>05 /</span> THE PERSON BEHIND THE FIRMWARE</span><h2 id="about-title">I like knowing<br/>why it works.</h2><p className="about-lead">And getting to the bottom of it when it doesn’t.</p><p>That curiosity has taken me from microcontroller firmware and board bring-up to EV IoT cards and fleet connectivity. I enjoy the part of engineering where software meets a physical system: a signal on the scope, a message on the bus, a device responding as intended.</p><p>Today, I work with the IoT team at Vecmocon. I’m interested in embedded and automotive teams where I can take on deeper technical problems and keep learning from the people around me.</p><div className="education"><span className="education-icon">↗</span><div><strong>B.Tech · Electronics & Communication</strong><p>United College of Engineering and Research · AKTU</p><span>2021–2025 <i/> CGPA 8.6 / 10</span></div></div><div className="about-links"><a className="text-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal/></a><a className="text-link" href={site.github} target="_blank" rel="noopener noreferrer">GitHub <Arrow diagonal/></a></div></div>
      </div></section>
      <section className="contact-section shell" id="contact" aria-labelledby="contact-title"><div className="contact-card" data-reveal><div className="contact-top"><span className="eyebrow"><span className="status-light"/> OPEN TO THE RIGHT OPPORTUNITY</span><span className="contact-code">LET’S CONNECT / 06</span></div><div className="contact-main"><div><h2 id="contact-title">Your next system.<br/>My next challenge.</h2><p>Building something in EVs, embedded systems, or connected hardware?<br className="desktop-break"/> I’d love to hear what your team is working on.</p></div><a className="contact-arrow" href={`mailto:${site.email}`} aria-label="Email Abhishek"><Arrow diagonal/></a></div><div className="contact-bottom"><div><a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a><CopyEmail/></div><a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="contact-linkedin">Connect on LinkedIn <Arrow diagonal/></a></div></div></section>
    </main>
    <footer className="shell footer"><a className="footer-brand" href="#top"><CircuitMark/><span>Abhishek Agrahari<small>Embedded software. Real-world systems.</small></span></a><span className="footer-copy">© {new Date().getFullYear()} Abhishek Agrahari</span><a className="back-top" href="#top">Back to top ↑</a></footer>
  </>;
}
