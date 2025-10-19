import React, { useState, useEffect } from "react";

const WhatsAppButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
    className={`group fixed bottom-6 right-6 z-50 transition-opacity duration-500 ${
        showButton
        ? "opacity-100 animate-[bounce-in_0.6s_ease-out]"
        : "opacity-0 pointer-events-none"
    }`}
    >
      {/* Tooltip */}
      <span className="absolute right-14 bottom-9 w-[110px] bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
        Chat with us
      </span>

      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/916353611634?text=Hey%20there!%20I%27m%20interested%20in%20your%20photography%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.52 3.48A11.77 11.77 0 0012 .25 11.75 11.75 0 00.25 12c0 2 .53 4 1.53 5.74L0 24l6.38-1.67A11.76 11.76 0 0012 23.75a11.75 11.75 0 0011.75-11.75 11.77 11.77 0 00-3.23-8.52zM12 21.5a9.48 9.48 0 01-4.85-1.33l-.35-.2-3.8 1L4 17.22l-.23-.36A9.48 9.48 0 012.5 12 9.5 9.5 0 1112 21.5zm5.26-7.27c-.29-.15-1.7-.83-1.96-.92-.26-.1-.45-.15-.64.15-.19.29-.74.92-.9 1.11-.17.19-.33.21-.62.07-.29-.15-1.22-.45-2.33-1.44-.86-.76-1.45-1.7-1.62-1.99-.17-.29-.02-.44.13-.59.14-.14.29-.33.44-.49.15-.17.19-.29.29-.48.1-.19.05-.36-.03-.51-.08-.15-.64-1.54-.88-2.1-.23-.55-.47-.48-.64-.48h-.55c-.19 0-.48.07-.73.36-.25.29-.96.94-.96 2.29s.98 2.66 1.12 2.85c.15.19 1.91 2.93 4.63 4.11.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.7-.69 1.94-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.55-.34z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
