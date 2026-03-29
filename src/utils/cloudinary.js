const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const MAX_IMAGES = 50;

export const getServiceImages = (serviceSlug) => {
  return Array.from({ length: MAX_IMAGES }, (_, i) => {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${serviceSlug}-${i + 1}.jpg`;
  });
};
