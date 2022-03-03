<script setup lang="ts">
import SocialLink from "../components/SocialLink.vue"

const props = defineProps(["links"]);
</script>

<template>
    <div class="flex flex-wrap justify-center items-center space-x-3 m-6">
        <SocialLink v-for="link in props.links" :key="link.name" :name="link.name" :type="link.type" :to="link.to" />
    </div>
</template>