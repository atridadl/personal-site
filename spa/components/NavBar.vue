<script setup lang="ts">
  import { ref } from 'vue';

  // props
  const props = defineProps(['logoRoute', 'routes', 'links', 'button']);

  // data
  const open = ref(false);

  function toggle() {
      open.value = !open.value;
  }
</script>

<template>
  <nav class="flex items-center justify-between flex-wrap p-6">
    <div class="flex items-center flex-no-shrink text-black mr-6">
      <span class="font-semibold text-xl tracking-tight">Atridad</span>
    </div>
    <div class="block sm:hidden">
      <button @click="toggle" class="flex items-center px-3 py-2 border rounded text-black border-black hover:text-pink-600 hover:border-pink-600">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div :class="open ? 'block': 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
      <div class="text-sm sm:flex-grow">
        <NuxtLink v-for="route in routes" :key="route.route" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-black hover:text-pink-600 mr-4" :to="route.route">{{ route.name }}</NuxtLink>
        <a v-for="link in links" :key="link.name" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-black hover:text-pink-600 mr-4" :href="link.route" target="_blank">{{ link.name }}</a>
      </div>
      <div v-if="button">
        <a :href="button.route" target="_blank" class="no-underline inline-block text-sm px-4 py-2 leading-none border-2 rounded text-black border-black hover:border-pink-600 hover:text-pink-600 mt-4 sm:mt-0">{{ button.name }}</a>
      </div>
    </div>
  </nav>
</template>

<style>
.router-link-exact-active {
    font-weight: bold;
    color: #db2777 !important;
}
</style>