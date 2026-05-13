// Local-only Vite config for phone testing over HTTPS on your LAN.
// Run with:  npx vite --config vite.config.local.ts
// Do NOT use this on Lovable — use vite.config.ts there.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    basicSsl(),
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    https: {},
    hmr: { clientPort: 5173 },
  },
});
