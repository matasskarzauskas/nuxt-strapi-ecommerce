// https://v3.nuxtjs.org/api/configuration/nuxt.config
// @ts-ignore
export default defineNuxtConfig({
    ssr: true,
    target: 'server',
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/strapi',
        ['@pinia/nuxt', {
            autoImports: ['defineStore', 'acceptHMRUpdate'],
        }],
        '@intlify/nuxt3',
    ],
    css: [
        'primevue/resources/themes/lara-light-teal/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css'
    ],
    components: true,
    build: {
        transpile: ['locale', 'vuecountryflag', 'primevue']
    },
    strapi: {
        url: process.env.STRAPI_URL || 'http://localhost:1337',
        prefix: '/api',
        version: 'v4',
        cookie: {},
        cookieName: 'strapi_jwt'
    },
    intlify: {
        localeDir: 'locales', // set the `locales` directory at source directory of your Nuxt application
        vueI18n: {
            locale: 'en',
        }
    },
    typescript: {
        strict: true
    },
    runtimeConfig: {
        strapi: {
            url: process.env.STRAPI_URL || 'http://localhost:1337',
        }
    },
    imports: {
        dirs: ['stores'],
    }
})
