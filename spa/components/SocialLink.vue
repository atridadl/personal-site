<script setup lang="ts">
    const props = defineProps(["text", "name", "type", "to"])
</script>

<template>
    <a
        class="text-center no-underline inline-block text-sm px-4 py-2 leading-none border-2 rounded text-black border-black hover:border-pink-600 hover:text-pink-600 m-2 sm:mt-0"
        :href="to"
        target="_blank"
    >
        <font-awesome-icon :icon="[type, name]" size="lg" />
        <div>{{ props.text }}</div>
    </a>
</template>