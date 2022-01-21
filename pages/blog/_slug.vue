<template>
  <article class="grid grid-cols-12 pb-24">
    <div class="w-full col-start-1 col-span-12 grid grid-cols-12">
      <div class="col-start-4 col-span-6 w-full">
        <div>
          <NuxtLink to="/" class="block text-gray-500 mt-8">← Go Back</NuxtLink>
          <p>Posted: {{ post.date }}</p>
          <h1 class="text-5xl font-black mt-2">{{ post.title }}</h1>
        </div>
        <nuxt-content class="mt-4 prose max-w-none" :document="post" />
        <script defer src="https://comments.atridad.dev/js/commento.js"></script>
        <div id="commento"></div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
        const post = await $content(params.slug).fetch()
        return { post }
    },
    head() {
        return {
          title: this.post.title,
        }
    }
}
</script>