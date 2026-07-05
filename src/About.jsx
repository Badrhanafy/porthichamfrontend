import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";



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
      className="flex h-screen items-center justify-center bg-black px-6 sm:mt-20 md:px-12"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        .amc-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .amc-body { font-family: 'Inter', sans-serif; }
        .amc-label { font-family: 'Space Grotesk', 'Inter', sans-serif; }
      `}</style>

      <div className="mx-auto grid w-full max-w-4xl items-center gap-6 md:grid-cols-2 md:gap-6">
        {/* Text first on mobile */}
        <div
          className={`order-1 flex flex-col gap-4 border-l pl-6 transition-all duration-1000 delay-200 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          } md:order-2`}
        >
          <div>
            

            <h2 className="amc-display text-[2.6rem] font-semibold leading-[1] tracking-tight text-white sm:text-[3.2rem]">
              Behind
              <span className="block text-white/50">the lens</span>
            </h2>
          </div>

          <p className="amc-body max-w-md text-[14px] leading-relaxed text-white/60">
            I'm a photographer and filmmaker who treats every frame like a
            single exposure worth getting right — composing light, motion,
            and story into images that hold up long after the shutter
            closes.
          </p>

          <div className="h-px w-12 bg-white/20" />

      

          <div>
            <Link to={'/works'} className="group w-1/2 relative flex items-center gap-2 overflow-hidden border border-white bg-white px-6 py-3 text-black transition-colors duration-300 hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <span className="amc-label relative z-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
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
            </Link>
          </div>
        </div>

        {/* Image */}
        <div
          className={`order-2 flex justify-center transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          } md:order-1`}
        >
          <div className="relative h-[280px] w-full max-w-[260px] overflow-hidden md:h-[340px]">
            <img
              src="/profile.jpeg"
              alt="Portrait of the photographer and filmmaker"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-t from-black/90 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}