<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { routes } from "./router";
  import NavBar from "./components/NavBar.vue";

  const route = useRoute();
  const router = useRouter();

  const navButton = ref({
    name: "Status",
    route: "https://status.atridad.ca/status"
  });

  function setViewHeight () {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  onMounted(() => {
    setViewHeight()
    window.addEventListener('resize', () => {
      setViewHeight()
    })
  })
</script>

<template>
  <NavBar :items="routes" :button="navButton" />
  <router-view />
</template>

<style>
html {
  background-color: #ddd6fe;
}
.router-link-exact-active {
    font-weight: bold;
    color: #db2777 !important;
}
</style>
