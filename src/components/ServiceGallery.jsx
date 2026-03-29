import { useEffect, useState } from "react";
import { fetchServiceImages } from "../utils/fetchServiceImages";

export default function ServiceGallery({ service }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      const data = await fetchServiceImages(service);
      setImages(data);
      setLoading(false);
    }
    loadImages();
  }, [service]);

  if (loading) return <p className="text-center">Loading...</p>;

  if (!images.length)
    return <p className="text-center text-red-500">No images found...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((img) => (
        <img
          key={img.public_id}
          src={img.secure_url}
          alt={service}
          className="rounded-lg shadow"
        />
      ))}
    </div>
  );
}
