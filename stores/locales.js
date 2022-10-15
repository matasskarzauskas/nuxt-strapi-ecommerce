//import {useCookie} from "nuxt/app";


export const useLocale = defineStore({
    id: 'locale-store',
    state: () => {
        return {
            activeLocale: {},
        }
    },
    actions: {
        setLocale(locale) {
            this.activeLocale = locale
        }
    },
    getters: {
        locale: state => state.activeLocale,
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLocale, import.meta.hot));
}