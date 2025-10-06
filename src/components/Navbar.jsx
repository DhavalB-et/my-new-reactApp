// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-600">MySite</h1>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li><a href="#about" className="hover:text-blue-500">About</a></li>
          <li><a href="#services" className="hover:text-blue-500">Services</a></li>
          <li><a href="#testimonials" className="hover:text-blue-500">Testimonials</a></li>
          <li><a href="#contact" className="hover:text-blue-500">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
