<template>
  <div>
    <h1 class="text-7xl font-black text-center">Hi, I'm Atridad!</h1>
    <nuxt-img
      class="rounded-lg mx-auto my-6"
      src="/site/logo.png"
      width="250"
      height="250"
    />
    <ul class="flex flex-wrap justify-center items-center space-x-3 m-6">
      <PostPreview v-for="post in posts" :key="post.slug" :post="post"></PostPreview>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const posts = await $content()
      .only(['title', 'image', 'tags', 'slug'])
      .sortBy('createdAt', 'desc')
      .fetch()
      
    console.log("posts", posts)  

    return {
      posts,
    }
  },
}
</script>
