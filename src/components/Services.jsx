export default function ServicesSection() {
  const services = [
    {
      title: "Wedding Photography",
      desc: "Candid and timeless captures of your big day.",
      link: "/wedding",
    },
    {
      title: "Engagement Shoots",
      desc: "Celebrate your love story with cinematic frames.",
      link: "/engagement",
    },
    {
      title: "Pre-Wedding Films",
      desc: "Your love story, told through a cinematic lens.",
      link: "/pre-wedding",
    },
    {
      title: "Event Coverage",
      desc: "From family gatherings to grand receptions, we cover it all.",
      link: "/event-coverage",
    },
    {
      title: "Maternity Shoot",
      desc: "Beautiful portraits of motherhood and love.",
      link: "/maternity",
    },
    {
      title: "Simant (Baby Shower)",
      desc: "Cherish the joy of welcoming your little one.",
      link: "/simant",
    },
    {
      title: "Destination Photography",
      desc: "Stunning visuals from dream locations worldwide.",
      link: "/destination",
    },
    {
      title: "DOP & Film Projects",
      desc: "Cinematic visuals for music videos and short films.",
      link: "/dop-projects",
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#f2f8fc]">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-4">
          Our Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-base md:text-lg">
          Tailored photography & videography packages designed to make your
          special day unforgettable.
        </p>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.link}
              className="relative bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Curved Accent Line (gradient effect) */}
              <div className="absolute inset-0 rounded-2xl">
                <div className="absolute left-0 top-0 h-full w-[6px] rounded-l-2xl bg-[var(--text-color)] transition-colors duration-300 group-hover:bg-[var(--bg-color)]"></div>
              </div>

              {/* Card Content */}
              <div className="relative flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{service.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
