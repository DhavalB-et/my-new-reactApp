import ServiceGallery from "../../components/ServiceGallery";

export default function Wedding() {
  return (
    <div className="pt-32 pb-20 md:pb-24 max-w-7xl mx-auto px-6 min-h-screen">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text-color)] mb-12 text-center capitalize">Wedding Photography</h1>
      <ServiceGallery service="wedding" />
    </div>
  );
}
