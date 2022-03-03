<script setup lang="ts">
    const props = defineProps(["name", "colour"])

    function getColourClass (colourString: string) {
        if (!colourString) {
            return "border-black text-black";
        }
        
        switch (colourString) {
            case "black":
                return "border-black text-black";
            case "white":
                return "border-white text-white";
            case "red":
                return "border-red-600 text-red-600";
            case "orange":
                return "border-orange-600 text-orange-600";
            case "yellow":
                return "border-yellow-600 text-yellow-600";
            case "pink":
                return "border-pink-600 text-pink-600";
            case "purple":
                return "border-purple-600 text-purple-600";
            case "blue":
                return "border-blue-600 text-blue-600";
            case "teal":
                return "border-teal-600 text-teal-600";
            case "green":
                return "border-green-600 text-green-600";
            default:
                return "border-black text-black";
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