<script setup lang="ts">
    const props = defineProps(["name", "colour"])

    function getColourClass (colourString: string) {
        if (!colourString) {
            return "border-black text-black";
        }
        
        // I fucking hate this but Tailwind seems to hate class names 
        switch (colourString) {
            case "black":
                return "border-black text-black";
            case "white":
                return "border-white text-white";
            case "red":
                return "border-red-700 text-red-700";
            case "orange":
                return "border-orange-700 text-orange-700";
            case "yellow":
                return "border-yellow-700 text-yellow-700";
            case "pink":
                return "border-pink-700 text-pink-700";
            case "purple":
                return "border-purple-700 text-purple-700";
            case "blue":
                return "border-blue-700 text-blue-700";
            case "teal":
                return "border-teal-700 text-teal-700";
            case "green":
                return "border-green-700 text-green-700";
            default:
                return "border-black text-black";
        }
    }
</script>

<template>
    <div
        :class="getColourClass(props.colour)"
        class="no-underline inline-block font-extrabold text-sm px-4 py-2 leading-none border-3 rounded-full hover:border-pink-600 hover:text-pink-600 m-2 sm:mt-0"
    >
        {{ props.name || "" }}
    </div>
</template>