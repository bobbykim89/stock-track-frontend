import Cookies from 'js-cookie'
const token = Cookies.get('apollo-token')

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Stock Tracker',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Small web app to track stock price and keep your things to do',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'stock market, finnhub, alpha vantage, todo',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet', // FontAwesome CDN
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
        integrity:
          'sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==',
        crossorigin: 'anonymous',
        referrerpolicy: 'no-referrer',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/moment', '@nuxtjs/pwa'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/apollo',
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.BASE_URL || 'http://localhost:4000/graphql',
        httpLinkOptions: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
          mode: 'cors',
          credentials: 'include',
        },
        watchLoading: '~/plugins/apollo-watch-loading-handler.js',
        errorHandler: '~/plugins/apollo-error-handler.js',
        tokenName: 'apollo-token',
      },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:4000',
    API_KEY: process.env.FINNHUB_API_KEY,
    ALPHA_API_KEY: process.env.ALPHAVANTAGE_API_KEY,
  },
  pwa: {
    meta: {
      charset: 'utf-8',
      appleStatusBarStyle: 'black',
      name: 'Stock Track',
      author: 'Sihun Kim',
    },
    manifest: {
      name: 'Stock Track',
      short_name: 'Stock Track',
      description: 'Simple web app for tracking stock info and to do list',
      start_url: '.',
      background_color: '#484848',
      theme_color: '#ffffff',
      dir: 'ltr',
      lang: 'en-US',
      icons: [
        {
          src: '/favicon.ico',
          sizes: '48x48',
          type: 'image/x-icon',
        },
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      workbox: {
        importScripts: ['service-worker.js'],
      },
    },
  },
}
