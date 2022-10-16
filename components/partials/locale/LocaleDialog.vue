<template>
  <div v-if="locales" class="flex flex-col gap-4">
    <!-- Language -->
    <div class="flex flex-col">
      <label for="language" class="p-0 mb-1 font-medium">Language</label>
      <Dropdown id="language" class="w-100 p-dropdown-sm" v-model="selectedLocale" :options="locales" optionLabel="name" :filter="true" placeholder="Select a language">
        <template #option="slotProps">
          <div class="flex items-center p-0">
            <country-flag class="rounded" :country="slotProps.option.code"/>
            <span>{{ slotProps.option.name }}</span>
          </div>
        </template>
        <template #value="slotProps">
          <div class="flex items-center p-0">
            <country-flag class="rounded" :country="slotProps.value.code"/>
            <span>{{ slotProps.value.name }}</span>
          </div>
        </template>
      </Dropdown>
    </div>

    <!-- Currency -->
    <div class="flex flex-col">
      <label for="currency" class="p-0 mb-1 font-medium">Currency</label>
      <Dropdown id="currency" class="w-100 p-dropdown currency-dropdown" v-model="selectedCurrency" :options="currencies" optionLabel="name" :filter="true" placeholder="Select a Currency">
        <template #option="slotProps">
          <div class="flex items-center p-0">
            <div class="bg-gray-400 text-white text-sm rounded flex items-center justify-center currency-box">
              {{ slotProps.option.symbol }}
            </div>
            <span>{{ slotProps.option.name }}</span>
          </div>
        </template>
        <template #value="slotProps">
          <div class="flex items-center p-0">
            <div class="bg-gray-400 text-white text-sm rounded flex items-center justify-center currency-box">
              {{ decodeURI(slotProps.value.symbol) }}
            </div>
            <span>{{ slotProps.value.name }}</span>
          </div>
        </template>
      </Dropdown>
    </div>

<!--    <Listbox class="bg-gray-100" v-model="selectedLocale" :options="locales" :multiple="false" :filter="true" optionLabel="locale" listStyle="max-height:250px" style="width: 100%">-->
<!--      <template #option="slotProps">-->
<!--        <div class="flex items-center p-0 rounded">-->
<!--          <country-flag :country="slotProps.option.code"/>-->
<!--          <span>{{slotProps.option.name}}</span>-->
<!--        </div>-->
<!--      </template>-->
<!--    </Listbox>-->

    <Message v-if="msg.content" :severity="msg.severity" @close="msg.content = ''">{{ msg.content }}</Message>

    <button class="px-3 py-2 bg-teal-500 w-auto text-white font-semibold rounded hover:bg-teal-600" @click="confirmSelection">Confirm</button>
  </div>
  <Toast />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const { $setLocale, $getLocale } = useNuxtApp()
  const { find } = useStrapi()
  const localeCookie = useCookie('locale')

  const getSelectedLocale = async() => {
    const locale = await $getLocale()

    if (locale.code === 'en') {
      locale.code = 'gb'
    }

    return {
      code: locale.code,
      name: locale.name,
      currencyName: locale.currencyName,
      currencySymbol: locale.currencySymbol,
    }
  }

  const selectedLocale = ref(await getSelectedLocale())
  const selectedCurrency = ref({
    name: selectedLocale.value.currencyName,
    symbol: selectedLocale.value.currencySymbol,
  })

  const msg = ref({ content: '', severity: '' })

  console.log(selectedLocale.value)

  const loadLocales = async() => {
    try {
      const response = await find('i18n/locales')

      if (!response) {
        return []
      }

      // @ts-ignore
      response.forEach((locale) => {
        locale.name = locale.name.replace(/ \([a-z]{2}\)/, '')
        if (locale.code === 'en') {
          locale.code = 'gb'
        }
      })

      return response
    } catch (e) {}
  }

  const loadCurrencies = async() => {
    try {
      const response =  await find('localisation-setting', {
        populate: ['Currency']
      })

      if (!response.data.attributes.Currency) {
        return []
      }

      return response.data.attributes.Currency
    } catch (e) {}
  }

  const confirmSelection = () => {
    if (!selectedLocale.value) {
      msg.value = { content: 'Please select a language', severity: 'error' }
      return
    }

    let codeSelection = selectedLocale.value.code
    if (selectedLocale.value.code === 'gb') {
      codeSelection = 'en'
    }

    const locale = {
      'code': codeSelection,
      'name': selectedLocale.value.name,
      'currencyName': selectedCurrency.value.name,
      'currencySymbol': encodeURI(selectedCurrency.value.symbol),
    }

    $setLocale(locale)
    window.location.reload()
  }

  const locales = ref(await loadLocales());
  const currencies = ref(await loadCurrencies())
</script>

<style>
.p-listbox,
.p-listbox .p-listbox-header {
  border: none;
  border-top-right-radius: 0.375rem;
  border-top-left-radius: 0.375rem;
}

.p-listbox.p-focus {
  box-shadow: none;
}

.p-listbox .p-listbox-header {
  background: theme('colors.gray.200');
  padding: 1rem;
}

.p-listbox-list-wrapper {
  background: theme('colors.gray.100');
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

.p-listbox .p-listbox-list {
  padding: 0;
}

.p-listbox .p-listbox-list .p-listbox-item:first-child {
  border-top: none;
}

.p-listbox .p-listbox-list .p-listbox-item:last-child {
  border-bottom: none;
}

.p-listbox .p-listbox-list .p-listbox-item {
  border-bottom: 1px solid #dddddd;
}

.p-inputtext {
  border: none;
}

.p-dialog .p-dialog-header .p-dialog-header-icon:focus,
.p-inputtext:enabled:focus {
  box-shadow: 0 0 0 0.2rem theme('colors.gray.100');
}

.p-dialog-header {
  gap: 40px;
}

.p-listbox-filter-container .p-listbox-filter {
  font-size: 0.875rem;
  padding: 0.65625rem 0.65625rem;
}

.p-dropdown {
  background: theme('colors.gray.100');
  border: none;
}

.p-dropdown:hover {
  background: theme('colors.gray.200');
}

.p-dropdown:not(.p-disabled).p-focus {
  box-shadow: none;
}

.currency-box {
  width: 26px;
  height: 20px;
  margin-left: 0.8rem;
  margin-right: 0.8rem;
}

.currency-dropdown {
  min-height: 63px;
}

.currency-dropdown .p-dropdown-label {
  display: flex;
}
</style>