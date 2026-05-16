// src/components/Testimonials.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "../utils/useScrollReveal";

const testimonials = [
  {
    name: "Neha P",
    role: "Bride",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    content:
      "The photos captured our special day perfectly! Every moment felt alive and full of emotion. Highly recommend for weddings.",
  },
  {
    name: "Aarav & Priya",
    role: "Engagement Couple",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
    content:
      "They made our engagement shoot so fun and memorable. The lighting, angles, and creativity were amazing!",
  },
  {
    name: "Karan S",
    role: "Groom",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    content:
      "Professional, punctual, and incredibly talented. The final photos made our wedding day unforgettable.",
  },
  {
    name: "Ravi Ahir",
    role: "Client",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    content: "Absolutely breathtaking photos! They captured the pure joy of the day.", 
  },
];

export default function Testimonials() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="bg-[var(--text-color)] py-20 md:py-24 relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="reveal" style={{ "--reveal-delay": "150ms" }}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1500}
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              el: ".swiper-pagination-custom",
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} inline-block w-2 h-2 rounded-full mx-1.5 bg-gray-500 cursor-pointer transition-all duration-300"></span>`;
              },
            }}
            spaceBetween={30}
            slidesPerView={1}
            className="pb-12"
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx} className="cursor-grab active:cursor-grabbing">
                <div className="flex flex-col h-full min-h-[300px] justify-center md:px-8">
                  
                  {/* Top row: Avatar & Quote Icon */}
                  <div className="flex justify-between items-start mb-12">
                    {/* Diamond Avatar */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rotate-45 overflow-hidden border-2 border-[var(--bg-color)] rounded-xl shrink-0 relative mt-4 ml-4">
                      <img 
                        src={t.image} 
                        alt={t.name}
                        className="absolute top-1/2 left-1/2 w-[150%] h-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover -rotate-45"
                      />
                    </div>
                    
                    {/* Large Quote Icon */}
                    <div className="text-[var(--bg-color)] shrink-0">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 4H23V15H16V22L9 15V4Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Middle row: Quote Text */}
                  <p className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[var(--white-color)] leading-[1.3] mb-12">
                    {t.content}
                  </p>

                  {/* Bottom row: Author info */}
                  <div className="flex items-center gap-6 mt-auto">
                    <div className="w-10 h-[1px] bg-gray-500"></div>
                    <div className="text-sm md:text-base">
                      <span className="font-semibold text-[var(--white-color)]">{t.name}</span>
                      <span className="mx-2 text-gray-500">/</span>
                      <span className="text-gray-400">{t.role}</span>
                    </div>
                  </div>
                  
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Navigation and Pagination Container */}
        <div className="mt-8 md:mt-16 flex justify-between items-center md:px-8">
          {/* Pagination */}
          <div className="swiper-pagination-custom flex items-center h-12"></div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button className="swiper-button-prev-custom group relative flex items-center justify-center w-12 h-12 rounded-full border border-gray-600 hover:border-[var(--bg-color)] transition-all duration-300 overflow-hidden bg-transparent cursor-pointer">
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:-translate-x-8 transition-transform duration-300 ease-in-out absolute" />
              <ChevronLeft className="w-5 h-5 text-[var(--bg-color)] translate-x-8 group-hover:translate-x-0 transition-transform duration-300 ease-in-out absolute" />
            </button>
            <button className="swiper-button-next-custom group relative flex items-center justify-center w-12 h-12 rounded-full border border-gray-600 hover:border-[var(--bg-color)] transition-all duration-300 overflow-hidden bg-transparent cursor-pointer">
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-8 transition-transform duration-300 ease-in-out absolute" />
              <ChevronRight className="w-5 h-5 text-[var(--bg-color)] -translate-x-8 group-hover:translate-x-0 transition-transform duration-300 ease-in-out absolute" />
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
}
