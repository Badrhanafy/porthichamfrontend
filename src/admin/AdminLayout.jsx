import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("add-project")) return "Add New Project";
    if (path.includes("manage-projects")) return "Manage Projects";
    if (path.includes("add-category")) return "Add Category";
    return "Admin Panel";
  };

  // Get page description based on current route
  const getPageDescription = () => {
    const path = location.pathname;
    if (path.includes("add-project")) return "Upload and share new projects";
    if (path.includes("manage-projects")) return "View, edit, and remove your projects";
    if (path.includes("add-category")) return "Create new project categories";
    return "Manage your content";
  };

  return (
    <div className="flex min-h-screen bg-[#0b0908] text-white">

      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 md:ml-72">
        {/* Mobile Menu Button */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="
              fixed top-4 left-4 z-[60]
              md:hidden
              flex items-center justify-center
              w-11 h-11
              rounded-xl
              bg-[#181818]
              border border-white/10
              text-white
              shadow-lg
              transition
              hover:bg-[#232323]
              active:scale-95
            "
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        {/* Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-white/5 bg-[#111111]/90 backdrop-blur-md">
          <div className="flex h-full items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-4">
              {/* Desktop: Show menu button when sidebar is closed */}
              {isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="hidden md:block text-white/40 hover:text-white transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              )}

              {/* Page Title Section */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-purple-400">
                  {getPageDescription()}
                </p>
                <h1 className="text-lg font-semibold">
                  {getPageTitle()}
                </h1>
              </div>
            </div>

            {/* Status Badge */}
            <div className="hidden md:flex items-center gap-2 rounded-full border border-white/5 bg-[#1a1a1a] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-white/60">
                Online
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="min-h-full rounded-2xl border border-white/5 bg-[#141414] p-5 md:p-8">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-[#111111]/50 backdrop-blur-md py-4 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/40">
            <span>© {new Date().getFullYear()} El hachimi Films. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
}