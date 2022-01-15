<template>
  <div class="min-h-screen w-screen bg-purple-200">
    <nav class="bg-purple-200 shadow-lg">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between">
          <div class="flex space-x-7">
            <!-- Website Logo -->
            <div>
              <a href="/" class="flex items-center py-4 px-2">
                <img src="/logo.png" alt="Logo" class="h-8 w-8 mr-2" />
                <span class="font-semibold text-black text-lg"
                  >Atridad's Site</span
                >
              </a>
            </div>
            <!-- Primary Navbar items -->
            <div class="flex items-center space-x-1">
              <nuxt-link class="mx-2" to="/">Home</nuxt-link>
              <nuxt-link class="mx-2" to="/freelance">Freelance</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="max-w-7xl mx-auto grid place-items-center h-screen">
      <Nuxt class="py-6"/>
    </div>
  </div>
</template>

<script>
export default {}
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