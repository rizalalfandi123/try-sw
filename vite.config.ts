import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig(() => {

  const config: UserConfig = {
    plugins: [topLevelAwait(), react(), VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: '1',
        short_name: '1',
        description: '1',
        theme_color: '#ffffff',
      },

      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,wasm}'],
        maximumFileSizeToCacheInBytes: 12_000_000
      },

      devOptions: {
        // enabled: mode === 'development',
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })],

    optimizeDeps: {
      exclude: ["@electric-sql/pglite"],
      esbuildOptions: {
        target: 'esnext'
      }
    },

    build: {
      target: 'esnext',
    },
  }

  return config
})