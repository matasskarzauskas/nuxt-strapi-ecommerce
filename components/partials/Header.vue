<template>
  <div class="bg-teal-500">
    <div class="container mx-auto px-5 sm:px-10 lg:px-20 p-4 text-white">
      <div class="flex justify-between items-center">
        <NuxtLink to="/">Store</NuxtLink>

        <div class="header-right flex items-center gap-4">
          <div class="header-account">
            <NuxtLink to="/" class="bg-teal-400 p-3 rounded flex">
              <i class="pi pi-user"></i>
            </NuxtLink>
          </div>
          <div class="header-cart rounded overflow-hidden">
            <NuxtLink to="/" class="flex items-center">
              <i class="pi pi-shopping-cart bg-teal-400 p-3"></i>
              <span class="cart-count bg-teal-600 px-4 py-2 hidden sm:flex">$0.00</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
.header-locale {
  line-height: 0;
}
</style>
