<template>
  <div class="transition-all duration-500 ease-in-out">
    <a :href="`/blog/${post.slug}`">
      <div class="flex flex-wrap justify-center items-center ">
        <h2 class="text-2xl font-semibold">[{{ post.date }}]: {{ post.title }}</h2>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  }
}
</script>