import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nextrend Tech Solutions",
    short_name: "Nextrend",
    description: "Websites, mobile apps, intelligent automation, and digital growth solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1220",
    theme_color: "#0d1220",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
