<template>
    <label class="button">
        <slot></slot>
        <input type="file" @change="props.fileInput($event)" :accept="props.accept">
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{
    fileInput: Function
    accept?: string
}>();

</script>

<style scoped>
label {
    display: inline-flex;
}

input[type="file"] {
    display: none;
}
</style>