import PrimeVue from 'primevue/config'

// Components
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import DynamicDialog from 'primevue/dynamicdialog';
import Dropdown from 'primevue/dropdown';
import Listbox from 'primevue/listbox';
import Message from 'primevue/message';

// Services
import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice';
import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: false })
    // Services
    nuxtApp.vueApp.use(ToastService)
    nuxtApp.vueApp.use(DialogService)

    // Components
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('InputText', InputText)
    nuxtApp.vueApp.component('Toast', Toast)
    nuxtApp.vueApp.component('DynamicDialog', DynamicDialog)
    nuxtApp.vueApp.component('Dropdown', Dropdown)
    nuxtApp.vueApp.component('Listbox', Listbox)
    nuxtApp.vueApp.component('Message', Message)
})