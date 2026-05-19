import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// Create small virtual module stubs for TanStack Start's runtime virtual
// imports so esbuild's dependency optimizer doesn't try to resolve them
// during pre-bundling.
function tanstackVirtualStubs() {
  const ids = new Set([
    '#tanstack-router-entry',
    '#tanstack-start-entry',
    '#tanstack-start-plugin-adapters',
    'tanstack-start-manifest:v',
    'tanstack-start-injected-head-scripts:v',
  ]);

  return {
    name: 'tanstack-virtual-stubs',
    resolveId(id) {
      if (ids.has(id)) return id;
      return null;
    },
    load(id) {
      if (!ids.has(id)) return null;
      if (id === 'tanstack-start-manifest:v') {
        return 'export const tsrStartManifest = {}; export default tsrStartManifest;';
      }
      if (id === 'tanstack-start-injected-head-scripts:v') {
        return 'export const injectedHeadScripts = []; export default injectedHeadScripts;';
      }
      return 'export default {};';
    },
  };
}

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
export default defineConfig({
  plugins: [
    tanstackVirtualStubs(),
    tanstackStart({
      server: { entry: "server" },
    }),
    cloudflare(),
    tailwindcss(),
    react(),
    tsconfigPaths(),
  ],
  // Disable dependency discovery to avoid pre-bundling TanStack Start's
  // virtual import specifiers during the optimize step.
  optimizeDeps: {
    noDiscovery: true,
    include: [],
  },
  ssr: {
    // Avoid externalizing TanStack packages so the plugin can resolve its
    // virtual imports at runtime.
    noExternal: [/^@tanstack\//, /^tanstack-start-/],
  },
});
