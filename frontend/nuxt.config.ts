// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.NODE_ENV === 'development'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  experimental: {
    // inlineSSRStyles: false,
    viewTransition: true,
    renderJsonPayloads: true,
  },

  routeRules: {
    '/**': isDev ? {} : { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } },
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: ["@nuxtjs/sanity", "@nuxt/fonts", '@vueuse/nuxt', '@unocss/nuxt', '@nuxt/image', '@nuxt/test-utils/module'],
  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET,
    apiVersion: process.env.NUXT_SANITY_API_VERSION || "2025-04-01",
    token: process.env.NUXT_SANITY_API_READ_TOKEN, // Only required when using a private dataset
    visualEditing: {
      token: process.env.NUXT_SANITY_API_READ_TOKEN,
      studioUrl: process.env.NUXT_SANITY_STUDIO_URL,
      zIndex: 51,
    },
  },
  runtimeConfig: {
    public: {
      studioUrl: process.env.NUXT_SANITY_STUDIO_URL,
    },
  },

  image: {
    provider: 'proxy',
    providers: {
      proxy: {
        provider: 'ipx',
        options: {
          baseURL: `${process.env.NUXT_SANITY_STUDIO_URL}/ipx`,
        },
      },
    },
  },

  // htmlValidator: {
  //   usePrettier: false,
  //   logLevel: 'verbose',
  //   failOnError: false,
  //   /** A list of routes to ignore (that is, not check validity for). */
  //   ignore: [/\.(xml|rss|json)$/],
  //   options: {
  //     extends: ['html-validate:document', 'html-validate:recommended', 'html-validate:standard'],
  //     rules: {
  //       'svg-focusable': 'off',
  //       'no-unknown-elements': 'error',
  //       // Conflicts or not needed as we use prettier formatting
  //       'void-style': 'off',
  //       'no-trailing-whitespace': 'off',
  //       // Conflict with Nuxt defaults
  //       'require-sri': 'off',
  //       'attribute-boolean-style': 'off',
  //       'doctype-style': 'off',
  //       // Unreasonable rule
  //       'no-inline-style': 'off',
  //     },
  //   },
  // },

  vite: {
    optimizeDeps: {
      include: ["shallowequal", "lodash/startCase.js"],
    },
    plugins: [svgLoader()],
  },
});
