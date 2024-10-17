<template>
    <div class="expander" :style="setDirection()">
        <label>
            <input type="checkbox" v-model="open" name="expand-button" class="expand-button">
            <button @click="open = !open">></button>
        </label>
        <div class="content" v-if="open">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);

const props = defineProps<{
    direction?: "up" | "down" | "left" | "right",
}>();

function setDirection(): string {
    switch (props.direction) {
        case "down":
        case undefined:
            return "flex-direction: column";
        case "up":
            return "flex-direction: column-reverse";
        case "left":
            return "flex-direction: row-reverse";
        case "right":
            return "flex-direction: row";
        default:
            return "flex-direction: column";
    }
}

</script>

<style scoped>
.expander {
    display: flex;
    height: 100%;
}

.expand-button {
    display: none;
}

.content {
    flex: auto;
    width: 0%;
}
</style>