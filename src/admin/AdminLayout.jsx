import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex bg-[#0b0908] text-white">
      
      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        
        {/* Header */}
        <header className="sticky top-0 z-20 bg-[#111111]/90 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            
            <div className="flex items-center gap-4">
              {isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="text-white/70 hover:text-purple-400 transition"
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

              <div>
                <p className="text-purple-400 uppercase tracking-[0.25em] text-[10px]">
                  Dashboard
                </p>
                <h1 className="text-lg md:text-xl font-semibold">
                  Admin Panel
                </h1>
              </div>
            </div>

            {/* Right side badge */}
            <div className="hidden md:flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 rounded-full border border-white/5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs text-white/60">Online</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 bg-[#0b0908]">
          <div className="rounded-2xl border border-white/5 bg-[#141414] min-h-full p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;