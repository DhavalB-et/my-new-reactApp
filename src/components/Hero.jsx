// src/components/Hero.jsx
export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
      <h1 className="text-6xl font-extrabold mb-4">Build with React + Tailwind</h1>
      <p className="text-lg mb-6 max-w-xl">
        Super-fast frontend development using Vite, React, and TailwindCSS 🚀
      </p>
      <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-200">
        Get Started
      </button>
    </section>
  );
}
