// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Portfolio of dimasfr', // 🔥 ganti title di sini
      meta: [
        { name: 'description', content: 'Personal portfolio of Dimas Fajar Ramadhan' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo-black.png' }, // 🔥 favicon
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }, // opsional
      ],
    },
    baseURL: '/'
  },
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
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
    // and more...
  }
})