import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100 pt-16 md:pt-24 flex items-center justify-center">
      <div className="w-full">
        <ContactForm />
      </div>
    </div>
  );
}
