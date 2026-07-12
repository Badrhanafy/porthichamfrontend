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

       

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="min-h-full rounded-2xl border border-white/5 bg-[#141414] p-5 md:p-8">
            <Outlet />
          </div>
        </main>

       
      </div>
    </div>
  );
}