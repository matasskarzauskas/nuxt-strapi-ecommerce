<template>
  <div v-if="locales" class="flex flex-col gap-4">
<!--    <Dropdown class="w-100 p-dropdown-sm" v-model="selectedLocale" :options="locales" optionLabel="name" :filter="true" placeholder="Select a language">-->

<!--      <template #option="slotProps">-->
<!--        <div class="flex items-center p-0">-->
<!--          <country-flag :country="slotProps.option.code"/>-->
<!--          <span>{{ slotProps.option.name }}</span>-->
<!--        </div>-->
<!--      </template>-->
<!--    </Dropdown>-->

    <Listbox class="bg-gray-100" v-model="selectedLocale" :options="locales" :multiple="false" :filter="true" optionLabel="locale" listStyle="max-height:250px" style="width: 100%">
      <template #option="slotProps">
        <div class="flex items-center p-0 rounded">
          <country-flag :country="slotProps.option.code"/>
          <span>{{slotProps.option.name}}</span>
        </div>
      </template>
    </Listbox>

    <Message v-if="msg.content" :severity="msg.severity" @close="msg.content = ''">{{ msg.content }}</Message>

    <button class="px-3 py-2 bg-teal-500 w-auto text-white font-semibold rounded hover:bg-teal-600" @click="confirmSelection">Confirm</button>
  </div>
  <Toast />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const { $setLocale } = useNuxtApp()
  import { useToast } from "primevue/usetoast";

  const localeCookie = useCookie('locale')
  const selectedLocale = ref()
  const msg = ref({ content: '', severity: '' })

  const loadLocales = async() => {
    try {
      const { find } = useStrapi()
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

      return response;
    } catch (e) {

    }
  }

  const confirmSelection = () => {
    // check if seleceted
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
    }

    $setLocale(locale)
    window.location.reload()
  }

  const locales = ref(await loadLocales());
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

</style>