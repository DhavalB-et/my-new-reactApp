import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom"; // <-- Add this if using React Router
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";
import AnnouncementBar from "./AnnouncementBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // 🔹 Detect current page
  const location = useLocation();
  const isHome = location.pathname === "/"; // Homepage check

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Determine navbar style
  const shouldBeTransparent = isHome && !isSticky;

  return (
    <header className="fixed w-full z-50 transition-all duration-500">
      <AnnouncementBar />

      <nav
        className={`transition-all duration-500 ${
          shouldBeTransparent
            ? "bg-transparent"
            : "backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex justify-between items-center px-6 transition-all duration-500 ${
            isSticky ? "py-3" : "py-5"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/">
            <img
              src={shouldBeTransparent ? logoLight : logoDark}
              alt="MySite Logo"
              className="h-18 w-auto transition-all duration-500"
            />
            </a>
          </div>

          {/* Desktop Menu */}
          <ul
            className={`hidden md:flex items-center text-xl space-x-8 font-medium transition-colors ${
              shouldBeTransparent
                ? "text-[var(--white-color)]"
                : "text-[var(--text-color)]"
            }`}
          >
            {["Projects", "About", "Testimonials", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative group transition-colors"
                >
                  {item}
                  <span
                    className={`absolute left-0 bottom-[-4px] w-0 h-[2px] ${
                      shouldBeTransparent
                        ? "bg-[var(--white-color)]"
                        : "bg-[var(--text-color)]"
                    } group-hover:w-full transition-all duration-300`}
                  ></span>
                </a>
              </li>
            ))}
            <li>
              <a
                href="#get-started"
                className={`group relative z-0 h-12 overflow-hidden rounded-[5px] px-6 py-3 text-[16px] text-[var(--white-color)] shadow-sm hover:shadow-md transition-all duration-300 ${
                  shouldBeTransparent
                    ? "bg-[var(--text-color)]"
                    : "bg-[var(--text-color)]"
                }`}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--text-color)]">
                  Get Started
                </span>
                <span className="absolute inset-0 overflow-hidden rounded-[5px]">
                  <span className="absolute left-0 aspect-square w-full origin-center translate-x-full rounded-full bg-[var(--bg-color)] transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                </span>
              </a>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden transition-colors ${
              shouldBeTransparent
                ? "text-[var(--white-color)]"
                : "text-[var(--text-color)]"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } ${
            shouldBeTransparent
              ? "bg-[var(--text-color)]"
              : "bg-[var(--text-white)] backdrop-blur-md"
          }`}
        >
          <ul
            className={`flex flex-col space-y-4 px-6 py-4 font-medium transition-colors ${
              shouldBeTransparent
                ? "text-[var(--text-color)] bg-[var(--bg-color)]"
                : "text-[var(--text-color)] bg-[var(--text-white)]"
            }`}
          >
            {["Projects", "About", "Testimonials", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="block hover:text-[var(--text-color)] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#get-started"
                className={`block text-center py-2 rounded-full transition ${
                  shouldBeTransparent
                    ? "bg-[var(--text-color)] text-[var(--white-color)] hover:bg-[var(--bg-color)] hover:text-[var(--text-color)]"
                    : "bg-[var(--text-color)] text-[var(--white-color)] hover:bg-[var(--bg-color)] hover:text-[var(--text-color)]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
