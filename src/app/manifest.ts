import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Khanh Pham | Software Engineer",
    short_name: "Khanh Pham",
    description:
      "Portfolio of Khanh Pham — Software Engineer specializing in React, Next.js, Golang, and Flutter.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#14b8a6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
