<script setup lang="ts">
import Pill from "../components/Pill.vue"

const props = defineProps(["pills"]);
</script>

<template>
    <div class="flex flex-wrap justify-center items-center space-x-3 m-6">
        <Pill v-for="pill in props.pills" :key="pill.name" :name="pill.name" :colour="pill.colour" />
    </div>
</template>