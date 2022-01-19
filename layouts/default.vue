<template>
  <div class="min-h-screen w-full bg-purple-200">
    <nav class="flex items-center justify-between flex-wrap bg-purple-200 p-6">
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
          <nuxt-link class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-pink-600 mr-4" to="/">Home</nuxt-link>
          <nuxt-link class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-pink-600 mr-4" to="/freelance">Freelance</nuxt-link>
        </div>
        <div>
          <a href="https://cloud.lahutton.ca/s/mkfCEoB8i3Sz4KH/download" class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-pink-600 hover:text-pink-600 mt-4 sm:mt-0">Resume</a>
        </div>
      </div>
    </nav>
    <Nuxt class="py-32"/>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      open: false,
    }
  },
  methods: {
  	toggle() {
    	this.open = !this.open
    }
  }
}
</script>

<style>
html {
  background-color: #ddd6fe;
}
.nuxt-link-exact-active {
    font-weight: bold;
    color: #db2777;
}
</style>