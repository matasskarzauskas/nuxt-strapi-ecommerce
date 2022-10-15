export default defineNuxtPlugin(() => {
    const localeCookie = useCookie('locale')

    return {
        provide: {
            getLocale: () => {
                if (!localeCookie.value) {
                    localeCookie.value = btoa(JSON.stringify({ code: 'en', name: 'English' }))
                }

                return JSON.parse(atob(localeCookie.value))
            },
            setLocale: (locale) => {
                if (locale.code && locale.name) {
                    localeCookie.value = btoa(JSON.stringify(locale))
                }
            }
        }
    }
})