// src/components/Testimonials.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Neha P",
    role: "Bride",
    rating: 5,
    content:
      "The photos captured our special day perfectly! Every moment felt alive and full of emotion. Highly recommend for weddings.",
  },
  {
    name: "Aarav & Priya",
    role: "Engagement Couple",
    rating: 5,
    content:
      "They made our engagement shoot so fun and memorable. The lighting, angles, and creativity were amazing!",
  },
  {
    name: "Karan S",
    role: "Groom",
    rating: 5,
    content:
      "Professional, punctual, and incredibly talented. The final photos made our wedding day unforgettable.",
  },
  {
    name: "Ravi Ahir",
    role: "Client",
    rating: 5,
    content: "Absolutely breathtaking photos! They captured the pure joy of the day.", 
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-16 relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-7">
          What Our Clients Say
        </h2>

        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 5000 }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!p-12"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx} className="flex">
              <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col justify-between w-full h-full min-h-[260px]">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    {Array(t.rating)
                      .fill(0)
                      .map((_, i) => (
                        <span key={i} className="text-yellow-500 text-lg">
                          ★
                        </span>
                      ))}
                  </div>

                  {t.content ? (
                    <p className="text-gray-700 mb-6">{`"${t.content}"`}</p>
                  ) : (
                    <div className="mb-6 h-[60px]" /> // placeholder space
                  )}
                </div>

                <div className="mt-auto">
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrows below the slider */}
        <div className="flex justify-center items-center gap-6 mt-6">
          <div className="swiper-button-prev-custom cursor-pointer p-2 bg-[var(--bg-color)] rounded-full shadow hover:bg-[var(--white-color)] hover:border-black-1">
            <ChevronLeft className="w-5 h-5 text-[var(--text-color)]" />
          </div>
          <div className="swiper-button-next-custom cursor-pointer p-2 bg-[var(--bg-color)] rounded-full shadow hover:bg-[var(--white-color)]">
            <ChevronRight className="w-5 h-5 text-[var(--text-color)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
