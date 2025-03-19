import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Sesame/",
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});

function fileURLToPath(url: URL): string {
  if (url.protocol !== "file:") {
    throw new Error("URL must be a file URL.");
  }
  let filePath = decodeURIComponent(url.pathname);
  
  // Handle Windows paths (e.g. /C:/path -> C:\path)
  if (process.platform === "win32") {
    // Remove leading slash for drive letters and replace forward slashes with backslashes
    if (filePath.startsWith("/")) {
      filePath = filePath.slice(1);
    }
    filePath = filePath.replace(/\//g, "\\");
  }
  
  return filePath;
}
