import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import Footer from "./components/Footer";
import HeroBanner from "./components/HeroBanner";
import AboutPage from "./pages/AboutPage"; // your new About page
import "./hero.css";

// Wrapper component to handle route-based padding
function PageWrapper({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <main className={`${isHome ? "pt-0" : "pt-[100px]"} transition-all duration-300`}>
      {children}
    </main>
  );
}

function App() {
  return (
    <Router>
      <Navbar />

      <PageWrapper>
        <Routes>
          {/* Homepage route */}
          <Route
            path="/"
            element={
              <>
                <HeroBanner />
                <About />
                <Testimonials />
                <Services />
              </>
            }
          />

          {/* About page route */}
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </PageWrapper>

      <Footer />
    </Router>
  );
}

export default App;
