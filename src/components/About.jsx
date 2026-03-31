// src/components/About.jsx
import Button from "./Button";
import { useScrollReveal } from "../utils/useScrollReveal";

export default function About() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} id="about" className="pt-20 pb-7 bg-[#f2f8fc] text-center px-4">
      <h2 className="reveal text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-4">
        Meet the Storyteller Behind the Lens
      </h2>
      <p
        className="reveal max-w-3xl mx-auto text-gray-700 mb-8"
        style={{ "--reveal-delay": "120ms" }}
      >
        We're Kanaiya Films, a passionate team of wedding photographers dedicated to
        capturing real emotions and unscripted beauty. Every couple has a story worth
        telling — through tears, laughter, and all the little details in between.
        Together, let's create memories you'll cherish and relive forever.
      </p>

      <div className="reveal-scale" style={{ "--reveal-delay": "220ms" }}>
        <Button text="Learn More" link="/about" />
      </div>
    </section>
  );
}
