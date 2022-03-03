<script setup lang="ts">
    import VueFeather from 'vue-feather';

    const props = defineProps(["name", "type", "to"])
</script>

<template>
    <a
        class="text-center no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-pink-600 hover:text-pink-600 m-2 sm:mt-0"
        :href="to"
        target="_blank"
    >
        <vue-feather :type="type"></vue-feather>
        <div>{{ props.name }}</div>
    </a>
</template>