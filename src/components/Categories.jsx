import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const toSlug = (name) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0b0908]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500/30 border-t-purple-500"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#191919] px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto mt-14 max-w-7xl">
      

        {error && (
          <div className="rounded-xl bg-red-500/10 p-4 border border-red-500/20 text-red-400 mb-8 text-center">
            {error}
          </div>
        )}

        {categories.length > 0 ? (
          /* Strict 2-column grid with gap-1 and no outer borders on the cards */
<div className="grid grid-cols-2 gap-4 ">
  {categories.map((category) => {
    const slug = toSlug(category.name);
    const imageUrl = category.coverpath
      ? `http://127.0.0.1:8000/storage/${category.coverpath}`
      : null;

    return (
      <Link
        key={category.id}
        to={`/category/${slug}`}
        className="group flex flex-col h-full overflow-hidden bg-[#1a1715] transition-all duration-500"
      >
        {/* Fixed Image Size */}
        <div className="relative h-72 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-900/40 to-purple-900/40" />
          )}

          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/40" />
        </div>

        {/* Black Footer */}
        <div className="flex text-center flex-col justify-between flex-1 bg-black p-5">
          <div>
           

            <p className="text-white/60 text-sm leading-relaxed line-clamp-2 min-h-[40px]">
              {category.description ||
                "Explore our collection of specialized projects."}
            </p>
          </div>

          
        </div>
      </Link>
    );
  })}
</div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-white/40">No categories available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}