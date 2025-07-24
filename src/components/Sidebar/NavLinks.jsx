import { NavLink } from "react-router-dom";
import { Clock } from "lucide-react";

import {
  LayoutDashboard,
  FileText,
  BarChart,
  PlusCircle,
  Settings
} from "lucide-react";

const navItems = [
  { path: "/", name: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { path: "/analytics", name: "Analytics", icon: <BarChart size={18} /> },
  { path: "/settings", name: "Settings", icon: <Settings size={18} /> },
  { path: "/description", name: "Description", icon: <FileText size={18} /> },
  { path: "/reminders", name: "Reminders", icon: <Clock size={18} /> },
  { path: "/add-subscription", name: "Add Subscription", icon: <PlusCircle size={18} /> },

];

const NavLinks = ({ isOpen }) => (
  <nav className="mt-4 space-y-2">
    {navItems.map((item) => (
      <NavLink
        to={item.path}
        key={item.name}
        className={({ isActive }) =>
          `group relative flex items-center gap-3 px-4 py-2 hover:bg-emerald-800 transition-colors border-l-4 ${isActive
            ? "border-white bg-emerald-800 font-semibold"
            : "border-transparent"
          }`
        }
      >
        {item.icon}
        <span
          className={`transition-all duration-200 ${isOpen ? "inline" : "hidden sm:hidden"
            }`}
        >
          {item.name}
        </span>

        {!isOpen && (
          <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-emerald-900 text-white text-sm px-2 py-1 rounded shadow-lg hidden sm:group-hover:block z-50">
            {item.name}
          </span>
        )}
      </NavLink>
    ))}
  </nav>
);

export default NavLinks;
