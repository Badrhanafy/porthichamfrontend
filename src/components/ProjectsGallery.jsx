import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  const videoRefs = useRef({});

  useEffect(() => {
    fetchProjects();
  }, []);

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

  const handlePlay = (id) => {
    // Pause previous video
    if (activeVideo && videoRefs.current[activeVideo]) {
      videoRefs.current[activeVideo].pause();
    }

    const video = videoRefs.current[id];

    if (activeVideo === id) {
      video.pause();
      setActiveVideo(null);
    } else {
      setActiveVideo(id);
      video.muted = false;
      video.play().catch(() => {});
    }
  };

  // Split projects into two columns
  const columns = projects.reduce(
    (acc, item, i) => {
      acc[i % 2].push(item);
      return acc;
    },
    [[], []]
  );

  const ProjectCard = ({ project }) => {
    const isVideo = project.is_video;
    const isPlaying = activeVideo === project.id;

    return (
      <div className="group relative overflow-hidden rounded-xl bg-black/20 transition-all duration-300 hover:bg-black/30">
        {/* Media container with capped height to ensure standard display of long media */}
        <div className="relative w-full overflow-hidden bg-black/40 max-h-[70vh] md:max-h-[550px] flex items-center justify-center">
          {!isVideo ? (
            // IMAGE - maintains aspect ratio up to max-height, then crops cleanly
            <img
              src={project.file_url || `${import.meta.env.VITE_API_ENDPOINT.replace(/\/api$/, '')}/storage/${project.path}`}
              alt={project.title}
              className="w-full max-h-[70vh] md:max-h-[550px] object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            // VIDEO - maintains aspect ratio up to max-height, then crops cleanly for a standard size in the grid
            <>
              <video
                ref={(el) => (videoRefs.current[project.id] = el)}
                src={project.file_url || `${import.meta.env.VITE_API_ENDPOINT.replace(/\/api$/, '')}/storage/${project.path}`}

                className="w-full max-h-[70vh] md:max-h-[550px] object-cover"
                controls={isPlaying}
                preload="metadata"
                playsInline
                muted={!isPlaying}
              />

              {/* Custom play button overlay */}
              {!isPlaying && (
                <div
                  onClick={() => handlePlay(project.id)}
                  className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-2xl transition-transform hover:scale-110">
                    <svg className="ml-1 h-6 w-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Project info */}
        <div className="p-3">
          <h3 className="text-sm font-semibold text-white line-clamp-1">
            {project.title}
          </h3>
          {project.description && (
            <p className="mt-1 text-xs text-white/50 line-clamp-2">
              {project.description}
            </p>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0b0908]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
          <p className="text-sm text-white/50">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0b0908] px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center md:mb-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            My Projects
          </h1>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-white/20 to-white/40"></div>
          <p className="mt-3 text-sm text-white/40">
            {projects.length} {projects.length === 1 ? "project" : "projects"} in my portfolio
          </p>
        </div>

        {/* Grid Layout - Two columns with smaller width */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:gap-5">
            {/* Left Column */}
            <div className="flex flex-col gap-4 lg:gap-5">
              {columns[0].map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 lg:gap-5">
              {columns[1].map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-white/5 p-5">
              <svg className="h-10 w-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="mt-4 text-center text-white/30">No projects found</p>
          </div>
        )}
      </div>
    </section>
  );
}