export default defineNuxtConfig({
  extends: ["nuxt-umami"],
  app: {
    head: {
      title: "Geo to CSV",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "white" },
        {
          name: "google-site-verification",
          content: "nc0pKffQdhm679g_eXEQhjK-NzBM8ZbyFQLR9ZMeJtc",
        },
      ],
      htmlAttrs: {
        "data-bs-theme": "light",
      },
    },
  },

  appConfig: {
    umami: {
      ignoreLocalhost: true,
      version: 2,
    },
  },

  css: ["@/assets/main.scss"],

  modules: [
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "@bootstrap-vue-next/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/sitemap",
  ],

  colorMode: {
    dataValue: "bs-theme",
    storageKey: "nuxt-color-mode",
  },

  pwa: {
    registerType: "prompt",
    manifest: {
      name: "Geo to CSV",
      description: "Tools to convert from GeoJSON or KML to CSV",
      theme_color: "white",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff,woff2}"],
      cleanupOutdatedCaches: true,
    },
  },
});
