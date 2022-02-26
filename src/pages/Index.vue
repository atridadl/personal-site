<script setup lang="ts">
import { ref } from "vue";
import VueFeather from 'vue-feather';
</script>

<template>
  <div>
    <h1 class="text-5xl font-black text-center">Hi, I'm Atridad!</h1>
    <h2 class="text-xl font-black text-center">(he/him)</h2>

    <img
      class="rounded-lg mx-auto my-6"
      src="/src/assets/logo.webp"
    />

    <div class="flex flex-wrap justify-center items-center space-x-3 m-6">
      <a class="group" href="https://gethub.ca/atridad" target="_blank"><vue-feather class="group-hover:text-pink-600" type="git-pull-request"></vue-feather></a>
      <a class="group" href="mailto:atridad@icloud.com" target="_blank"><vue-feather class="group-hover:text-pink-600" type="mail"></vue-feather></a>
      <a class="group" href="https://twitter.com/atridadl" target="_blank"><vue-feather class="group-hover:text-pink-600" type="twitter"></vue-feather></a>
      <a class="group" href="https://www.instagram.com/atridadl/" target="_blank"><vue-feather class="group-hover:text-pink-600" type="instagram"></vue-feather></a>
    </div>

    <h3 class="text-2xl font-black text-center m-6">Freelance Software Engineer, Sysadmin, and Certified Nerd</h3>
  </div>
</template>
