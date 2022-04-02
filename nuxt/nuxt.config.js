export default {
  // Relocate nuxt directory structure
  // https://nuxtjs.org/docs/configuration-glossary/configuration-srcdir
  srcDir: 'client/',

  env: {
    dev: true,
    baseUrl: process.env.NUXT_BASE_URL,
    authUrl: process.env.NUXT_BASE_URL + '/auth', // proxied
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Druxt Sandbox Next',
    htmlAttrs: {
      lang: 'en',
      'data-theme': 'custom-theme', // 🌼 See tailwind.config.js
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/stripHTML.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/postcss8',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth-next', // @DRUXT_NOTE may be included in druxt-site in future?
    'druxt-site', // @DRUXT_NOTE includes proxy, axios
  ],

  // @DRUXT_NOTE you shouldn't need to include druxt-xyz as a
  // @DRUXT_NOTE module. use build modules
  // Modules: https://go.nuxtjs.dev/config-modules
  // modules: [],

  // @DRUXT_NOTE you can remove nuxt's boilerplate axios options
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {
  //   // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
  //   baseURL: '/',
  // },

  router: {
    // Modify path names of protected routes
    extendRoutes(routes) {
      const vanityPath = (routes, path, routePath, addAuthFlag = false) => {
        const route = routes.find((route) => {
          return route.path.includes(path)
        })
        route.path = routePath
        if (addAuthFlag) route.meta = { requiresAuth: true }
      }
      // Get protected `Dashboard` route
      vanityPath(routes, 'protected/dashboard', '/dashboard', true)
      vanityPath(routes, 'auth/login', '/login', true)
      vanityPath(routes, 'auth/register', '/register', true)
    },
    // @DRUXT_NOTE router middleware can break druxt-site,
    // @TODO find a work-around for dumping users
    // Dump unauthorised users to /login
    middleware: ['auth'],
  },

  // DruxtJS: https://druxtjs.org
  druxt: {
    baseUrl: 'http://drupal.ddev.site', // process.env.DRUPAL_BASE_URL, // http://drupal.ddev.site
    endpoint: '/jsonapi',
    // https://druxtjs.org/guide/proxy
    // proxy: { api: false, files: false },

    // Disable deprecated Entity fields.
    entity: { components: { fields: false } },

    // Set the default theme to render Site regions.
    site: { theme: 'umami' },

    // router: {
    //   middleware: true,
    //   pages: true,
    //   wildcard: true,
    // },
    // debug: true,
    // schema: true,
  },

  // Proxy to prevent CORS errors on JWT server
  proxy: {
    '/auth/': {
      target: process.env.AUTH_BASE_URL,
      pathRewrite: { '^/auth/': '' },
    },
  },

  auth: {
    watchLoggedIn: true,
    strategies: {
      // local is the default, credentials/token based scheme for flows like JWT.
      local: {
        token: {
          property: 'token',
          global: true,
        },
        user: {
          property: '',
          autoFetch: true,
        },
        endpoints: {
          // login endpoint, grants a token
          login: {
            url: `${process.env.NUXT_BASE_URL}/auth/login`,
            method: 'post',
          },
          // logout endpoint (doesn't exist yet)
          logout: {
            url: `${process.env.NUXT_BASE_URL}/auth/logout`,
            method: 'post',
          },
          // autoFetch endpoint (returns user info when not stored locally)
          user: {
            url: `${process.env.NUXT_BASE_URL}/auth/user`,
            method: 'get',
          },
        },
      },
      auth0: {
        domain: process.env.AUTH0_DOMAIN || '',
        clientId: process.env.AUTH0_CLIENTID || '',
        audience: process.env.AUTH0_AUDIENCE || '',
        logoutRedirectUri: process.env.NUXT_BASE_URL,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': 'postcss-nesting',
        tailwindcss: {},
        autoprefixer: {},
        'postcss-preset-env': {
          features: { 'nesting-rules': false },
        },
      },
    },
  },
}
