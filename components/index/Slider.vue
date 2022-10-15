<template>
  <swiper
      v-if="slides"
      :modules="modules"
      :slides-per-view="1"
      :space-between="0"
      :autoplay="true"
      :loop="true"
      navigation
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="w-full index-slider rounded-md"
  >
    <swiper-slide v-for="slide in slides" :key="slide.id">
      <div class="relative">
        <img :src="$config.strapi.url + slide.attributes.url" :alt="slide.attributes.alternativeText" class="w-full h-full object-cover">
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Navigation, Pagination } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  const loadSlides = async() => {
    try {
      const { find } = useStrapi()
      const response = await find("index-page", {
        populate: [
          'Slider'
        ]
      });

      return response.data.attributes.Slider.data ?? [];
    } catch (e) {}
  }

  const onSwiper = () => {};
  const onSlideChange = () => {};

  const slides = await loadSlides();
  const modules = [Navigation, Pagination];
</script>

<style>
:root {
  --swiper-theme-color: white;
}

.index-slider {
  max-height: 500px;
}
</style>