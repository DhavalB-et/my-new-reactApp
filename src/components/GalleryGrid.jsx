import React, { useEffect, useState } from "react";

const GalleryGrid = ({ serviceName }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // call your backend API
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/gallery/${serviceName.toLowerCase()}`);
        console.log("Fetching images from:", serviceName);
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, [serviceName]);

  return (
    <section className="py-25 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 capitalize">
        {serviceName.replace(/([A-Z])/g, " $1")}
      </h2>
      {images.length === 0 ? (
        <p className="text-center text-gray-500">No images found yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md">
              <img
                src={url}
                alt={`${serviceName}-${index}`}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default GalleryGrid;
