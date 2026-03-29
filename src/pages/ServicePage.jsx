import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getServiceImages } from "../utils/cloudinary";

const StatefulImage = ({ src, alt, onErrorCallback }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) return null;

  return (
    <img
      src={src}
      loading="lazy"
      className="w-full rounded-xl mb-6"
      alt={alt}
      onError={() => {
        setHasError(true);
        if (onErrorCallback) onErrorCallback();
      }}
    />
  );
};

const ServicePage = () => {
  const { slug } = useParams();
  const images = getServiceImages(slug);
  const [errorCount, setErrorCount] = useState(0);

  // Reset error count when navigating to a new service page
  useEffect(() => {
    setErrorCount(0);
  }, [slug]);

  const allImagesFailed = errorCount === images.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-10 capitalize">{slug}</h1>

      {allImagesFailed && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-500">No images available in this category yet.</h2>
          <p className="text-gray-400 mt-2">Check back later for beautiful moments!</p>
        </div>
      )}

      <div className={`columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 ${allImagesFailed ? 'hidden' : ''}`}>
        {images.map((src, index) => (
          <StatefulImage
            key={index}
            src={src}
            alt={`${slug} ${index + 1}`}
            onErrorCallback={() => setErrorCount((prev) => prev + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
