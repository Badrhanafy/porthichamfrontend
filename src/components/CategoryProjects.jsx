import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const toSlug = (name) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export default function CategoryProjects() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);
  const [playingStates, setPlayingStates] = useState({});
  const [modalImage, setModalImage] = useState(null);

  const videoRefs = useRef({});

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      setLoading(true);
      setNotFound(false);
      setError(null);

      try {
        const [catRes, projRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_ENDPOINT}/categories`),
          axios.get(`${import.meta.env.VITE_API_ENDPOINT}/projects`),
        ]);

        if (cancelled) return;

        const matched = catRes.data.find((c) => toSlug(c.name) === slug);

        if (!matched) {
          setNotFound(true);
          setCategory(null);
          setImages([]);
          setVideos([]);
          setAllProjects([]);
          return;
        }

        setCategory(matched);

        // Loose comparison guards against id being a string on one side and a number on the other
        const filtered = projRes.data.filter(
          (p) => String(p.category_id) === String(matched.id)
        );

        setImages(filtered.filter((p) => !p.is_video));
        setVideos(filtered.filter((p) => p.is_video));
        setAllProjects(filtered);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Something went wrong loading this category.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadData();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Escape closes the image modal; body scroll locks while it's open
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setModalImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalImage]);

  const mediaUrl = (p) =>
    p.file_url ||
    `${import.meta.env.VITE_API_ENDPOINT.replace(/\/api$/, "")}/storage/${p.path}`;

  const handleManualPlay = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch(() => {});
      setPlayingStates((prev) => ({ ...prev, [id]: true }));
    }
  };

  const totalCount = images.length + videos.length;

  return (
    <section className="min-h-screen bg-black p-6 md:p-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        .amc-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .amc-body { font-family: 'Inter', sans-serif; }
        .amc-label { font-family: 'Space Grotesk', 'Inter', sans-serif; }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <Link
          to="/"
          className="amc-label mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
        >
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Loading state */}
        {loading && (
          <div className="flex h-[50vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
              <p className="amc-body text-sm text-white/50">Loading category...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex h-[50vh] flex-col items-center justify-center text-center">
            <p className="amc-body text-white/50">{error}</p>
          </div>
        )}

        {/* Not found state */}
        {!loading && !error && notFound && (
          <div className="flex h-[50vh] flex-col items-center justify-center text-center">
            <h1 className="amc-display text-2xl font-semibold text-white">
              Category not found
            </h1>
            <p className="amc-body mt-2 text-sm text-white/40">
              The category you're looking for doesn't exist.
            </p>
          </div>
        )}

        {/* Loaded content */}
        {!loading && !error && !notFound && (
          <>
            <div className="mb-16">
              <p className="amc-label mb-2 text-xs uppercase tracking-[0.35em] text-white/40">
                Category
              </p>
              <h1 className="amc-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {category?.name}
              </h1>
              <p className="amc-body mt-3 text-sm text-white/40">
                {totalCount} {totalCount === 1 ? "project" : "projects"}
              </p>
            </div>

            {totalCount === 0 ? (
              <div className="flex h-[40vh] flex-col items-center justify-center text-center">
                <div className="rounded-full bg-white/5 p-5">
                  <svg className="h-10 w-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="amc-body mt-4 text-white/30">
                  No projects in this category yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
                {allProjects.map((p) =>
                  p.is_video ? (
                    <div key={p.id} className="relative">
                      {!playingStates[p.id] && (
                        <div
                          onClick={() => handleManualPlay(p.id)}
                          className="group absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/20"
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl transition-transform group-hover:scale-110">
                            <svg className="ml-1 h-8 w-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}

                      <video
                        ref={(el) => (videoRefs.current[p.id] = el)}
                        controls
                        onPlay={() => setPlayingStates((prev) => ({ ...prev, [p.id]: true }))}
                        onPause={() => setPlayingStates((prev) => ({ ...prev, [p.id]: false }))}
                        className="h-auto w-full bg-black"
                        src={mediaUrl(p)}
                        preload="metadata"
                        playsInline
                      />

                      <h3 className="amc-display mt-4 font-semibold text-white">{p.title}</h3>
                    </div>
                  ) : (
                    <div key={p.id}>
                      <button
                        onClick={() => setModalImage(p)}
                        className="group relative block w-full cursor-zoom-in overflow-hidden"
                      >
                        <img
                          src={mediaUrl(p)}
                          alt={p.title}
                          className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
                          </svg>
                        </div>
                      </button>
                      <h3 className="amc-display mt-4 font-semibold text-white">{p.title}</h3>
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}
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