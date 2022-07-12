<script setup lang="ts">
  import config from "../config";

  const route = useRoute();
  const router = useRouter();
  const logoRoute = ref("/")
  const navButton = ref();

  const routes = ref(config.routes);

  const links = ref(config.links);
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
<Head>
      <Title>Atri's Site</Title>
      <Meta name="description" content="Atri's Site" />
</Head>
    <NavBar :logoRoute="logoRoute" :routes="routes" :links="links" :button="navButton" />
    <NuxtPage />
</template>

<style>
html {
  background-color: #c7bdfe;
}
h1 { 
  display: block;
  font-size: 2em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h2 {
  display: block;
  font-size: 1.5em;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h3 { 
  display: block;
  font-size: 1.17em;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h4 { 
  display: block;
  font-size: 1em;
  margin-top: 1.33em;
  margin-bottom: 1.33em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h5 { 
  display: block;
  font-size: .83em;
  margin-top: 1.67em;
  margin-bottom: 1.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h6 { 
  display: block;
  font-size: .67em;
  margin-top: 2.33em;
  margin-bottom: 2.33em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
blockquote {
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 40px;
  margin-right: 40px;
}
</style>