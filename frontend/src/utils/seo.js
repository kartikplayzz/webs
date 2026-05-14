import { useEffect } from "react";

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Krishna Murti Kala Kendra` : "Krishna Murti Kala Kendra";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    if (description) {
      meta.setAttribute("content", description);
    }
  }, [title, description]);
}
