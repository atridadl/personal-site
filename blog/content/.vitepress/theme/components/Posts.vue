<script setup lang="ts">
import type { Post } from '../types';
import PostCards from './PostCards.vue';
import Posts from '../../metadata.json';
const posts = Posts as Post[];
</script>
<template>
  <div>
    <PostCards :posts="posts" />
  </div>
</template>
