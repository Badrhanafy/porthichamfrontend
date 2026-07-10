import { NavLink } from "react-router-dom";

export default function AdminSidebar({ isOpen, onClose }) {

 const navItems = [
  {
    path: "/adminspcaeforuploadmediav1_notsecuredatall/add-project",
    label: "Add Project",
    icon: "📝",
  },
  {
    path: "/adminspcaeforuploadmediav1_notsecuredatall/manage-projects",
    label: "Manage Projects",
    icon: "📋",
  },
  {
    path: "/adminspcaeforuploadmediav1_notsecuredatall/manage-categories",
    label: "Manage Categories",
    icon: "🏷️",
  },
  {
    path: "/adminspcaeforuploadmediav1_notsecuredatall/add-category",
    label: "Add Category",
    icon: "🏷️",
  },
];

  return (
    <>

      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/60 backdrop-blur-sm
          transition-opacity duration-300
          md:hidden
          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Sidebar */}

      <aside
        className={`
          fixed top-0 left-0 z-50
          flex h-screen w-72 flex-col
          border-r border-white/5
          bg-[#111111]
          transition-transform duration-300

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">

          <div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-purple-400">
              Control
            </p>

            <h2 className="text-lg font-semibold text-white">
              Admin Panel
            </h2>

          </div>

          <button
            onClick={onClose}
            className="text-white md:hidden"
          >
            ✕
          </button>

        </div>

        {/* Menu */}

        <nav className="flex-1 space-y-2 p-4">

          {navItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `
                  flex items-center gap-3 rounded-xl px-4 py-3 transition

                  ${
                    isActive
                      ? "border border-purple-500/20 bg-purple-500/10 text-purple-400"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }
                `
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>

              <span>{item.label}</span>

            </NavLink>

          ))}

        </nav>

        {/* Footer */}

        <div className="border-t border-white/5 p-5">

          <div className="rounded-xl border text border-white/5 bg-[#181818] p-4">

            <p style={{letterSpacing:"1.4px"}} className="text-white/60">
              El hachimi Films
            </p>

          </div>

        </div>

      </aside>

    </>
  );
}