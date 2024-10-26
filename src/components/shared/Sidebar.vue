<template>
    <div class="expander" :style="setDirection()">
        <div>
            <input type="checkbox" v-model="open" name="expand-button" class="expand-button">
            <button @click="open = !open" :class="open == true ? `open` : ``">
                <img class="icon" src="../../assets/arrow.svg" alt="Expander arrow" :class="props.direction">
            </button>
        </div>
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
    border: 1px solid var(--color-border);
}

.expand-button {
    display: none;
}

.content {
    flex: auto;
    width: 0%;
}

.open {
    transform: rotate(180deg);
}

.down {
    transform: rotate(270deg);
}

.up {
    transform: rotate(90deg);
}

.right {
    transform: rotate(180deg);
}

.left {
    transform: rotate(0deg);
}
</style>