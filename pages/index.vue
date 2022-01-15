<template>
  <div>
    <h1 class="text-7xl font-black text-center">Hi, I'm Atridad!</h1>
    <h2 class="text-xl font-black text-center">(he/him)</h2>

    <nuxt-img
      class="rounded-lg mx-auto my-6"
      src="/logo.png"
      width="250"
      height="250"
    />

    <div class="flex flex-wrap justify-center items-center space-x-3 m-6">
      <a class="group" href="https://git.atridad.dev/atridad" target="_blank"><IconGitPullRequest class="group-hover:text-pink-600" :size="32" /></a>
      <a class="group" href="https://social.atridad.dev/@atridad" target="_blank"><IconTwitter class="group-hover:text-pink-600" :size="32" /></a>
      <a class="group" href="https://pixel.atridad.dev/atridad" target="_blank"><IconInstagram class="group-hover:text-pink-600" :size="32" /></a>
      <a class="group" href="mailto:atridad@icloud.com" target="_blank"><IconMail class="group-hover:text-pink-600" :size="32" /></a>
    </div>

    <h3 class="text-l font-black text-center m-6">Freelance Software Engineer, Sysadmin, and Certified Nerd</h3>

    <h2 class="text-3xl font-black text-center m-6">Posts:</h2>

    <div class="flex flex-wrap justify-center items-center space-x-3 m-6">
      <PostPreview v-for="post in posts" :key="post.slug" :post="post" class="hover:text-pink-600"></PostPreview>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const posts = await $content()
      .only(['title', 'slug'])
      .sortBy('createdAt', 'desc')
      .fetch()
      
    console.log("posts", posts)  

    return {
      posts,
    }
  },
}
</script>
