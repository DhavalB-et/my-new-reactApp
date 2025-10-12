// src/components/About.jsx
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-6">
        Meet the Storyteller Behind the Lens
      </h2>
      <p className="max-w-3xl mx-auto text-gray-700 mb-8">
        Hi, I’m Ajay Vasara, a wedding photographer passionate about
        capturing real emotions and unscripted beauty. Every couple has a story
        worth telling — through tears, laughter, and all the little details in
        between. Let’s create memories you’ll relive forever.
      </p>

      <Link
        to="/about"
        className="inline-block bg-[var(--bg-color)] hover:bg-[var(--text-color)] text-[var(--white-color)] font-semibold py-3 px-8 rounded-full transition-colors duration-300"
      >
        Learn More About Me
      </Link>
    </section>
  );
}
