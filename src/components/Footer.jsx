import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logoDark from "../assets/logo-dark.svg";

const Footer = () => {
  return (
    <footer className="relative bg-[var(--bg-color)] text-[var(--text-color)]">
      {/* Wavy Top SVG */}
      <div className="absolute -top-[1px] left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.73-17.38-168.95-15.26-250.24,3.88-57.84,13.39-114,35.41-172,47.24C229,80,165.13,78,100.57,63.48,65.33,55.7,31,44.59,0,30.22V120H1200V95.8C1134.37,106.09,1059.43,111.55,985.66,92.83Z"
            fill="#ffffff" /* darker than bg-gray-900 for contrast */
          ></path>
        </svg>
      </div>

      {/* Footer Content */}
      <div className="relative px-6 py-16 md:px-12 md:py-20 grid md:grid-cols-3 gap-10 text-left">
        {/* Logo / About */}
        <div className="">
          <a href="/">
            <img
              src={logoDark}
              alt="MySite Logo"
              className="h-18 w-auto transition-all duration-500"
            />
          </a>
          <p className="text-[var(--text-color)] text-sm pt-8">
            Capturing life’s beautiful moments — from weddings to maternity, we create stories that last forever.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-[var(--text-color)]">
            <li>
              <a href="#about" className="hover:text-[var(--link-hover-color)] transition">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-[var(--link-hover-color)] transition">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" className="hover:text-[var(--link-hover-color)] transition">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[var(--link-hover-color)] transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-start md:justify-start gap-5 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--link-hover-color)] transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://www.instagram.com/kanaiya_films_"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--link-hover-color)] transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--link-hover-color)] transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://youtube.com/@kanaiyafilms367"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--link-hover-color)] transition"
            >
              <FaYoutube size={20} />
            </a>
          </div>
          <p className="text-sm text-[var(--text-color)]">
            Stay connected for our latest projects and behind-the-scenes stories.
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 py-2 text-center text-sm text-[var(--text-color)] px-3">
        © {new Date().getFullYear()} Kanaiya Films. All Rights Reserved. | Built by{" "}
        <a
          href="https://www.linkedin.com/in/dhaval-bhadarka/"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--link-hover-color)] hover:underline"
        >
          Dhaval Bhadarka
        </a>
      </div>
    </footer>
  );
};

export default Footer;
