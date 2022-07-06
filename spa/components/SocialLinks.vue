<script setup lang="ts">
const props = defineProps(["links"]);
</script>
<template>
    <div class="flex flex-wrap justify-center items-center space-x-3 m-6">
        <SocialLink v-for="link in props.links" :key="link.name" :text="link.text" :name="link.name" :type="link.type" :to="link.to" />
    </div>
</template>