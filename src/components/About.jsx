// src/components/About.jsx
import { Link } from "react-router-dom";
import Button from "./Button";

export default function About() {
  return (
    <section id="about" className="pt-20 pb-7 bg-[#f2f8fc] text-center px-4">
      <h2 className="text-4xl font-bold mb-6 text-[var(--text-color)]">
        Meet the Storyteller Behind the Lens
      </h2>
      <p className="max-w-3xl mx-auto text-gray-700 mb-8">
       We’re StudioName, a passionate team of wedding photographers dedicated to capturing real emotions and unscripted beauty. Every couple has a story worth telling — through tears, laughter, and all the little details in between.

        Together, let’s create memories you’ll cherish and relive forever.
      </p>

      <Button text="Learn More" link="/about" />

    </section>
  );
}
