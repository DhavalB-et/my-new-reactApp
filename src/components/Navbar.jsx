import { useState, useEffect } from "react";
import { Menu, X, Instagram, Facebook, Mail } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";
import AnnouncementBar from "./AnnouncementBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // 🔹 Detect current page
  const location = useLocation();
  const isHome = location.pathname === "/"; // Homepage check

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup on unmount
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Handle sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Determine navbar style
  // When menu is open, we force the text and logo to be dark to contrast with the light overlay.
  const shouldBeTransparent = isHome && !isSticky && !isOpen;

  const NAV_LINKS = [
    { name: "Portfolio", path: "/projects", isHash: false },
    { name: "Our Story", path: "/about", isHash: false },
    { name: "Testimonials", path: "/#testimonials", isHash: true }
  ];

  /* ANIMATION CONFIGURATION */
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const linkContainerVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const linkItemVariants = {
    closed: { opacity: 0, y: 50 },
    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <>
      <header className="fixed w-full z-[60] transition-all duration-500">
        {/* Hide Announcement Bar smoothly when menu opens so it doesn't float above */}
        <div className={`transition-all duration-500 overflow-hidden ${isOpen ? "max-h-0 opacity-0" : "max-h-[50px] opacity-100"}`}>
           <AnnouncementBar />
        </div>

        <nav
          className={`transition-all duration-500 ${
            isOpen 
              ? "bg-transparent border-transparent shadow-none"
              : shouldBeTransparent
                ? "bg-transparent"
                : "backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm"
          }`}
        >
          <div
            className={`max-w-7xl mx-auto flex justify-between items-center px-6 transition-all duration-500 ${
              isSticky && !isOpen ? "py-3" : "py-5"
            }`}
          >
            {/* Logo */}
            <div className="flex items-center space-x-2 relative z-[70]">
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
              className={`hidden md:flex items-center text-xl space-x-8 font-medium transition-colors relative z-[70] ${
                shouldBeTransparent
                  ? "text-[var(--white-color)]"
                  : "text-[var(--text-color)]"
              }`}
            >
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  {!link.isHash ? (
                    <Link
                      to={link.path}
                      className="relative group transition-colors"
                    >
                      {link.name}
                      <span
                        className={`absolute left-0 bottom-[-4px] w-0 h-[2px] ${
                          shouldBeTransparent
                            ? "bg-[var(--white-color)]"
                            : "bg-[var(--text-color)]"
                        } group-hover:w-full transition-all duration-300`}
                      ></span>
                    </Link>
                  ) : (
                    <a
                      href={link.path}
                      className="relative group transition-colors"
                    >
                      {link.name}
                      <span
                        className={`absolute left-0 bottom-[-4px] w-0 h-[2px] ${
                          shouldBeTransparent
                            ? "bg-[var(--white-color)]"
                            : "bg-[var(--text-color)]"
                        } group-hover:w-full transition-all duration-300`}
                      ></span>
                    </a>
                  )}
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className={`group relative z-0 h-12 overflow-hidden rounded-[5px] px-6 py-3 text-[16px] text-[var(--white-color)] shadow-sm hover:shadow-md transition-all duration-300 ${
                    shouldBeTransparent
                      ? "bg-[var(--text-color)]"
                      : "bg-[var(--text-color)]"
                  }`}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--text-color)]">
                    Book a Shoot
                  </span>
                  <span className="absolute inset-0 overflow-hidden rounded-[5px]">
                    <span className="absolute left-0 aspect-square w-full origin-center translate-x-full rounded-full bg-[var(--bg-color)] transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                  </span>
                </Link>
              </li>
            </ul>

            {/* Mobile Hamburger */}
            <button
              className={`md:hidden relative z-[70] p-2 -mr-2 transition-colors ${
                shouldBeTransparent
                  ? "text-[var(--white-color)]"
                  : "text-[var(--text-color)]"
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {/* Added a subtle rotation transition to the icons */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <span className={`absolute transition-all duration-300 ${isOpen ? "rotate-180 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"}`}>
                  <Menu size={32} strokeWidth={1.5} />
                </span>
                <span className={`absolute transition-all duration-300 ${isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-180 opacity-0 scale-50"}`}>
                  <X size={32} strokeWidth={1.5} />
                </span>
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            style={{ backgroundColor: "var(--bg-color, #ffffff)" }}
            className="fixed inset-0 z-[50] flex flex-col justify-center items-center md:hidden"
          >
            {/* The Links */}
            <motion.ul 
              variants={linkContainerVariants}
              className="flex flex-col items-center space-y-10 w-full px-6"
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.name} variants={linkItemVariants} className="overflow-hidden">
                  {!link.isHash ? (
                   <Link
                    to={link.path}
                    className="inline-block text-5xl sm:text-6xl font-extrabold text-[var(--text-color)] hover:text-gray-500 transition-colors tracking-tight leading-tight"
                    onClick={() => setIsOpen(false)}
                   >
                     {link.name}
                   </Link>
                  ) : (
                   <a
                    href={link.path}
                    className="inline-block text-5xl sm:text-6xl font-extrabold text-[var(--text-color)] hover:text-gray-500 transition-colors tracking-tight leading-tight"
                    onClick={() => setIsOpen(false)}
                   >
                     {link.name}
                   </a>
                  )}
                </motion.li>
              ))}
              
              <motion.li variants={linkItemVariants} className="pt-8 overflow-hidden">
                <Link
                  to="/contact"
                  className="inline-block bg-[var(--text-color)] text-[var(--white-color)] px-10 py-4 rounded-full text-xl font-medium hover:bg-gray-800 transition-colors shadow-lg active:scale-95 duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Book a Shoot
                </Link>
              </motion.li>
            </motion.ul>

            {/* Mobile Menu Footer (Socials / Contact) */}
            <motion.div 
               variants={linkContainerVariants} // Reuse container variants for stagger
               className="absolute bottom-10 w-full px-10 flex flex-col items-center space-y-5"
            >
                <motion.div variants={linkItemVariants} className="flex flex-col items-center">
                  <div className="w-16 h-[2px] bg-gray-300 mb-4 rounded-full"></div>
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest">Get in touch</p>
                </motion.div>
                
                <motion.div variants={linkItemVariants} className="flex space-x-8 text-[var(--text-color)]">
                   <a href="https://www.instagram.com/kanaiya_films_" className="hover:-translate-y-1 hover:text-gray-500 transition-all duration-300"><Instagram size={28} strokeWidth={1.5} /></a>
                   <a href="https://www.instagram.com/kanaiya_films_" className="hover:-translate-y-1 hover:text-gray-500 transition-all duration-300"><Facebook size={28} strokeWidth={1.5} /></a>
                   <a href="mailto:kanaiyafilms367@gmail.com" className="hover:-translate-y-1 hover:text-gray-500 transition-all duration-300"><Mail size={28} strokeWidth={1.5} /></a>
                </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
