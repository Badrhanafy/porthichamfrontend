import React, { useState, useEffect } from "react";

const NAV_LINKS = [
  
  
  { label: "Contact", href: "/contact" },
  { label: "Projects", href: "/projects" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass =
    "amc-mono group relative font-bold px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/60 transition-colors duration-300 hover:text-[#f3efe6]";

  const handleNav = (href) => {
    setMenuOpen(false);
    window.location.href = href;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        .amc-mono { font-family: 'Space Mono', monospace; }
      `}</style>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[#c9a15a]/20 bg-[#0a0908]/90 shadow-lg backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="relative flex h-16 items-center justify-between overflow-hidden md:h-20">
            {/* LEFT LINKS (desktop) */}
            <div className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.slice(0, 2).map((link) => (
                <a key={link.href}  href={link.href} className={linkClass}>
                  {link.label}
                  <span className="absolute bottom-1  left-4 right-4 h-px origin-left scale-x-0 bg-[#c9a15a] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </div>

            {/* CENTER LOGO */}
            <a
              href="/"
              className="absolute left-1/2 flex h-full -translate-x-1/2 transform items-center py-2"
            >
              <img
                src="/logo.png"
                alt="El Hachimi Films"
                className="h-full w-auto max-w-[] object-contain sm:max-w-[180px] md:max-w-[220px]"
              />
            </a>

            {/* RIGHT LINKS (desktop) */}
            <div className="hidden items-center gap-1 md:flex text">
              {NAV_LINKS.slice(2).map((link) => (
                <a key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 bg-[#c9a15a] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </div>

            {/* MOBILE TOGGLE — animated hamburger / close morph */}
            <div className="ml-auto flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="relative z-[60] inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition hover:border-[#c9a15a]/50"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="relative flex h-4 w-5 flex-col justify-between">
                  <span
                    className={`h-px w-full bg-current transition-all duration-300 ${
                      menuOpen ? "translate-y-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`h-px w-full bg-current transition-all duration-300 ${
                      menuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`h-px w-full bg-current transition-all duration-300 ${
                      menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU — full-screen centered overlay, always mounted for smooth enter/exit */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#0a0908]/98 backdrop-blur-xl transition-all duration-500 ease-out md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNav(link.href)}
              style={{
                transitionDelay: menuOpen ? `${i * 60 + 100}ms` : "0ms",
              }}
              className={`amc-display px-6 py-3  text-4xl uppercase tracking-wide text-white/80 transition-all duration-500 ease-out hover:text-[#c9a15a] ${
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div
          className={`amc-mono absolute bottom-10 text-[10px] uppercase tracking-[0.3em] text-white/30 transition-all duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: menuOpen ? "350ms" : "0ms" }}
        >
          Behind The Lens
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .amc-display { font-family: 'Bebas Neue', 'Inter', sans-serif; }
      `}</style>
    </>
  );
}