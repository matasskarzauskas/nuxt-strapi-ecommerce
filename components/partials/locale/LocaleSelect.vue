<template>
  <div class="locale-select flex items-center justify-center rounded-md bg-teal-400 text-white overflow-hidden" @click="openLocaleDialog">
    <country-flag :country="currentLocale.code"/>
    <span class="cart-count bg-teal-600 px-4 py-5 hidden sm:flex">{{ currentLocale.name }}</span>
    <DynamicDialog />
  </div>
</template>

<script setup lang="ts">
  import LocaleDialog from "./LocaleDialog.vue"
  import { useDialog } from 'primevue/usedialog';
  const { $getLocale } = useNuxtApp()

  const dialog = useDialog();
  const locale = $getLocale()

  if (locale.code === 'en') {
    locale.code = 'gb'
  }

  const currentLocale = ref(locale)

  const openLocaleDialog = () => {
    dialog.open(LocaleDialog, {
      props :{
        header: 'Choose your localization',
        modal: true,
        draggable: false,
        dismissableMask: true,
      },
    });
  };
</script>

<style>
.normal-flag {
  margin: 0 !important;
}

.locale-select {
  cursor: pointer;
}
</style>