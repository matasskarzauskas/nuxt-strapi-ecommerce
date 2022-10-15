import CountryFlag from 'vue-country-flag-next'
import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component('country-flag', CountryFlag)
    //other components that you need
})