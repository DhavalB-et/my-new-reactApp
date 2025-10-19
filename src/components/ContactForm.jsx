// src/components/ContactForm.jsx
import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_7l0154i",
        "template_z6hdmqw",
        form.current,
        "-cYJJqpIwHIRODq-U"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          alert("Oops! Something went wrong, please try again.");
        }
      );
  };

  return (
    <section className="bg-gray-100 py-16" id="contact">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Form */}
        <form ref={form} onSubmit={sendEmail} className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Us</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full mb-4 p-3 border rounded-lg"
          />
          <input
            type="phone"
            name="phone"
            placeholder="Your Phone Number"
            required
            className="w-full mb-4 p-3 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full mb-4 p-3 border rounded-lg"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows="5"
            className="w-full mb-4 p-3 border rounded-lg"
          ></textarea>

          <button
            type="submit"
            className="group relative z-0 h-12 overflow-hidden rounded-[5px] bg-[var(--text-color)] px-10 py-3 text-[16px] text-[var(--white-color)] shadow-sm hover:shadow-md transition-all duration-300"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--text-color)]">
              Send Message
            </span>
            <span className="absolute inset-0 overflow-hidden rounded-[5px]">
              <span className="absolute left-0 aspect-square w-full origin-center translate-x-full rounded-full bg-[var(--bg-color)] transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
            </span>
          </button>
        </form>

        {/* Right: Studio Info */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-4">
              Let’s Work Together
            </h3>
            <p className="text-gray-600 mb-6">
              Have a shoot idea, event, or collaboration? Drop us a message — we’ll reply soon!
            </p>

            {/* Address */}
            <a
              href="https://www.google.com/maps?q=Shop+no+A4,+Prant+office+same,+Lalpur"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 font-semibold border-b py-3 block hover:text-[var(--text-color)] transition"
            >
              📍 Shop no A4, Prant office same, Lalpur
            </a>

            {/* Phone */}
            <a
              href="tel:+916353611634"
              className="text-gray-800 font-semibold border-b py-3 block hover:text-[var(--text-color)] transition"
            >
              📞 +91 63536 11634
            </a>

            {/* Email */}
            <a
              href="mailto:kanaiyafilms367@gmail.com"
              className="text-gray-800 font-semibold border-b py-3 block hover:text-[var(--text-color)] transition"
            >
              ✉️ kanaiyafilms367@gmail.com
            </a>
          </div>

      </div>
    </section>
  );
}
