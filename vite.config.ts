import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // For a GitHub Pages *project* site (https://<user>.github.io/<repo>/),
  // set VITE_BASE=/<repo>/ when building. Vercel and other root-domain
  // hosts can ignore this — it defaults to '/'.
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
})
