import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState } from "react";

const CustomPaginationIcon = ({ active = false }) => (
  <svg
    width={active ? 25 : 20}
    height={active ? 25 : 20}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke={active ? "#C9A46A" : "#fff"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-all duration-300 ${active ? "scale-110" : "opacity-70"}`}
  >
    <path d="M21.4155 15.3411C18.5924 17.3495 14.8895 17.5726 11.877 16M2.58445 8.65889C5.41439 6.64566 9.12844 6.42638 12.1448 8.01149M15.3737 14.1243C18.2604 12.305 19.9319 8.97413 19.601 5.51222M8.58184 9.90371C5.72231 11.7291 4.06959 15.0436 4.39878 18.4878M15.5269 10.137C15.3939 6.72851 13.345 3.61684 10.1821 2.17222M8.47562 13.9256C8.63112 17.3096 10.6743 20.392 13.8177 21.8278M19.071 4.92893C22.9763 8.83418 22.9763 15.1658 19.071 19.071C15.1658 22.9763 8.83416 22.9763 4.92893 19.071C1.02369 15.1658 1.02369 8.83416 4.92893 4.92893C8.83418 1.02369 15.1658 1.02369 19.071 4.92893ZM14.8284 9.17157C16.3905 10.7337 16.3905 13.2663 14.8284 14.8284C13.2663 16.3905 10.7337 16.3905 9.17157 14.8284C7.60948 13.2663 7.60948 10.7337 9.17157 9.17157C10.7337 7.60948 13.2663 7.60948 14.8284 9.17157Z" />
  </svg>
);


export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const slides = [
    {
      title: "Capturing your forever in timeless frames",
      desc: "Relive the magic of your wedding day through stunning, heartfelt photography. We turn emotions into everlasting memories.",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
      btn_text: "Get Started",
      btn_link: "#",
    },
    {
      title: "Every love story deserves to be beautifully told",
      desc: "From the first glance to the lingering smile, our engagement shoots celebrate the beginning of your journey together.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
      btn_text: "Explore Now",
      btn_link: "#",
    },
    {
      title: "Where moments speak louder than poses",
      desc: "Our candid shots are filled with genuine laughter, pure emotions, and unforgettable moments that tell your true story.",
      img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80",
      btn_text: "Get Started",
      btn_link: "#",
    },
  ];

  return (
    <section className="relative w-full h-screen">
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-screen flex flex-col justify-end text-center text-white bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-gradient-to-t from-black/100 to-transparent max-md:h-full" />

              <div className="relative z-10 px-4 pb-16 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto drop-shadow">
                  {slide.desc}
                </p>
                <a
                  href={slide.btn_link}
                  className="group relative z-0 h-12 overflow-hidden rounded-[5px] bg-[var(--text-color)] px-10 py-3 text-[16px] text-[var(--white-color)] shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--text-color)]">
                    {slide.btn_text}
                  </span>
                  <span className="absolute inset-0 overflow-hidden rounded-[5px]">
                    <span className="absolute left-0 aspect-square w-full origin-center translate-x-full rounded-full bg-[var(--bg-color)] transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                  </span>
                </a>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 📸 Custom Camera Pagination */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-20 md:left-auto md:right-0 md:translate-x-0 px-10 max-md:bottom-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className="transition-transform hover:scale-110"
            aria-label={`Go to slide ${i + 1}`}
          >
            <CustomPaginationIcon active={i === activeIndex} />
          </button>
        ))}
      </div>

      
    </section>
  );
}
