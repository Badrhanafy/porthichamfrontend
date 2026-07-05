import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
      ${scrolled
        ? "bg-[#0b0908] backdrop-blur-xl border-b border-amber-900/20 shadow-lg"
        : "bg-black border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative flex items-center justify-between h-16 md:h-20">

          {/* LEFT LINKS */}
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="px-4 py-2 text-sm text-white/70 hover:text-amber-300 transition rounded-lg hover:bg-white/5"
            >
              Home
            </a>

            <a
              href="/projects"
              className="px-4 py-2 text-sm text-white/70 hover:text-amber-300 transition rounded-lg hover:bg-white/5"
            >
              Projects
            </a>
          </div>

          {/* CENTER LOGO */}
          <a
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center group"
          >
            
             
              <img src="/logo.png" alt="" srcset=""  className="w-60"/>
           

           
          </a>

          {/* RIGHT LINKS */}
          <div className="flex items-center gap-2">
            <a
              href="/about"
              className="px-4 py-2 text-sm text-white/70 hover:text-amber-300 transition rounded-lg hover:bg-white/5"
            >
              About
            </a>

            <a
              href="/contact"
              className="px-4 py-2 text-sm text-white/70 hover:text-amber-300 transition rounded-lg hover:bg-white/5"
            >
              Contact
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
}