import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getServiceImages } from "../utils/cloudinary";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const StatefulImage = ({ src, alt, index, onClick, onSuccess, onError }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) return null;

  return (
    <motion.img
      src={src}
      loading="lazy"
      initial={{ opacity: 0, filter: "blur(15px)", y: 20 }}
      animate={{ 
        opacity: isLoaded ? 1 : 0, 
        filter: isLoaded ? "blur(0px)" : "blur(15px)",
        y: isLoaded ? 0 : 20
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full cursor-pointer rounded-xl mb-6 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${!isLoaded ? 'min-h-[250px] bg-gray-100' : ''}`}
      alt={alt}
      onClick={() => isLoaded && onClick(index)}
      onLoad={() => {
        setIsLoaded(true);
        if (onSuccess) onSuccess();
      }}
      onError={() => {
        setHasError(true);
        if (onError) onError();
      }}
    />
  );
};

export default function ServicePage() {
  const { slug } = useParams();
  const [images, setImages] = useState([]);
  const [imageStates, setImageStates] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Re-fetch images array and reset states when the URL slug changes
  useEffect(() => {
    const urls = getServiceImages(slug);
    setImages(urls);
    setImageStates(Array(urls.length).fill("pending"));
    setSelectedIndex(null);
  }, [slug]);

  // Lock the user's background page scroll whenever the Lightbox dominates the screen
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  // Safely index images without causing dependency loops
  const handleImageSuccess = useCallback((index) => {
    setImageStates((prev) => {
      const next = [...prev];
      if (next[index] !== "valid") next[index] = "valid";
      return next;
    });
  }, []);

  const handleImageError = useCallback((index) => {
    setImageStates((prev) => {
      const next = [...prev];
      if (next[index] !== "error") next[index] = "error";
      return next;
    });
  }, []);

  // Filter out any 404 images from Cloudinary so our Lightbox arrows explicitly skip broken pictures
  const validIndices = imageStates
    .map((state, i) => (state === "valid" ? i : -1))
    .filter((i) => i !== -1);

  // Next and Previous Lightbox Logic
  const handlePrev = useCallback((e) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (validIndices.length === 0 || selectedIndex === null) return;
    const currentIndex = validIndices.indexOf(selectedIndex);
    if (currentIndex > 0) {
      setSelectedIndex(validIndices[currentIndex - 1]);
    } else {
      setSelectedIndex(validIndices[validIndices.length - 1]); // Loop back to the end
    }
  }, [selectedIndex, validIndices]);

  const handleNext = useCallback((e) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (validIndices.length === 0 || selectedIndex === null) return;
    const currentIndex = validIndices.indexOf(selectedIndex);
    if (currentIndex < validIndices.length - 1) {
      setSelectedIndex(validIndices[currentIndex + 1]);
    } else {
      setSelectedIndex(validIndices[0]); // Loop directly back to the beginning
    }
  }, [selectedIndex, validIndices]);

  // Hardware Keyboard Binding for arrow keys inside the Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  // Error boundary logic purely for rendering an empty state correctly
  const errorCount = imageStates.filter(state => state === "error").length;
  const allImagesFailed = errorCount === images.length && images.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-16 pt-[120px]"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-4xl md:text-5xl font-extrabold mb-12 capitalize text-center text-[var(--text-color)] tracking-tight"
      >
        {slug.replace("-", " ")}
      </motion.h1>

      {/* Fallback Empty Display Box */}
      {allImagesFailed && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-500">No images available in this category yet.</h2>
          <p className="text-gray-400 mt-2">Check back later for beautiful moments!</p>
        </div>
      )}

      {/* Pinterest-Style Editorial Masonry Layout */}
      <div className={`columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 ${allImagesFailed ? 'hidden' : ''}`}>
        {images.map((src, index) => (
          <StatefulImage
            key={`${slug}-${index}`}
            src={src}
            alt={`${slug} ${index + 1}`}
            index={index}
            onClick={setSelectedIndex}
            onSuccess={() => handleImageSuccess(index)}
            onError={() => handleImageError(index)}
          />
        ))}
      </div>

      {/* Full-Screen Pop-Out Cinematic Lightbox Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedIndex(null)} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          >
            {/* Elegant Close 'X' Frame */}
            <button 
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors z-[60] p-2 bg-black/20 rounded-full md:bg-transparent md:p-0"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
            >
              <X className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
            </button>

            {/* Mobile-Friendly Hovering Carousel Left Arrow */}
            <button 
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all hover:-translate-x-1 z-[60] p-2 md:p-4 bg-black/20 rounded-full md:bg-transparent"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-10 h-10 md:w-16 md:h-16" strokeWidth={1} />
            </button>

            {/* Mobile-Friendly Hovering Carousel Right Arrow */}
            <button 
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all hover:translate-x-1 z-[60] p-2 md:p-4 bg-black/20 rounded-full md:bg-transparent"
              onClick={handleNext}
            >
              <ChevronRight className="w-10 h-10 md:w-16 md:h-16" strokeWidth={1} />
            </button>

            {/* Dynamic Center Stage Active Imagery Frame */}
            <motion.img
              key={selectedIndex}
              src={images[selectedIndex]}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-md shadow-2xl touch-pan-y touch-pinch-zoom"
              onClick={(e) => e.stopPropagation()} 
              alt="Expanded high-resolution gallery frame"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
