<template>
  <div class="bg-teal-500">
    <div class="container mx-auto px-5 sm:px-10 lg:px-20 p-4 text-white">
      <div class="flex justify-between items-center">
        <div class="footer-left flex items-center gap-4">
          <div class="footer-locale">
            <LocaleSelect />
          </div>
        </div>

        <div class="footer-right flex items-center gap-4">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LocaleSelect from '@/components/partials/locale/LocaleSelect.vue';
</script>

<style>
.footer-locale {
  line-height: 0;
}
</style>
