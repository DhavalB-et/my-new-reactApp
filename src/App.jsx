import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";
import PortfolioSection from "./components/PortfolioSection";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import HeroBanner from "./components/HeroBanner";
import InstagramFeed from "./components/InstagramFeed";
import AboutPage from "./pages/AboutPage"; // your new About page
import "./hero.css";

import Wedding from "./pages/services/Wedding";
import Engagement from "./pages/services/Engagement";
import PreWedding from "./pages/services/PreWedding";
import EventCoverage from "./pages/services/EventCoverage";
import Maternity from "./pages/services/Maternity";
import BabyShoot from "./pages/services/BabyShoot";
import Destination from "./pages/services/Destination";
import DopProjects from "./pages/services/DopProjects";

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
                <WhatsAppButton />
                <Services />
                <PortfolioSection />
                <ContactForm />
                <Testimonials />
                <InstagramFeed />
              </>
            }
          />

          {/* About page route */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/wedding" element={<Wedding />} />
          <Route path="/engagement" element={<Engagement />} />
          <Route path="/pre-wedding" element={<PreWedding />} />
          <Route path="/event-coverage" element={<EventCoverage />} />
          <Route path="/maternity" element={<Maternity />} />
          <Route path="/baby-shoot" element={<BabyShoot />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/dop-projects" element={<DopProjects />} />
        </Routes>
      </PageWrapper>

      <Footer />
    </Router>
  );
}

export default App;
