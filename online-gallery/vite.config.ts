import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import UnpluginInjectPreload from "unplugin-inject-preload/vite";
import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    UnpluginInjectPreload({
      files: [
        {
          entryMatch: /.*\.webp$/,
        },
      ],
    }),
    analyzer(),
  ],
});
