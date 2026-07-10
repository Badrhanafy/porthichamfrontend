import { useEffect, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Get page information based on current route
  const getPageInfo = () => {
    const path = location.pathname;
    const pageMap = {
      "add-project": {
        title: "Add New Project",
        description: "Upload and share new projects",
        icon: "📝"
      },
      "manage-projects": {
        title: "Manage Projects",
        description: "View, edit, and remove your projects",
        icon: "📋"
      },
      "manage-categories": {
        title: "Manage Categories",
        description: "Create, edit, and organize your categories",
        icon: "🏷️"
      },
      "add-category": {
        title: "Add Category",
        description: "Create new project categories",
        icon: "🏷️"
      }
    };

    const key = Object.keys(pageMap).find(key => path.includes(key));
    return key ? pageMap[key] : {
      title: "Admin Panel",
      description: "Manage your content",
      icon: "⚙️"
    };
  };

  const pageInfo = getPageInfo();

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
            aria-label="Open sidebar"
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
        <header 
          className={`
            sticky top-0 z-30 h-16 border-b border-white/5 
            transition-all duration-300
            ${isScrolled 
              ? 'bg-[#111111]/95 backdrop-blur-lg shadow-lg' 
              : 'bg-[#111111]/90 backdrop-blur-md'
            }
          `}
        >
          <div className="flex h-full items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-4">
              {/* Desktop: Toggle sidebar button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hidden md:block text-white/40 hover:text-white transition p-1 rounded-lg hover:bg-white/5"
                aria-label="Toggle sidebar"
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

              {/* Page Title Section */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-purple-400 flex items-center gap-2">
                  <span>{pageInfo.icon}</span>
                  <span>{pageInfo.description}</span>
                </p>
                <h1 className="text-lg font-semibold">
                  {pageInfo.title}
                </h1>
              </div>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
              {/* Status Badge */}
              <div className="hidden md:flex items-center gap-2 rounded-full border border-white/5 bg-[#1a1a1a] px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-white/60">
                  Online
                </span>
              </div>

              {/* Quick Actions */}
              <Link
                to="/"
                className="hidden sm:flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                View Site
              </Link>
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
            <div className="flex items-center gap-4">
              <span>© {new Date().getFullYear()} El hachimi Films</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">All rights reserved</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Version 1.0.0</span>
              <span className="hidden md:inline">•</span>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-white transition"
              >
                ↑ Back to top
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}