export default defineNuxtConfig({
  srcDir: 'app/',

  dir: {
    public: '../public'
  },

  app: {
    head: {
      title: 'Portfolio of dimasfr',
      meta: [
        { name: 'description', content: 'Personal portfolio of Dimas Fajar Ramadhan' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo-black.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap',
        },
      ],
    },
    baseURL: '/'
  },

  routeRules: {
    '/**': { ssr: false }
  },

  compatibilityDate: '2025-06-10',

  devtools: { enabled: true },

  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    [
      'shadcn-nuxt',
      {
        prefix: '',
        componentDir: './components/ui'
      }
    ]
  ],

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  // ✅ color-mode pakai class .dark (tanpa suffix) — sync dengan Tailwind darkMode: 'class'
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },
})