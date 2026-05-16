import { useScrollReveal } from "../utils/useScrollReveal";

const VideoSection = () => {
  const ref = useScrollReveal({ threshold: 0.1 });

  // Placeholder URLs since none were provided in the prompt.
  // The user can easily swap these out with their actual YouTube video IDs or URLs.
  const videoIds = [
    "dQw4w9WgXcQ", // Placeholder 1 
    "jfKfPfyJRdk", // Placeholder 2
    "dQw4w9WgXcQ"  // Placeholder 3
  ];

  return (
    <section ref={ref} className="py-20 md:py-24 px-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-color)] mb-6">
            Cinematic Highlights
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
            Relive the magic of our most cherished moments through cinematic storytelling. 
            Every frame is crafted with emotion, elegance, and pure passion.
          </p>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
        {videoIds.map((videoId, index) => (
          <div 
            key={index}
            className="reveal-scale relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 bg-black group"
            style={{ "--reveal-delay": `${(index + 1) * 150}ms` }}
          >
            {/* YouTube Embed */}
            <iframe
              className="absolute inset-0 w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
              title={`Wedding Highlight Video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
