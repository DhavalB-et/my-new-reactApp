// src/components/Services.jsx
export default function Services() {
  const services = [
    { title: "Web Development", desc: "Fast and scalable React apps." },
    { title: "UI Design", desc: "Beautiful Tailwind-based components." },
    { title: "Integrations", desc: "Seamless API & backend connections." },
  ];

  return (
    <section id="services" className="py-20 max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-12">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div key={i} className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">{s.title}</h3>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
