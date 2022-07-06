<script setup>
const { data } = await useAsyncData('posts', () => queryContent('/posts').find())
console.log(data)
</script>

<template>
  <main>
    <h2 class="text-xl font-black text-center">I write things here sometimes...</h2>
    <div class="flex flex-wrap justify-center items-center space-x-3 m-6">
      <ul>
        <li v-for="post in data" class="m-6">
          <NuxtLink class="text-xl no-underline block mt-4 sm:inline-block sm:mt-0 text-black hover:text-pink-600 mr-4" :to="post._path">
            {{post.title}}
          </NuxtLink>
          <br>
          > {{ post.date }}
        </li>
      </ul>
    </div>
  </main>
</template>