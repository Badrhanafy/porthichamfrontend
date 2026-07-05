import React, { useEffect, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex h-screen items-center justify-center bg-black px-6 sm:mt-2 md:px-12">
      <style>{`
       
      `}</style>

      <div className="text-center text ">
        <h2
          className={`  text  uppercase tracking-[0.05em] text-white transition-all duration-1000 ease-out text-6xl sm:text-4xl md:text-5xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
          }`}
        >
          El Hachimi Films
        </h2>

        
        <p
          className={`textlight text-sm uppercase tracking-[0.3em] text-white/80 transition-all duration-1000 ease-out delay-200 md:text-base ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Elevating brands through refined visuals that combine creativity, emotion, and precision. Every frame is crafted to communicate your story with elegance and purpose.
        </p>
      </div>
    </section>
  );
}