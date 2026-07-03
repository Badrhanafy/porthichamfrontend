import React from "react";

export default function About() {
  return (
    <section className="min-h-screen bg-[#0b0908] flex items-center px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/5  p-2">
            <img
              src="/photopng.png"
              alt="Profile"
              className="w-full h-[450px] object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-6">
          <div>
            <p className="text-white/40 uppercase tracking-[0.25em] text-xs mb-3">
              About Me
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Creating modern digital experiences
            </h2>
          </div>

          <p className="text-white/60 leading-relaxed text-base md:text-lg max-w-lg">
            I am a passionate web developer focused on building modern,
            responsive, and user-friendly digital experiences. My goal is to
            combine clean design with powerful functionality.
          </p>

          <p className="text-white/40 leading-relaxed text-sm md:text-base max-w-lg">
            I work with technologies like React, Laravel, and modern UI systems
            to create scalable and professional web applications.
          </p>

          {/* Button */}
          <div className="pt-2">
            <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-black hover:text-white border border-white transition-all duration-300">
              View Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}