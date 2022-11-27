// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon'
  ],

  css: ['~/styles/main.scss'],

  nitro: {
    compressPublicAssets: true
  },

  build: {
    transpile:
          process.env.NODE_ENV === 'production'
            ? [
                'naive-ui',
                'vueuc',
                '@css-render/vue3-ssr',
                '@juggle/resize-observer'
              ]
            : ['@juggle/resize-observer']
  },

  vite: {
    optimizeDeps: {
      include:
            process.env.NODE_ENV === 'development'
              ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
              : []
    }
  },

  runtimeConfig: {
    NASA_API_KEY: process.env.NASA_API_KEY
  }
})
