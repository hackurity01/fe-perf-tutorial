import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import UnpluginInjectPreload from "unplugin-inject-preload/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    UnpluginInjectPreload({
      files: [
        {
          entryMatch: /[a-zA-Z]*\.woff2$/,
          attributes: {
            crossorigin: "anonymous",
          },
        },
      ],
    }),
  ],
});
