/*
 * @Author: Tentel
 * @Date: 2022-06-27 16:17:06
 * @LastEditors: Tentel
 * @LastEditTime: 2022-10-19 16:42:11
 */
//import LRU from "lru-cache";
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  mode: 'spa',
  head: {
    title: '东方电气',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: '东方电气' },
      { hid: 'keywords', name: 'keywords', content: '东方电气' },
      { name: 'format-detection', content: '东方,电气' }
    ],
    // link: [
    //   {rel: 'icon', type: 'image/x-icon', href: '/favicon.icon'}
    // ],
    script: [
      { src: '//unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js' }
    ]
  },
  env: {
    NUXT_ENV: process.env.MODE,
    NUXT_DC: process.env.DC || '/',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'assets/style/base.scss',
    'assets/style/font-awesome.min.css'
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/components',
    // '@/utils/tools',
    { src: '@/plugins/httpRequest', ssr: true },
    { src: '@/plugins/routerValidate', ssr: true },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [[
    '@nuxtjs/router',
    //
    { keepDefaultRouter: true, path: './router', fileName: 'index.js' },
  ],],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    '@femessage/nuxt-micro-frontend',
  ],

  // 暴露乾坤
  MFE: {
    force: true
  },

  axios: {
    proxy: true,
    credentials: true,// 表示跨域请求时是否需要使用凭证
    baseUrl: process.env.MODE
  },
  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: axiosBaseUrl
  //   }
  // },

  // privateRuntimeConfig: {
  //   axios: {
  //     baseURL: axiosBaseUrl
  //   }
  // },
  proxy: {
    '/api': {
      target: process.env.MODE,
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/api': '/'
      }
    },
    '/dc': {
      target: process.env.DC,
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/dc': '/'
      }
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    // publicPath: '/_nuxt'
  },
}
