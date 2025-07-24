import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from "../Sidebar/Sidebar";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [showSidebar, setShowSidebar] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Analytics", path: "/analytics" },
    { name: "Settings", path: "/settings" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setMenuOpen(false);
      setShowSidebar(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-slate-700 text-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-emerald-400">SubMind</Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-sm font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-emerald-300 transition duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Icon */}
          <div
            className="md:hidden text-2xl cursor-pointer z-20"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-emerald-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-6 py-3 text-white hover:bg-emerald-700"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Sidebar with visibility control */}
      <Sidebar
        isMobile={isMobile}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        isHeaderMenuOpen={menuOpen}
      />

      {/* Sidebar Toggle Button (mobile only) */}
      {isMobile && !menuOpen && !showSidebar && (
        <button
          className="fixed top-20 left-4 z-40 text-emerald-700"
          onClick={() => setShowSidebar(true)}
        >
          <FiMenu size={26} />
        </button>
      )}
    </>
  );
};

export default Header;
