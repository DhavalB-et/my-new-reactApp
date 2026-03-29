import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const portraitUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/pre-wedding-1.jpg`; // Sample image, user can update!

  // Staggered animation rules
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between each paragraph appearing
        delayChildren: 0.3, // Wait before starting the sequence
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-[#fcfbf9] min-h-screen pt-[120px] pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Animated Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={portraitUrl}
            alt="Photographer Portrait"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 border-[1px] border-black/10 rounded-2xl pointer-events-none"></div>
        </motion.div>

        {/* Right Side: Animated Text Sequence */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col justify-center"
        >
          <motion.h1 
            variants={childVariants}
            className="text-4xl md:text-5xl font-extrabold text-[var(--text-color)] mb-8 leading-tight tracking-tight"
          >
            My Journey <br className="hidden md:block"/> Through the Lens
          </motion.h1>

          <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
            <motion.p variants={childVariants}>
              Hey, I’m <strong>Kanaiya Films</strong>. What started as a tiny passion for capturing
              small, candid moments rapidly blossomed into my full-time dream—documenting breathtaking 
              love stories globally through my camera.
            </motion.p>
            <motion.p variants={childVariants}>
              Over the years, I’ve had the absolute privilege of photographing countless
              weddings, stunning engagements, and vibrant shoots. I believe deeply
              in utilizing natural light, highlighting real vulnerability, and delivering 
              pieces of art that make you pause and <em>feel</em>.
            </motion.p>
            <motion.p variants={childVariants}>
              When I’m not actively shooting, you’ll find me meticulously editing with a hot cup of chai in
              hand, hunting for indie music tracks, or blindly scouting dramatic new locations for upcoming shoots.
            </motion.p>
          </div>

          <motion.div variants={childVariants} className="mt-10">
            <Link
              to="/contact"
              className="inline-block group relative z-0 h-14 overflow-hidden rounded-[5px] bg-[#2d2926] px-12 py-4 text-[16px] font-medium text-white shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#2d2926]">
                Let’s Create Timeless Art
              </span>
              <span className="absolute inset-0 overflow-hidden rounded-[5px]">
                <span className="absolute left-0 aspect-square w-full origin-center translate-x-full rounded-full bg-[#c1b1a2] transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
              </span>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
