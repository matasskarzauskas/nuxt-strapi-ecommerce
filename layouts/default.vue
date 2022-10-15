<template>
  <div>
    <Header></Header>
    <section class="content-section container mx-auto px-5 sm:px-10 lg:px-20 p-4">
      <slot></slot>
    </section>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
  import Header from "~/components/partials/Header.vue";
  import Footer from "~/components/partials/Footer.vue";
</script>

<style>
.content-section {
  min-height: calc(100vh);
}
</style>