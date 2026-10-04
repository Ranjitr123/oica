import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Odisha Institute of Computer Studies (OICS)",
    short_name: "OICS Institute",
    description: "Official portal for Odisha Institute of Computer Studies. Verify digital computer certificates online, access certified courses, and download official credentials.",
    start_url: "/",
    display: "standalone",
    background_color: "#090d16",
    theme_color: "#06b6d4",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      }
    ],
  };
}
