<template>
    <button>
        <label>
            <slot></slot>
            <input type="file" @change="props.fileInput($event)" :accept="props.accept">
        </label>
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    fileInput: Function
    accept?: string
}>();

</script>

<style scoped>
input[type="file"] {
    display: none;
}
</style>