import React, { useEffect, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-black px-6 sm:px-8 md:px-12">
      <div className="text-center max-w-5xl mx-auto">
        <h2
          className={`uppercase tracking-[0.05em] text-white font-light transition-all duration-1000 ease-out
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl
          ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-1 opacity-0"
          }`}
        >
          El Hachimi Films
        </h2>

        <p
          className={`mt-6 mx-auto w-full max-w-3xl text-white/80 leading-relaxed tracking-[0.08em]
          text-sm sm:text-base md:text-lg
          transition-all duration-1000 ease-out delay-200
          ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          Elevating brands through refined visuals that combine
          creativity, emotion, and precision. Every frame is crafted to
          communicate your story with elegance and purpose.
        </p>
      </div>
    </section>
  );
}