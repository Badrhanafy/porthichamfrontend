import React, { useEffect, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bgvideo.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Optional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90"></div>
{/* content */}
    <div className="relative z-10 text-center max-w-5xl mx-auto px-6 sm:px-8 md:px-12">
  <h2
    className={` font-bold tracking-[0.02em] text-white transition-all duration-1000
    text-4xl sm:text-5xl md:text-6xl lg:text-7xl
    ${
      isVisible
        ? "translate-y-0 opacity-100"
        : "translate-y-8 opacity-0"
    }`}
  >
    EL HACHIMI FILMS
  </h2>

  {/* Divider */}
  

  <p
    className={`mx-auto max-w-2xl text-white/75 leading-7 tracking-[0.05em]
    text-sm sm:text-base mt-2 md:text-lg
    transition-all duration-1000 delay-300
    ${
      isVisible
        ? "translate-y-0 opacity-100"
        : "translate-y-8 opacity-0"
    }`}
  >
    Elevating brands through refined visuals that blend cinematic
    storytelling, emotion, and precision. Every frame is crafted to
    transform ideas into timeless visual experiences that leave a lasting
    impression.
  </p>
</div>
    </section>
  );
}