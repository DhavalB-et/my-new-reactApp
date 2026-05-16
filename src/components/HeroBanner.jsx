import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "../hero.css";
import engagementImg from "../assets/HP-images/engagement.jpg";
import engagementMobile from "../assets/HP-images/engagement1.jpg";
import weddingImg from "../assets/HP-images/wedding.jpg";
import weddingMobile from "../assets/HP-images/wedding1.jpg";
import prewedding from "../assets/HP-images/pre-wedding1.jpg";

// Pre-load ALL hero images immediately so the browser never lazy-evicts them
const heroImageCache = [];
function preloadImages(slides) {
  slides.forEach((slide) => {
    [slide.img, slide.imgMobile].forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
      heroImageCache.push(img); // hold reference so GC doesn't discard
    });
  });
}

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
      img: weddingImg,
      imgMobile: weddingMobile,
      btn_text: "Get Started",
      btn_link: "#",
    },
    {
      title: "Every love story deserves to be beautifully told",
      desc: "From the first glance to the lingering smile, our engagement shoots celebrate the beginning of your journey together.",
      img: engagementImg,
      imgMobile: engagementMobile,
      btn_text: "Explore Now",
      btn_link: "#",
    },
    {
      title: "Where moments speak louder than poses",
      desc: "Our candid shots are filled with genuine laughter, pure emotions, and unforgettable moments that tell your true story.",
      img: prewedding,
      btn_text: "Get Started",
      btn_link: "#",
    },
  ];

  // Track which images have fully decoded — drives the fade-in
  const [loadedMap, setLoadedMap] = useState(() => ({}));

  const handleImageLoad = (index) => {
    setLoadedMap((prev) => ({ ...prev, [index]: true }));
  };

  // Kick off eager preload for every slide on mount
  useEffect(() => {
    preloadImages(slides);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <div className="h-screen w-full relative flex flex-col justify-end text-center text-white overflow-hidden bg-black">
              {/* Placeholder shown until image decodes */}
              {!loadedMap[i] && (
                <div className="absolute inset-0 z-0 hero-placeholder" />
              )}

              {/* Native responsive HTML5 picture element */}
              <picture className="absolute inset-0 w-full h-full z-0">
                {slide.imgMobile && (
                  <source media="(max-width: 767px)" srcSet={slide.imgMobile} />
                )}
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover hero-slide-img"
                  fetchPriority={i === 0 ? "high" : "low"}
                  loading="eager"
                  decoding="async"
                  onLoad={() => handleImageLoad(i)}
                  style={{
                    opacity: loadedMap[i] ? 1 : 0,
                    transition: "opacity 0.5s ease",
                    willChange: "transform",
                  }}
                />
              </picture>

              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 max-md:h-[75%]" />

              <div className="relative z-20 px-6 pb-20 max-w-7xl w-full mx-auto text-left">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 drop-shadow-md text-[var(--white-color)] tracking-tight max-w-4xl">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-10 max-w-2xl drop-shadow-lg text-gray-200 leading-relaxed font-light">
                  {slide.desc}
                </p>
                <Button link="/contact" text="Book a Shoot" />
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
