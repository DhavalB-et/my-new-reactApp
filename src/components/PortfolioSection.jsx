import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import weddingImg from "../assets/wedding.jpg";
import fashionImg from "../assets/fashion.jpg";
import eventImg from "../assets/event.jpg";
import maternityImg from "../assets/maternity.jpg";
import garmentImg from "../assets/garment.jpg";

const PortfolioSection = () => {
  const photos = [
    { src: weddingImg, title: "Wedding Photography" },
    { src: fashionImg, title: "Fashion Photography" },
    { src: eventImg, title: "Event Photography" },
    { src: maternityImg, title: "Maternity Shoot" },
    { src: garmentImg, title: "Garment Shoot" },
  ];

  return (
    <section className="py-16 px-6 md:px-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-4">
            Capturing Emotions, Not Just Photos
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
                Every picture tells a story — your story. From weddings to maternity,
                from intimate portraits to grand events, we focus on capturing real
                emotions that last a lifetime. Let’s make your memories timeless.
          </p>

          {/* SKILL BARS */}
          <div className="space-y-5">
            <SkillBar label="Wedding Photography" percent={95} />
            <SkillBar label="Fashion Photography" percent={85} />
            <SkillBar label="Event Photography" percent={90} />
          </div>
        </div>

        {/* RIGHT SIDE - SLIDER */}
        <div className="rounded-2xl overflow-hidden shadow-md">
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
      ></div>
    </div>
  </div>
);

export default PortfolioSection;
