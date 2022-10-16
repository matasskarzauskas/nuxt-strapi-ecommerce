export default defineNuxtPlugin(() => {
    const localeCookie = useCookie('locale')

    const getDefaultLocale = async() => {
        try {
            const { find } = useStrapi()
            const localeResp = await find('i18n/locales')

            if (!localeResp) {
                return []
            }

            const defaultLocale = localeResp.find(locale => locale.isDefault)

            const currencyResp = await find('localisation-setting', {
                populate: ['DefaultCurrency']
            })

            if (!currencyResp) {
                return []
            }

            const defaultCurrency = currencyResp.data.attributes.DefaultCurrency

            return {
                locale: defaultLocale,
                currency: defaultCurrency
            }
        } catch (e) {}
    }

    return {
        provide: {
            getLocale: async() => {
                if (!localeCookie.value) {
                    const localeSettings = await getDefaultLocale()
                    //const defaultCurrency = await getDefaultCurrency()

                    localeCookie.value = btoa(JSON.stringify({
                        code: localeSettings.locale.code,
                        name: localeSettings.locale.name.replace(/ \([a-z]{2}\)/, ''),
                        currencyName: localeSettings.currency.name,
                        currencySymbol: encodeURI(localeSettings.currency.symbol),
                    }))
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