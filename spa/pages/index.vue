<script setup lang="ts">
  const pills = [
    { name: "Vue", colour: "black" },
    { name: "AWS", colour: "black" },
    { name: "CDK", colour: "black" },
    { name: "JavaScript", colour: "black" },
    { name: "TypeScript", colour: "black" },
    { name: "Git", colour: "black" },
    { name: "Golang", colour: "black" },
    { name: "Bash", colour: "black" },
    { name: "Firebase", colour: "black" },
    { name: "WordPress", colour: "black" },
    { name: "Node.js", colour: "black" },
  ];

  const socialLinks = [
    { text: "GitHub", name: "github", type: "fab", to: "https://github.com/atridadl" },
    { text: "Twitter", name: "mastodon", type: "fab", to: "https://twitter.com/atridadl" },
    { text: "Email", name: "envelope", type: "fas", to: "mailto:atridadl@outlook.com" },
    { text: "LinkedIn", name: "linkedin", type: "fab", to: "https://www.linkedin.com/in/atridad/" },
    { text: "Spotify", name: "spotify", type: "fab", to: "https://open.spotify.com/user/31t2imafllz5pplhzfrmkrmivpi4?si=a69fbed632884b94" }
  ];
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