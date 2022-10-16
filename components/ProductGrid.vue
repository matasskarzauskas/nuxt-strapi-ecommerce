<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
    <div v-for="product in products" :key="product.id" class="">
      <div class="bg-white rounded-md  overflow-hidden">
        <div class="relative pb-48 overflow-hidden bg-gray-100 h-40 sm:h-60 lg:h-60 xl:h-80">
          <img class="absolute inset-0 p-4 h-full w-full object-contain" :src="$config.strapi.url + product.attributes.cover.data.attributes.url" :alt="product.attributes.cover.data.alternativeText">
        </div>
        <div class="p-4 bg-gray-200">
          <h3 class="text-lg font-semibold text-gray-700">{{ product.attributes.name }}</h3>
          <p class="text-gray-600">{{ product.attributes.description }}</p>
          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center">
              <span class="text-gray-700 font-semibold">${{ product.attributes.price }}</span>
            </div>
            <button class="px-3 py-2 bg-teal-500 text-white text-xs font-semibold rounded hover:bg-teal-600"><i class="pi pi-shopping-cart mr-2"></i>{{ $t('addToCart') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { $getLocale } = useNuxtApp()
  const loadProducts = async() => {
    try {
      const { find } = useStrapi()
      const response = await find("products", {
        pagination: {
          page: 1,
          pageSize: 10
        },
        populate: [
            'cover'
        ],
        locale: (await $getLocale()).code
      });

      return response.data;
    } catch (e) {}
  }

  const products = await loadProducts();
</script>