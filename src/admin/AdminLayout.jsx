import { useEffect, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
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

    // Update clock every minute
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(clockInterval);
    };
  }, []);

  // Get page information based on current route
  const getPageInfo = () => {
    const path = location.pathname;
    const pageMap = {
      "add-project": {
        title: "Add New Project",
        description: "Upload and share new projects",
        icon: "📝",
        gradient: "from-blue-600 to-indigo-600"
      },
      "manage-projects": {
        title: "Manage Projects",
        description: "View, edit, and remove your projects",
        icon: "📋",
        gradient: "from-emerald-600 to-teal-600"
      },
      "manage-categories": {
        title: "Manage Categories",
        description: "Create, edit, and organize your categories",
        icon: "🏷️",
        gradient: "from-purple-600 to-pink-600"
      },
      "add-category": {
        title: "Add Category",
        description: "Create new project categories",
        icon: "🏷️",
        gradient: "from-purple-600 to-pink-600"
      }
    };

    const key = Object.keys(pageMap).find(key => path.includes(key));
    return key ? pageMap[key] : {
      title: "Admin Panel",
      description: "Manage your content",
      icon: "⚙️",
      gradient: "from-gray-600 to-gray-800"
    };
  };

  const pageInfo = getPageInfo();

  // Format time
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

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

              {/* Page Title Section with Gradient Accent */}
              <div className="relative">
                <div className={`absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b ${pageInfo.gradient}`}></div>
                <div className="pl-2">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-purple-400 flex items-center gap-2">
                    <span className="text-sm">{pageInfo.icon}</span>
                    <span>{pageInfo.description}</span>
                  </p>
                  <h1 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {pageInfo.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
              {/* Date & Time */}
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-xs font-medium text-white/80">{formattedTime}</span>
                <span className="text-[10px] text-white/40">{formattedDate}</span>
              </div>

              {/* Status Badge */}
              <div className="hidden md:flex items-center gap-2 rounded-full border border-white/5 bg-[#1a1a1a] px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-white/60">
                  Online
                </span>
              </div>

              {/* Quick Actions Dropdown */}
              <div className="relative group">
                <button className="hidden sm:flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                  Quick Actions
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <Link
                      to="/adminspcaeforuploadmediav1_notsecuredatall/add-project"
                      className="block px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
                    >
                      📝 Add Project
                    </Link>
                    <Link
                      to="/adminspcaeforuploadmediav1_notsecuredatall/manage-projects"
                      className="block px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
                    >
                      📋 Manage Projects
                    </Link>
                    <Link
                      to="/adminspcaeforuploadmediav1_notsecuredatall/manage-categories"
                      className="block px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
                    >
                      🏷️ Manage Categories
                    </Link>
                    <Link
                      to="/adminspcaeforuploadmediav1_notsecuredatall/add-category"
                      className="block px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
                    >
                      ➕ Add Category
                    </Link>
                    <div className="border-t border-white/5"></div>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
                    >
                      🌐 View Site
                    </Link>
                  </div>
                </div>
              </div>

              {/* User Avatar */}
              <div className="hidden md:block">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                  EH
                </div>
              </div>
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
              <span className="hidden lg:inline">•</span>
              <span className="hidden lg:inline">Made with ❤️</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Version 1.0.0
              </span>
              <span className="hidden md:inline">•</span>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-white transition flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Back to top
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}