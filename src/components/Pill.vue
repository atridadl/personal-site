<script setup lang="ts">
    const props = defineProps(["name", "colour"])

    function getColourClass (colourString: string) {
        if (!colourString) {
            return "border-black-600 text-black-600";
        } else if (colourString === "black" || colourString === "white") {
            return `border-${colourString} text-${colourString}`
        } else {
            return `border-${colourString}-600 text-${colourString}-600`
        }
    }
</script>

<template>
    <div
        :class="getColourClass(props.colour)"
        class="no-underline inline-block text-sm px-4 py-2 leading-none border-2 rounded-full hover:border-black hover:text-black m-2 sm:mt-0"
    >
        {{ props.name || "" }}
    </div>
</template>