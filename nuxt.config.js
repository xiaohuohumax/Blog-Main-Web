import config from './config'

import routesFunc from './routes/routes'

export default {
  loading: false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '个人博客',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@assets/mode/bootstrap-24-4.4.1-dist/css/bootstrap.css',
    'iview/dist/styles/iview.css',
    '@fortawesome/fontawesome-free/css/all.css',
    '@assets/styles/allStyles.less',
    // '@assets/styles/theme/theme.less',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/iview',
    {
      src: '@/plugins/http',
      mode: 'client'
    },
    {
      src: '@/plugins/routerBeforeEach',
      mode: 'client'
    },
    {
      src: '@/plugins/websocket',
      mode: 'client'
    },
    '@/plugins/allComs',
    '@/plugins/swiper',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
  ],

  router: {
    middleware: ['routerMeta'],
    extendRoutes(routes, resolve) {
      routes.length = 0;
      routes.push(...routesFunc(resolve))
    }
  },
  axios: {
    proxy: true,
    prefix: config.proxyPrefix,
    credentials: true,
  },
  proxy: {
    '/api': {
      target: config.backgroundUrl, // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', //将 /api 替换掉
      },
    },
  },

  build: {
    vendor: ['axios']
  }
}
