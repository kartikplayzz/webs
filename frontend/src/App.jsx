import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import ScrollAnimator from "./components/ScrollAnimator.jsx";
import WelcomeOnboarding from "./components/WelcomeOnboarding.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Products from "./pages/Products.jsx";
import Gallery from "./pages/Gallery.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Dashboard from "./admin/Dashboard.jsx";

export default function App() {
  return (
    <div className="site-canvas min-h-screen text-stone-900">
      <ScrollAnimator />
      <WelcomeOnboarding />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
