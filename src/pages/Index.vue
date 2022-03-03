<script setup lang="ts">
  import PillBox from "../components/PillBox.vue";
  import SocialLinks from "../components/SocialLinks.vue";

  const skills = [
    { name: "Vue", colour: "green" },
    { name: "AWS", colour: "orange" },
    { name: "CDK", colour: "orange" },
    { name: "JavaScript", colour: "yellow" },
    { name: "TypeScript", colour: "blue" },
    { name: "Git", colour: "black" },
    { name: "Golang", colour: "teal" },
    { name: "Bash", colour: "purple" },
    { name: "Firebase", colour: "orange" },
    { name: "WordPress", colour: "blue" },
  ];

  const socialLinks = [
    { name: "GitHub", type: "github", to: "https://github.com/atridadl" },
    { name: "Email", type: "mail", to: "mailto:atridad@icloud.com" },
    { name: "Twitter", type: "twitter", to: "https://twitter.com/atridadl" },
    { name: "Instagram", type: "instagram", to: "https://www.instagram.com/atridadl/" },
    { name: "LinkedIn", type: "linkedin", to: "https://www.linkedin.com/in/atridad/" },
  ];
</script>

<template>
  <div>
    <h1 class="text-5xl font-black text-center">Hi, I'm Atridad!</h1>
    <h2 class="text-xl font-black text-center">(he/him)</h2>

    <img
      class="rounded-lg mx-auto my-6 max-w-[250px] w-1/2"
      src="/src/assets/logo.webp"
      alt="A cartoon drawing of my me."
    />

    <SocialLinks :links="socialLinks" />

    <h3 class="text-2xl font-black text-center m-6">Freelance Software Engineer, Sysadmin, and Certified Nerd</h3>

    <h3 class="text-lg font-black text-center m-6">Some of my skills:</h3>

    <PillBox :pills="skills" />
  </div>
</template>
