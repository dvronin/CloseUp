<template>
    <button>
        <label>
            <slot></slot>
            <input type="file" @change="props.fileInput($event)">
        </label>
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    fileInput: Function
}>();

</script>

<style scoped>
input[type="file"] {
    display: none;
}
</style>