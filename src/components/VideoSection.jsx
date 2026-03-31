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
    <section ref={ref} className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto bg-gray-50/50">
      
      {/* Header */}
      <div className="reveal-fade mb-12 text-center" style={{ "--reveal-delay": "0ms" }}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-color)] tracking-tight mb-4">
          Cinematic Highlights
        </h2>
        <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl leading-relaxed">
          Relive the most beautiful moments. Press play to experience the magic of our wedding highlight films.
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
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
