import React, { useEffect, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex h-screen items-center justify-center bg-black px-6 sm:mt-20 md:px-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');
        .amc-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .amc-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="text-center">
        <h2
          className={`amc-display text-3xl font-semibold uppercase tracking-[0.15em] text-white transition-all duration-1000 ease-out sm:text-4xl md:text-5xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          El Hachimi Films
        </h2>

        <p
          className={`amc-body mt-4 text-sm uppercase tracking-[0.3em] text-white/40 transition-all duration-1000 ease-out delay-200 md:text-base ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Behind the lens
        </p>
      </div>
    </section>
  );
}