<template>
  <div class="container mx-auto px-20">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="product in products" :key="product.id" class="p-4">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="relative pb-48 overflow-hidden">
            <img class="absolute inset-0 h-full w-full object-contain" :src="$config.strapi.url + product.attributes.cover.data.attributes.url" :alt="product.attributes.cover.data.alternativeText">
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-700">{{ product.attributes.name }}</h3>
            <p class="text-gray-600">{{ product.attributes.description }}</p>
            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center">
                <span class="text-gray-700 font-semibold">${{ product.attributes.price }}</span>
              </div>
              <button class="px-3 py-2 bg-teal-500 text-white text-xs font-semibold rounded hover:bg-teal-600">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Product } from "~/types";

  const loadProducts = async() => {
    try {
      const { find } = useStrapi<Product>()
      const response = await find<Product>("products", {
        pagination: {
          page: 1,
          pageSize: 10
        },
        populate: [
            'cover'
        ]
      });

      return response.data;
    } catch (e) {}
  }

  const products = await loadProducts();
</script>