import { NavLink } from "react-router-dom";

const AdminSidebar = ({ isOpen, onClose }) => {
  const navItems = [
    {
      path: "/adminspcaeforuploadmediav1_notsecuredatall/add-project",
      label: "Add Project",
      icon: "📝",
    },
    {
      path: "/adminspcaeforuploadmediav1_notsecuredatall/add-category",
      label: "Add Category",
      icon: "🏷️",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-40 h-screen w-72 bg-[#111111] border-r border-white/5
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div>
            <p className="text-purple-400 uppercase tracking-[0.25em] text-[10px]">
              Control
            </p>
            <h2 className="text-white text-lg font-semibold">
              Admin Panel
            </h2>
          </div>

          <button
            onClick={onClose}
            className="md:hidden text-white/60 hover:text-purple-400 transition"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${
                  isActive
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }
              `
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-[#181818] border border-white/5 rounded-xl p-4">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
              Status
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-white/60 text-sm">System Active</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;