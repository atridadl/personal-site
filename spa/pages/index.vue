<script setup lang="ts">
  import config from "../config";

  const pills = config.pills;

  const socialLinks = config.socialLinks;
</script>

<template>
  <div>
    <h1 class="text-5xl font-black text-center">Hi, I'm Atridad!</h1>
    <h2 class="text-xl font-black text-center">(he/him)</h2>

    <img
      class="rounded-lg mx-auto my-6"
      height="250"
      width="250"
      src="~/assets/img/logo.webp"
      alt="A cartoon drawing of me."
    />

    <SocialLinks :links="socialLinks" />

    <h3 class="text-2xl font-black text-center m-6">I type things and sometimes those things end up in your browser.</h3>

    <h3 class="text-lg font-black text-center m-6">Some of my skills:</h3>

    <PillBox :pills="pills" />
  </div>
</template>