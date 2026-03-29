import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const categories = [
  { name: "Wedding Photography", slug: "wedding", desc: "Capturing the magic of your special day." },
  { name: "Pre-Wedding Films", slug: "pre-wedding", desc: "Romantic tales before you say I do." },
  { name: "Maternity Shoot", slug: "maternity", desc: "The beautiful journey to motherhood." },
  { name: "Engagement Shoot", slug: "engagement", desc: "The start of your forever." },
  { name: "Simant (Baby Shower)", slug: "baby-shoot", desc: "Cherishing tiny miracles." },
  { name: "Destination Photography", slug: "destination-photography", desc: "Love stories around the world." },
  { name: "Event Coverage", slug: "event-coverage", desc: "Candid moments from your celebrations." },
  { name: "DOP & Film Projects", slug: "dop-film", desc: "Cinematic visuals for music videos and short films." }
];

const CategoryCard = ({ category }) => {
  const [hasError, setHasError] = useState(false);
  const imageUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${category.slug}-1.jpg`;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div variants={cardVariants}>
      <Link 
        to={`/services/${category.slug}`}
        className="group relative block h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
      >
        {!hasError ? (
          <img
            src={imageUrl}
            alt={category.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
            <span className="text-[#adb5bd] font-medium tracking-wide">Image Coming Soon</span>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500"></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 p-8 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">{category.name}</h3>
          <p className="text-gray-200 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
            {category.desc}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 min-h-screen pt-[120px]">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-[var(--text-color)]">
          Our Projects
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Explore our diverse collection of timeless stories, beautifully captured across various genres. Select a category to view the full gallery.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {categories.map((cat) => (
          <CategoryCard key={cat.slug} category={cat} />
        ))}
      </motion.div>
    </div>
  );
}
