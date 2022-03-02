<script setup lang="ts">
import { ref } from "vue";
import VueFeather from 'vue-feather';
</script>

<template>
  <div>
    <h1 class="text-5xl font-black text-center">Hi, I'm Atridad!</h1>
    <h2 class="text-xl font-black text-center">(he/him)</h2>

    <img
      class="rounded-lg mx-auto my-6 max-w-[250px] w-1/2"
      src="/src/assets/logo.webp"
      alt="A cartoon drawing of my face."
    />

    <div class="flex flex-wrap justify-center items-center space-x-3 m-6">
      <a class="text-center no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-pink-600 hover:text-pink-600 mt-4 sm:mt-0" href="https://github.com/atridadl" target="_blank">
        <vue-feather type="github"></vue-feather>
        <div>Github</div>
      </a>

      <a class="text-center no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-pink-600 hover:text-pink-600 mt-4 sm:mt-0" href="mailto:atridad@icloud.com" target="_blank">
        <vue-feather class="group-hover:text-pink-600" type="mail"></vue-feather>
        <div>Email</div>
      </a>

      <a class="text-center no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-pink-600 hover:text-pink-600 mt-4 sm:mt-0" href="https://twitter.com/atridadl" target="_blank">
        <vue-feather class="group-hover:text-pink-600" type="twitter"></vue-feather>
        <div>Twitter</div>
      </a>

      <a class="text-center no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-pink-600 hover:text-pink-600 mt-4 sm:mt-0" href="https://www.instagram.com/atridadl/" target="_blank">
        <vue-feather class="group-hover:text-pink-600" type="instagram"></vue-feather>
        <div>Instagram</div>
     </a>
    </div>

    <h3 class="text-2xl font-black text-center m-6">Freelance Software Engineer, Sysadmin, and Certified Nerd</h3>
  </div>
</template>
