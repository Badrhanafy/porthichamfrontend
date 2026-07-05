import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Showreel() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaMeta, setMediaMeta] = useState(null); // { orientation: 'landscape' | 'portrait', ratio }
  const [modalImage, setModalImage] = useState(null); // project shown in the full-screen modal

  const videoRefs = useRef({});
  const filmstripRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && modalImage) {
        setModalImage(null);
        return;
      }
      if (modalImage) return; // don't navigate the reel while the modal is open
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, projects.length, modalImage]);

  // Lock body scroll while the image modal is open
  useEffect(() => {
    document.body.style.overflow = modalImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalImage]);

  // Keep the active thumbnail scrolled into view
  useEffect(() => {
    const el = filmstripRef.current?.children?.[activeIndex];
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex]);

  // Reset the known media dimensions whenever the active slide changes
  useEffect(() => {
    setMediaMeta(null);
  }, [activeIndex]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/projects`);
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const mediaUrl = (project) =>
    project.file_url ||
    `${import.meta.env.VITE_API_ENDPOINT.replace(/\/api$/, "")}/storage/${project.path}`;

  const goTo = (index) => {
    if (!projects.length) return;
    const next = (index + projects.length) % projects.length;
    pauseActive();
    setActiveIndex(next);
    setIsPlaying(false);
  };

  const pauseActive = () => {
    const current = projects[activeIndex];
    if (current && videoRefs.current[current.id]) {
      videoRefs.current[current.id].pause();
    }
  };

  const handlePlayToggle = (project) => {
    const video = videoRefs.current[project.id];
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.muted = false;
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleLoadedMetadata = (e) => {
    const { videoWidth, videoHeight } = e.target;
    if (!videoWidth || !videoHeight) return;
    setMediaMeta({
      orientation: videoWidth >= videoHeight ? "landscape" : "portrait",
      ratio: videoWidth / videoHeight,
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
          <p className="amc-body text-sm text-white/50">Loading showreel...</p>
        </div>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-black">
        <div className="rounded-full bg-white/5 p-5">
          <svg className="h-10 w-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="amc-body mt-4 text-center text-white/30">No projects found</p>
      </div>
    );
  }

  const active = projects[activeIndex];
  const isVideo = active.is_video;
  const isPortraitVideo = isVideo && mediaMeta?.orientation === "portrait";

  return (
    <section className="relative flex h-screen flex-col bg-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        .amc-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .amc-body { font-family: 'Inter', sans-serif; }
        .amc-label { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .amc-thumb::-webkit-scrollbar { height: 4px; }
        .amc-thumb::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); }
        .amc-thumb::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-8 md:px-12">
        <div>
          <p className="amc-label text-xs uppercase tracking-[0.35em] text-white/40">
            Showreel
          </p>
          <h1 className="amc-display mt-1 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Selected Work
          </h1>
        </div>
        <p className="amc-label text-xs tracking-[0.2em] text-white/40">
          {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      {/* Main stage */}
      <div className="relative mt-6 flex flex-1 items-center justify-center overflow-hidden px-6 md:px-12">
        {/* Media wrapper: sizing behavior depends on type + orientation */}
        <div
          className={`relative h-full overflow-hidden rounded-xl bg-white/5 ${
            !isVideo
              ? "w-full cursor-zoom-in"
              : isPortraitVideo
              ? "mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]"
              : "w-full"
          }`}
          onClick={!isVideo ? () => setModalImage(active) : undefined}
        >
          {!isVideo ? (
            <img
              key={active.id}
              src={mediaUrl(active)}
              alt={active.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              key={active.id}
              ref={(el) => (videoRefs.current[active.id] = el)}
              src={mediaUrl(active)}
              onLoadedMetadata={handleLoadedMetadata}
              className="h-full w-full object-contain"
              controls={isPlaying}
              preload="metadata"
              playsInline
              muted={!isPlaying}
            />
          )}

          {/* Bottom gradient for legible text (images + landscape video only, portrait video keeps its own frame clean) */}
          {!isPortraitVideo && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent" />
          )}

          {/* Expand hint for images */}
          {!isVideo && (
            <div className="pointer-events-none absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
              </svg>
            </div>
          )}

          {/* Play button for video */}
          {isVideo && !isPlaying && (
            <button
              onClick={() => handlePlayToggle(active)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
              aria-label="Play video"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl transition-transform hover:scale-110">
                <svg className="ml-1 h-6 w-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}

          {/* Title overlay (skip on portrait video, shown below the frame instead) */}
          {!isPortraitVideo && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5 md:p-8">
              <h2 className="amc-display text-xl font-semibold tracking-tight text-white md:text-3xl">
                {active.title}
              </h2>
              {active.description && (
                <p className="amc-body mt-1 max-w-lg text-xs text-white/60 md:text-sm">
                  {active.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Title block for portrait video, shown outside the frame */}
        {isPortraitVideo && (
          <div className="pointer-events-none absolute bottom-6 left-0 right-0 px-6 text-center md:px-12">
            <h2 className="amc-display text-lg font-semibold tracking-tight text-white md:text-2xl">
              {active.title}
            </h2>
            {active.description && (
              <p className="amc-body mx-auto mt-1 max-w-md text-xs text-white/60 md:text-sm">
                {active.description}
              </p>
            )}
          </div>
        )}

        {/* Prev / Next arrows */}
        <button
          onClick={() => goTo(activeIndex - 1)}
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:border-white hover:bg-black/60 md:left-5"
          aria-label="Previous project"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => goTo(activeIndex + 1)}
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:border-white hover:bg-black/60 md:right-5"
          aria-label="Next project"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Filmstrip */}
      <div
        ref={filmstripRef}
        className="amc-thumb mt-6 flex gap-3 overflow-x-auto px-6 pb-8 md:px-12"
      >
        {projects.map((project, i) => (
          <button
            key={project.id}
            onClick={() => goTo(i)}
            className={`relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-md border transition-all duration-300 md:h-20 md:w-32 ${
              i === activeIndex
                ? "border-white opacity-100"
                : "border-white/10 opacity-50 hover:opacity-80"
            }`}
          >
            {project.is_video ? (
              <video
                src={mediaUrl(project)}
                className="h-full w-full object-cover"
                muted
                preload="metadata"
              />
            ) : (
              <img
                src={mediaUrl(project)}
                alt={project.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            )}
            <span className="amc-label absolute bottom-1 left-1.5 text-[9px] tracking-[0.1em] text-white/80">
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      {/* Full-screen blurred modal for images */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl transition-opacity duration-300 ${
          modalImage ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setModalImage(null)}
      >
        {modalImage && (
          <>
            <button
              onClick={() => setModalImage(null)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:border-white hover:bg-black/60"
              aria-label="Close preview"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <img
              src={mediaUrl(modalImage)}
              alt={modalImage.title}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
            />

            <div
              className="pointer-events-none absolute bottom-8 left-0 right-0 px-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="amc-display text-lg font-semibold tracking-tight text-white">
                {modalImage.title}
              </h3>
            </div>
          </>
        )}
      </div>
    </section>
  );
}