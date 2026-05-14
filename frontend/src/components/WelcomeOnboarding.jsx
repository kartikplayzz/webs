import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Brush, Gem, Images, Sparkles, X } from "lucide-react";
import { business } from "../data/siteData.js";

const STORAGE_KEY = "krishna-studio-onboarding-seen";

const paths = [
  {
    id: "custom",
    icon: Brush,
    title: "Custom Murti",
    copy: "Material, height, finish and expression planned around your reference.",
    image: "/images/products/product-03-1550e836.jpg",
    to: "/contact"
  },
  {
    id: "premium",
    icon: Gem,
    title: "Premium Models",
    copy: "Marble, fiber, sandstone, cement and fine art pieces ready to explore.",
    image: "/images/products/product-41-fcd9f79a.jpg",
    to: "/products"
  },
  {
    id: "gallery",
    icon: Images,
    title: "Workshop Gallery",
    copy: "Real photos and videos from the studio floor and finished statue work.",
    image: "/images/gallery/about-workshop.PNG",
    to: "/gallery"
  }
];

export default function WelcomeOnboarding() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(paths[0].id);

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      return;
    }
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const timer = window.setTimeout(() => setVisible(true), 450);
      return () => window.clearTimeout(timer);
    }
  }, [pathname]);

  const selectedPath = useMemo(() => paths.find((item) => item.id === selected) || paths[0], [selected]);

  function close() {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="onboarding-shell" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <div className="onboarding-backdrop" />
      <div className="onboarding-panel">
        <button type="button" className="onboarding-close" onClick={close} aria-label="Close welcome">
          <X size={20} aria-hidden="true" />
        </button>

        <div className="onboarding-visual">
          <img src={selectedPath.image} alt={selectedPath.title} />
          <div className="onboarding-glowline" />
          <div className="onboarding-float-card onboarding-float-card-a">
            <Sparkles size={18} aria-hidden="true" />
            Handmade since {business.since}
          </div>
          <div className="onboarding-float-card onboarding-float-card-b">Hastinapur Studio</div>
        </div>

        <div className="onboarding-content">
          <p className="onboarding-kicker">Welcome to the studio</p>
          <h1 id="onboarding-title">Choose your murti journey</h1>
          <p className="onboarding-copy">
            A colorful sculpting space for custom devotional work, premium statues, workshop photos and
            direct WhatsApp inquiries.
          </p>

          <div className="onboarding-paths">
            {paths.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`onboarding-path ${selected === item.id ? "is-selected" : ""}`}
                onClick={() => setSelected(item.id)}
              >
                <item.icon size={20} aria-hidden="true" />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.copy}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="onboarding-actions">
            <Link to={selectedPath.to} className="onboarding-enter" onClick={close}>
              Enter {selectedPath.title}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <button type="button" className="onboarding-skip" onClick={close}>
              Explore Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
