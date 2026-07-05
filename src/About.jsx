import React, { useEffect, useRef, useState } from "react";

const SPECIALTIES = ["Cinematography", "Portraiture", "Color Grade", "Directing"];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex h-screen items-center justify-center bg-black px-6 md:px-12"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
        .amc-display { font-family: 'Bebas Neue', 'Inter', sans-serif; }
        .amc-mono { font-family: 'Space Mono', monospace; }
        .amc-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="mx-auto grid w-full max-w-4xl items-center gap-10 md:grid-cols-2 md:gap-12">
        {/* Image */}
        <div
          className={`flex justify-center transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <img
            src="/photopng.png"
            alt="Portrait of the photographer and filmmaker"
            className="h-[280px] w-full max-w-[260px] object-cover md:h-[340px]"
          />
        </div>

        {/* Text content */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          <p className="amc-mono mb-3 text-xs uppercase tracking-[0.35em] text-[#8a8378]">
            About
          </p>

          <h2 className="amc-display text-[2.6rem] leading-[0.95] tracking-wide text-[#f3efe6] sm:text-[3.2rem]">
            BEHIND
            <span className="block text-[#c9a15a]">THE LENS</span>
          </h2>

          <p className="amc-body mt-4 max-w-md text-[14px] leading-relaxed text-[#a39a8d]">
            I'm a photographer and filmmaker who treats every frame like a
            single exposure worth getting right — composing light, motion,
            and story into images that hold up long after the shutter
            closes.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {SPECIALTIES.map((skill) => (
              <span
                key={skill}
                className="amc-mono cursor-default border border-[#c9a15a]/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-[#a39a8d] transition-all duration-300 hover:border-[#c9a15a] hover:text-[#e8c880]"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-7">
            <button className="group relative flex items-center gap-2 overflow-hidden border border-[#c9a15a] px-6 py-3 text-[#c9a15a] transition-colors duration-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a15a]">
              <span className="amc-mono relative z-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Showreel
              </span>
              <div className="absolute inset-0 -z-0 origin-left scale-x-0 bg-[#c9a15a] transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}