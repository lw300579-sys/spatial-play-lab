import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ari Swerdlow · Product engineer",
    short_name: "Ari Swerdlow",
    description:
      "Browser games and training apps you control with your body. No install. Just a link and a camera.",
    start_url: "/",
    display: "browser",
    background_color: "#F7F3EC",
    theme_color: "#121211",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
