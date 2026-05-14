import { useState } from "react";
import { Images, Play } from "lucide-react";
import { galleryImages, videos } from "../data/siteData.js";
import { usePageMeta } from "../utils/seo.js";

export default function Gallery() {
  const [mode, setMode] = useState("images");

  usePageMeta("Gallery", "Image and video gallery of Krishna Murti Kala Kendra statues and workshop photos.");

  return (
    <main>
      <section className="bg-white py-16">
        <div className="section-shell">
          <p className="eyebrow">Gallery</p>
          <h1 className="page-title mt-3">Photos and videos from the workshop</h1>
          <p className="body-copy mt-4 max-w-3xl">
            A cleaner gallery using the existing product, banner and workshop photos from your current website.
          </p>
          <div className="mt-8 inline-flex rounded-lg border border-stone-300 bg-white p-1">
            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold ${
                mode === "images" ? "bg-clay-600 text-white" : "text-stone-700"
              }`}
              onClick={() => setMode("images")}
            >
              <Images size={18} aria-hidden="true" />
              Images
            </button>
            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold ${
                mode === "videos" ? "bg-clay-600 text-white" : "text-stone-700"
              }`}
              onClick={() => setMode("videos")}
            >
              <Play size={18} aria-hidden="true" />
              Videos
            </button>
          </div>
        </div>
      </section>

      <section className="section-shell py-12">
        {mode === "images" ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galleryImages.map((item) => (
              <figure key={item.id} className="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-stone-200 bg-white">
                <img src={item.src} alt={item.title} className="w-full object-cover" loading="lazy" />
                <figcaption className="px-4 py-3 text-sm font-semibold text-stone-700">{item.title}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {videos.map((video) => (
              <article key={video.id} className="panel overflow-hidden">
                <div className="aspect-video bg-stone-900">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <h2 className="p-4 text-lg font-bold text-stone-900">{video.title}</h2>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
