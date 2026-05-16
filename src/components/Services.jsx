import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const containerRef = useRef(null);

  const services = [
    {
      title: "Wedding Photography",
      desc: "Candid and timeless captures of your big day.",
      link: "/services/wedding",
    },
    {
      title: "Engagement Shoots",
      desc: "Celebrate your love story with cinematic frames.",
      link: "/services/engagement",
    },
    {
      title: "Pre-Wedding Films",
      desc: "Your love story, told through a cinematic lens.",
      link: "/services/pre-wedding",
    },
    {
      title: "Event Coverage",
      desc: "From family gatherings to grand receptions, we cover it all.",
      link: "/services/event-coverage",
    },
    {
      title: "Maternity Shoot",
      desc: "Beautiful portraits of motherhood and love.",
      link: "/services/maternity",
    },
    {
      title: "Simant (Baby Shower)",
      desc: "Cherish the joy of welcoming your little one.",
      link: "/services/simant",
    },
    {
      title: "Destination Photography",
      desc: "Stunning visuals from dream locations worldwide.",
      link: "/services/destination",
    },
    {
      title: "DOP & Film Projects",
      desc: "Cinematic visuals for music videos and short films.",
      link: "/services/dop-projects",
    },
  ];

  // Alternating themes matching site brand
  const themeColors = [
    { 
      bg: "bg-[var(--bg-color)]", 
      text: "text-[var(--text-color)]", 
      btnBg: "bg-[var(--text-color)]", 
      btnText: "text-[var(--white-color)]", 
      btnHoverText: "group-hover:text-[var(--text-color)]",
      btnHoverBg: "bg-[var(--bg-color)]"
    },
    { 
      bg: "bg-[var(--text-color)]", 
      text: "text-[var(--white-color)]", 
      btnBg: "bg-[var(--white-color)]", 
      btnText: "text-[var(--text-color)]", 
      btnHoverText: "group-hover:text-[var(--white-color)]",
      btnHoverBg: "bg-[var(--bg-color)]"
    },
    { 
      bg: "bg-[var(--white-color)]", 
      text: "text-[var(--text-color)]", 
      btnBg: "bg-[var(--text-color)]", 
      btnText: "text-[var(--white-color)]", 
      btnHoverText: "group-hover:text-[var(--text-color)]",
      btnHoverBg: "bg-[var(--bg-color)]"
    },
  ];

  useGSAP(() => {
    const panels = gsap.utils.toArray(".gsap-panel");
    
    // Layered pinning: each panel pins when it hits the top, EXCEPT the last one.
    // By NOT pinning the last one, it seamlessly scrolls up to reveal the next section
    // without forcing the user to scroll an extra 100vh on a static screen.
    panels.forEach((panel, i) => {
      if (i !== panels.length - 1) {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top", 
          pin: true, 
          pinSpacing: false, // false is key for the stacking effect
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-[var(--white-color)]" id="services">
      {/* Intro Panel - Changed to a normal sized header to reduce empty space */}
      <div className="relative pt-12 pb-24 md:pb-32 w-full flex flex-col justify-center items-center text-center px-6 bg-[var(--white-color)] z-0">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-color)] mb-6">
          Our Services
        </h2>
        <p className="text-[var(--text-color)] max-w-2xl mx-auto text-xl md:text-2xl opacity-80 font-light leading-relaxed">
          Tailored photography & videography packages designed to make your
          special day unforgettable.
        </p>
      </div>

      {/* Service Stacked Panels */}
      {services.map((service, index) => {
        const theme = themeColors[index % themeColors.length];
        return (
          <div 
            key={index}
            className={`gsap-panel relative h-[100lvh] w-full flex flex-col justify-center items-center px-6 shadow-[0_-15px_30px_rgba(0,0,0,0.15)] ${theme.bg}`}
            style={{ zIndex: index + 1 }}
          >
            <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
              <p className={`text-lg md:text-xl font-medium tracking-widest uppercase mb-4 opacity-70 ${theme.text}`}>
                0{index + 1} / 0{services.length}
              </p>
              <h3 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${theme.text}`}>
                {service.title}
              </h3>
              <p className={`text-xl md:text-2xl mb-12 opacity-90 max-w-3xl font-light leading-relaxed ${theme.text}`}>
                {service.desc}
              </p>
              <Button 
                link={service.link} 
                text="Explore Details"
                bgClass={theme.btnBg}
                textClass={theme.btnText}
                hoverTextClass={theme.btnHoverText}
                hoverBgClass={theme.btnHoverBg}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
