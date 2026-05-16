// src/components/About.jsx
import Button from "./Button";
import { useScrollReveal } from "../utils/useScrollReveal";

export default function About() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} id="about" className="py-20 md:py-24 bg-[#f2f8fc] px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="reveal text-4xl md:text-5xl font-bold text-[var(--text-color)] mb-6">
          Meet the Storyteller Behind the Lens
        </h2>
        <p
          className="reveal text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
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
      </div>
    </section>
  );
}
