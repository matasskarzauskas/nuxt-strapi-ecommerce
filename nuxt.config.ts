// https://v3.nuxtjs.org/api/configuration/nuxt.config
// @ts-ignore
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/strapi',
    ],
    strapi: {
        url: process.env.STRAPI_URL || 'http://localhost:1337',
        prefix: '/api',
        version: 'v4',
        cookie: {},
        cookieName: 'strapi_jwt'
    },
    typescript: {
        strict: true
    },
    runtimeConfig: {
        strapi: {
            url: process.env.STRAPI_URL || 'http://localhost:1337',
        }
    }
})
