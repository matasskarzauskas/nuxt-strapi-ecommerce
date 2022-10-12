<template>
  <div class="p-5 bg-teal-500 text-white">
    <NuxtLink to="/">Store</NuxtLink>
  </div>

  <ProductGrid></ProductGrid>
</template>

<script setup lang="ts">

  import ProductGrid from '~/components/ProductGrid.vue'
</script>
