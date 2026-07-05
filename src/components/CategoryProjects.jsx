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
  const [loading, setLoading] = useState(true);
  const [playingStates, setPlayingStates] = useState({});
  const videoRefs = useRef({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const catRes = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/categories`);
        const matched = catRes.data.find((c) => toSlug(c.name) === slug);
        if (!matched) return;
        setCategory(matched);

        const projRes = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/projects`);
        const filtered = projRes.data.filter((p) => p.category_id === matched.id);
        
        setImages(filtered.filter(p => !p.is_video));
        setVideos(filtered.filter(p => p.is_video));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [slug]);

  const handleManualPlay = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play();
      setPlayingStates(prev => ({ ...prev, [id]: true }));
    }
  };

  if (loading) return <div className="h-screen bg-[#0b0908]" />;

  return (
    <section className="min-h-screen bg-[#0b0908] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="text-white/40 hover:text-white text-sm mb-8 block transition-colors">← Back</Link>
        <h1 className="text-4xl font-bold text-white mb-16">{category?.name}</h1>

        {/* Images Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-20">
            {images.map((p) => (
              <div key={p.id}>
                <img src={p.file_url || `${import.meta.env.VITE_API_ENDPOINT.replace(/\/api$/, '')}/storage/${p.path}`} alt={p.title} className="w-full h-auto" />
                <h3 className="text-white font-bold mt-4">{p.title}</h3>
              </div>
            ))}
          </div>
        )}

        {/* Videos Grid with Mockup */}
        {videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {videos.map((p) => (
              <div key={p.id} className="relative">
                {/* The Mockup Overlay */}
                {!playingStates[p.id] && (
                  <div 
                    onClick={() => handleManualPlay(p.id)}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 cursor-pointer group"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                      <svg className="w-8 h-8 ml-1 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                )}
                
                {/* Native Video Player */}
                <video
                  ref={(el) => (videoRefs.current[p.id] = el)}
                  controls
                  onPlay={() => setPlayingStates(prev => ({ ...prev, [p.id]: true }))}
                  onPause={() => setPlayingStates(prev => ({ ...prev, [p.id]: false }))}
                  className="w-full h-auto bg-black"
                  src={p.file_url || `${import.meta.env.VITE_API_ENDPOINT.replace(/\/api$/, '')}/storage/${p.path}`}
                />
                
                <h3 className="text-white font-bold mt-4">{p.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}