// src/components/AnnouncementBar.jsx
import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-gradient-to-r bg-[#c1b1a2] text-[#2d2926] text-sm font-medium py-2 px-6 text-center flex justify-center items-center relative z-50 transition-all duration-500">
      <p>
        🎉 Early Bird Offer: Free Teaser Video with Every Wedding Package!
      </p>
      <button
        className="absolute right-4 hover:text-[#f2f2f2] cursor-pointer transition"
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
      >
        <X size={18} />
      </button>
    </div>
  );
}
