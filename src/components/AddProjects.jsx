// src/components/AddProject.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function AddProject() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);
  const [file, setFile] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validation
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "video/mp4", "video/webm", "video/quicktime"];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please select a valid image (JPEG, PNG, GIF, WEBP) or video (MP4, WEBM, MOV)");
      setFile(null);
      setIsVideo(false);
      setPreviewUrl(null);
      return;
    }

    if (selectedFile.size > 300 * 1024 * 1024) {
      setError("File size must be less than 50MB");
      return;
    }

    setError("");
    setFile(selectedFile);

    const type = selectedFile.type;
    const isVideoFile = type.startsWith("video/");
    setIsVideo(isVideoFile);

    // Create preview URL
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // Cleanup old preview URL on next change
    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const resetForm = () => {
    setForm({ title: "", description: "", category_id: "" });
    setFile(null);
    setIsVideo(false);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Project title is required");
      return;
    }
    if (!form.category_id) {
      setError("Please select a category");
      return;
    }
    if (!file) {
      setError("Please select a file (image or video)");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title.trim());
    formData.append("description", form.description.trim());
    formData.append("file", file);
    formData.append("is_video", isVideo ? "1" : "0");
    formData.append("category_id", form.category_id);

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/projects`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 300000, // 60 seconds
      });

      console.log("Upload success:", response.data);
      alert("✅ Project added successfully!");
      resetForm();
    } catch (err) {
      console.error("Upload error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Failed to upload project";
      setError(errorMsg);
      alert(`❌ Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="bg-[#141414]/80 px-6 py-8 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Add New Project
          </h2>
          <p className="text-blue-100 mt-2 text-sm sm:text-base">
            Share your work with the world – upload images or videos
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
              placeholder="e.g., E-commerce Website Redesign"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
              placeholder="Describe your project, technologies used, challenges, etc."
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            {loadingCategories ? (
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm py-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading categories...
              </div>
            ) : categories.length === 0 ? (
              <div className="flex items-center gap-2 rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 px-4 py-3">
                <svg className="h-4 w-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  No categories found.{" "}
                  <a href="/adminspcaeforuploadmediav1_notsecuredatall/add-category" className="font-semibold underline hover:no-underline">Create a category first</a>.
                </p>
              </div>
            ) : (
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2  bg-[#141414] dark:text-white transition"
                required
              >
                <option value="">-- Select a category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Media File (Image or Video) <span className="text-red-500">*</span>
            </label>
            <div
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-400 transition cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const droppedFile = e.dataTransfer.files[0];
                if (droppedFile) {
                  const fakeEvent = { target: { files: [droppedFile] } };
                  handleFileChange(fakeEvent);
                }
              }}
            >
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Click to upload</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF, WEBP, MP4, WEBM up to 50MB
                </p>
              </div>
            </div>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview:</p>
              {isVideo ? (
                <video
                  src={previewUrl}
                  controls
                  className="w-full max-h-64 rounded object-contain"
                />
              ) : (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-h-64 object-contain rounded"
                />
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">
                {file?.name} ({(file?.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              "Publish Project"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}