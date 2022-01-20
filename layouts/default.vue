<template>
  <div class="min-h-screen w-full bg-purple-200">
    <NavBar :items="navItems" :button="navButton"/>
    <Nuxt class="py-32"/>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      navItems: [
        {
          name: "Home",
          route: "/",
        },
        {
          name: "Freelance",
          route: "/freelance",
        },
        {
          name: "Projects",
          route: "/projects"
        }
      ],
      navButton: {
        name: "Resume",
        route: "https://cloud.lahutton.ca/s/mkfCEoB8i3Sz4KH/download"
      },
    }
  },
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