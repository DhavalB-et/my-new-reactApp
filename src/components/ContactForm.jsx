// src/components/ContactForm.jsx
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "./Button";

export default function ContactForm() {
  const form = useRef();
  const [status, setStatus] = useState("idle");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("submitting");

    emailjs
      .sendForm(
        "service_7l0154i",
        "template_z6hdmqw",
        form.current,
        "-cYJJqpIwHIRODq-U"
      )
      .then(
        () => {
          setStatus("success");
          e.target.reset();
          setTimeout(() => setStatus("idle"), 5000);
        },
        (error) => {
          console.log(error.text);
          setStatus("error");
          setTimeout(() => setStatus("idle"), 5000);
        }
      );
  };

  return (
    <section className="bg-gray-100 py-20 md:py-24" id="contact">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Form */}
        <form ref={form} onSubmit={sendEmail} className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">Contact Us</h2>

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

          {status === "success" && (
            <div className="mb-4 p-4 rounded-lg bg-green-50 text-green-700 font-medium border border-green-200 transition-all">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div className="mb-4 p-4 rounded-lg bg-red-50 text-red-700 font-medium border border-red-200 transition-all">
              Oops! Something went wrong. Please try again.
            </div>
          )}

          <Button
            type="submit"
            text={status === "submitting" ? "Sending..." : "Send Message"}
            disabled={status === "submitting"}
          />
        </form>

        {/* Right: Studio Info */}
          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-[var(--text-color)] mb-6">
              Let’s Work Together
            </h3>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
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
