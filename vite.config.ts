import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  ssr: {
    noExternal: ["@supabase/supabase-js"]
  },
  server: {
    allowedHosts: true
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()]
});
