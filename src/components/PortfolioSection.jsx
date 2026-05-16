import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useScrollReveal } from "../utils/useScrollReveal";

import weddingImg from "../assets/wedding.jpg";
import fashionImg from "../assets/fashion.jpg";
import eventImg from "../assets/event.jpg";
import maternityImg from "../assets/maternity.jpg";
import garmentImg from "../assets/garment.jpg";

const PortfolioSection = () => {
  const ref = useScrollReveal();

  const photos = [
    { src: weddingImg, title: "Wedding Photography" },
    { src: fashionImg, title: "Fashion Photography" },
    { src: eventImg, title: "Event Photography" },
    { src: maternityImg, title: "Maternity Shoot" },
    { src: garmentImg, title: "Garment Shoot" },
  ];

  return (
    <section ref={ref} className="py-20 md:py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE — slides in from the left */}
        <div className="reveal-left">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-color)] mb-6">
            Capturing Emotions, Not Just Photos
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10">
            Every picture tells a story — your story. From weddings to maternity,
            from intimate portraits to grand events, we focus on capturing real
            emotions that last a lifetime. Let's make your memories timeless.
          </p>

          {/* SKILL BARS */}
          <div className="space-y-5">
            <SkillBar label="Wedding Photography" percent={95} />
            <SkillBar label="Fashion Photography" percent={85} />
            <SkillBar label="Event Photography" percent={90} />
          </div>
        </div>

        {/* RIGHT SIDE — slides in from the right */}
        <div className="reveal-right rounded-2xl overflow-hidden shadow-md" style={{ "--reveal-delay": "100ms" }}>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            spaceBetween={10}
            slidesPerView={1}
          >
            {photos.map((photo, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[380px] md:h-[450px]">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[var(--text-color)]/40 flex items-center justify-center">
                    <h3 className="text-[var(--white-color)] text-2xl font-semibold drop-shadow-lg">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

// SkillBar Component
const SkillBar = ({ label, percent }) => (
  <div>
    <div className="flex justify-between text-sm font-medium text-[var(--text-color)] mb-1">
      <span>{label}</span>
      <span>{percent}%</span>
    </div>
    <div className="w-full bg-[var(--white-color)] rounded-full h-2.5">
      <div
        className="bg-[var(--bg-color)] h-2.5 rounded-full"
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

export default PortfolioSection;
