import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const directions = ["up", "left", "right", "down"];

export default function ScrollAnimator() {
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(
      document.querySelectorAll(
        "main > section, .panel, .product-pop-card, figure, blockquote, .admin-table tbody tr, [data-reveal]"
      )
    ).filter((node) => !node.closest("[data-no-reveal]"));

    if (prefersReducedMotion) {
      targets.forEach((node) => node.classList.add("is-visible"));
      return undefined;
    }

    targets.forEach((node, index) => {
      node.classList.add("motion-reveal");
      if (!node.dataset.revealDirection) {
        node.dataset.revealDirection = directions[index % directions.length];
      }
      node.style.setProperty("--reveal-delay", `${Math.min((index % 7) * 70, 420)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12
      }
    );

    targets.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
