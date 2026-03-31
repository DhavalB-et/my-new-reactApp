import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";
import PortfolioSection from "./components/PortfolioSection";
import VideoSection from "./components/VideoSection";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import HeroBanner from "./components/HeroBanner";
import InstagramFeed from "./components/InstagramFeed";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import "./hero.css";
import ServicePage from "./pages/ServicePage";
import { useSmoothScroll, scrollToTop } from "./utils/useSmoothScroll";

// Scroll-to-top on route change using Lenis-aware helper
function PageWrapper({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  return (
    <main className={`${isHome ? "pt-0" : "pt-[100px]"} transition-all duration-300`}>
      {children}
    </main>
  );
}

// Root app — Lenis is initialized here so it covers all pages
function AppInner() {
  useSmoothScroll();

  return (
    <>
      <Navbar />
      <PageWrapper>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroBanner />
                <About />
                <WhatsAppButton />
                <Services />
                <PortfolioSection />
                {/* <VideoSection /> */}
                <ContactForm />
                <Testimonials />
                <InstagramFeed />
              </>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
        </Routes>
      </PageWrapper>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;
