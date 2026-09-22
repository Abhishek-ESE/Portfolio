"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";
import { Arrow } from "./Icons";

const links = [
  { href: "#work", label: "Selected work" },
  { href: "#expertise", label: "Expertise" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="shell nav-inner" aria-label="Main navigation">
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Abhishek Agrahari, home">
          <Image className="nav-avatar" src={site.photo} width={42} height={42} alt="" priority />
          <span>Abhishek Agrahari<span className="wordmark-period">.</span></span>
          <small>EMBEDDED SOFTWARE ENGINEER</small>
        </a>

        <div className="desktop-links">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </div>

        <a className="nav-resume" href={site.resumeHref} target="_blank" rel="noopener noreferrer">
          Résumé <Arrow diagonal />
        </a>

        <button
          ref={menuButton}
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="mobile-menu">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
          ))}
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a href={site.resumeHref} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
            Résumé <Arrow diagonal />
          </a>
        </div>
      )}
    </header>
  );
}
