import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { getServiceImages } from "../utils/cloudinary";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";

const StatefulImage = ({ src, alt, index, onClick, onSuccess, onError, x, y }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) return null;

  return (
    <div 
      className={`absolute cursor-pointer transition-transform duration-500 hover:scale-[1.03] hover:z-20`}
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      onClick={() => isLoaded && onClick(index)}
    >
      <motion.img
        src={src}
        loading="lazy"
        draggable={false}
        initial={{ opacity: 0, filter: "blur(15px)", scale: 0.9 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          filter: isLoaded ? "blur(0px)" : "blur(15px)",
          scale: isLoaded ? 1 : 0.9
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-[280px] md:h-[360px] w-auto object-contain rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] ${!isLoaded ? 'bg-[#2A2A2A]' : ''}`}
        alt={alt}
        onLoad={() => {
          setIsLoaded(true);
          if (onSuccess) onSuccess();
        }}
        onError={() => {
          setHasError(true);
          if (onError) onError();
        }}
      />
    </div>
  );
};

export default function ServicePage() {
  const { slug } = useParams();
  const [validImages, setValidImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Preload and validate all 50 possible Cloudinary images
  useEffect(() => {
    let isMounted = true;
    const urls = getServiceImages(slug);
    
    const checkImages = async () => {
      setIsLoading(true);
      setSelectedIndex(null);
      const valid = [];
      const promises = urls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => { valid.push(url); resolve(); };
          img.onerror = () => { resolve(); };
          img.src = url;
        });
      });
      await Promise.all(promises);
      
      if (isMounted) {
        // Sort valid URLs to maintain consistent ordering since onload fires asynchronously
        valid.sort((a, b) => {
          const numA = parseInt(a.match(/-(\d+)\.jpg$/)?.[1] || 0);
          const numB = parseInt(b.match(/-(\d+)\.jpg$/)?.[1] || 0);
          return numA - numB;
        });
        setValidImages(valid);
        setIsLoading(false);
      }
    };
    checkImages();
    return () => { isMounted = false; };
  }, [slug]);

  // Lock scroll globally when the ServicePage mounts
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Next and Previous Lightbox Logic
  const handlePrev = useCallback((e) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (validImages.length === 0 || selectedIndex === null) return;
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else {
      setSelectedIndex(validImages.length - 1);
    }
  }, [selectedIndex, validImages]);

  const handleNext = useCallback((e) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (validImages.length === 0 || selectedIndex === null) return;
    if (selectedIndex < validImages.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else {
      setSelectedIndex(0);
    }
  }, [selectedIndex, validImages]);

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

  // Infinite Canvas Setup
  const W = 3000;
  const H = 3000;

  const displayImages = useMemo(() => {
    if (validImages.length === 0) return [];
    const arr = [...validImages];
    // Duplicate images if too few to make the canvas look full
    while (arr.length < 25) {
      arr.push(...validImages);
    }
    return arr.slice(0, 25); // exactly 25
  }, [validImages]);

  const imagePositions = useMemo(() => {
    const positions = [];
    const cols = 5;
    const rows = 5;
    const cellW = W / cols;
    const cellH = H / rows;
    
    const slots = [];
    for(let r = 0; r < rows; r++) {
      for(let c = 0; c < cols; c++) {
        slots.push({r, c});
      }
    }
    // Shuffle slots predictably for consistent visual layout
    for (let i = slots.length - 1; i > 0; i--) {
        const j = (i * 13 + 7) % (i + 1); // pseudo-random deterministic
        [slots[i], slots[j]] = [slots[j], slots[i]];
    }

    displayImages.forEach((img, i) => {
       const slot = slots[i % slots.length];
       
       // Perfectly centered in the grid cell, no jitter
       positions.push({
         x: slot.c * cellW + cellW/2,
         y: slot.r * cellH + cellH/2
       });
    });
    return positions;
  }, [displayImages]);

  // Pan Engine
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const target = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });
  const dragDistance = useRef(0);
  const velocity = useRef({ x: 0, y: 0 });

  useAnimationFrame(() => {
    let cx = target.current.x;
    let cy = target.current.y;
    
    // Apply Momentum Gliding
    if (!isDragging.current) {
      cx += velocity.current.x;
      cy += velocity.current.y;
      velocity.current.x *= 0.94; // Friction
      velocity.current.y *= 0.94;
    }
    
    // Wrap to simulate infinite scrolling
    if (cx > W/2) { cx -= W; panX.set(panX.get() - W); }
    if (cx < -W/2) { cx += W; panX.set(panX.get() + W); }
    if (cy > H/2) { cy -= H; panY.set(panY.get() - H); }
    if (cy < -H/2) { cy += H; panY.set(panY.get() + H); }
    
    target.current.x = cx;
    target.current.y = cy;
    
    // Smooth lerp for a soft follow effect
    panX.set(panX.get() + (cx - panX.get()) * 0.12);
    panY.set(panY.get() + (cy - panY.get()) * 0.12);
  });

  const handlePointerDown = (e) => {
    if (selectedIndex !== null) return;
    isDragging.current = true;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    dragDistance.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || selectedIndex !== null) return;
    const dx = e.clientX - lastPoint.current.x;
    const dy = e.clientY - lastPoint.current.y;
    dragDistance.current += Math.abs(dx) + Math.abs(dy);
    
    target.current.x += dx * 1.8; // Multiplier for energetic drag
    target.current.y += dy * 1.8;
    
    velocity.current.x = dx * 1.2; // Track release momentum
    velocity.current.y = dy * 1.2;
    
    lastPoint.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e) => {
    if (selectedIndex !== null) return;
    target.current.x -= e.deltaX * 2.0;
    target.current.y -= e.deltaY * 2.0;
    
    // Give wheel events slight momentum too
    velocity.current.x = -e.deltaX * 0.5;
    velocity.current.y = -e.deltaY * 0.5;
  };

  const handleImageClick = (index) => {
    // Only register as click if the user didn't drag
    if (dragDistance.current < 10) {
      setSelectedIndex(index % validImages.length);
    }
  };

  const renderVirtualCanvas = () => (
    <>
      {displayImages.map((src, index) => {
        const pos = imagePositions[index];
        return (
          <StatefulImage
            key={`${slug}-${index}`}
            src={src}
            alt={`${slug} ${index + 1}`}
            index={index}
            onClick={handleImageClick}
            x={pos.x}
            y={pos.y}
            onSuccess={() => {}}
            onError={() => {}}
          />
        );
      })}
    </>
  );

  if (isLoading) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-[#1A1A1A] flex items-center justify-center z-50">
        <div className="text-gray-400 animate-pulse text-lg tracking-widest font-serif uppercase">
          Curating Gallery...
        </div>
      </div>
    );
  }

  const allImagesFailed = validImages.length === 0;

  return (
    <div 
      className="fixed inset-0 w-screen h-screen bg-[#1A1A1A] touch-none select-none overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* 3x3 Infinite Canvas Grid */}
      <motion.div 
        className="absolute top-1/2 left-1/2 will-change-transform cursor-grab active:cursor-grabbing"
        style={{ x: panX, y: panY }}
      >
        <div 
          className="relative"
          style={{ width: W * 3, height: H * 3, marginLeft: -(W * 1.5), marginTop: -(H * 1.5) }}
        >
          {[
            [-1, -1], [0, -1], [1, -1],
            [-1,  0], [0,  0], [1,  0],
            [-1,  1], [0,  1], [1,  1],
          ].map(([gx, gy], i) => (
            <div 
              key={i}
              className="absolute"
              style={{ width: W, height: H, left: W + gx * W, top: H + gy * H }}
            >
              {renderVirtualCanvas()}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Fixed Centered Title */}
      <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-50 mix-blend-difference text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight capitalize text-center leading-none"
        >
          {slug.replace("-", " ")}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl italic mt-2 font-serif"
        >
          Gallery
        </motion.p>
      </div>

      {/* Fallback Empty Display Box */}
      {allImagesFailed && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-center py-20 px-10 bg-white/80 backdrop-blur-md rounded-2xl">
            <h2 className="text-2xl font-semibold text-gray-500">No images available in this category yet.</h2>
            <p className="text-gray-400 mt-2">Check back later for beautiful moments!</p>
          </div>
        </div>
      )}

      {/* Full-Screen Pop-Out Cinematic Lightbox Overlay */}
      {createPortal(
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedIndex(null)} 
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md"
            >
              <button 
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors z-10 p-2 bg-black/20 rounded-full md:bg-transparent md:p-0"
                onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              >
                <X className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
              </button>

              <button 
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all hover:-translate-x-1 z-10 p-2 md:p-4 bg-black/20 rounded-full md:bg-transparent"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-10 h-10 md:w-16 md:h-16" strokeWidth={1} />
              </button>

              <button 
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all hover:translate-x-1 z-10 p-2 md:p-4 bg-black/20 rounded-full md:bg-transparent"
                onClick={handleNext}
              >
                <ChevronRight className="w-10 h-10 md:w-16 md:h-16" strokeWidth={1} />
              </button>

              <motion.img
                key={selectedIndex}
                src={validImages[selectedIndex]}
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
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
