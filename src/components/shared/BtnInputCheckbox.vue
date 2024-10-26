<template>
    <label class="button" :title="title">
        <img v-if="model" class="icon" :src="props.openIconPath" alt="Hide">
        <img v-else class="icon" :src="props.closedIconPath" alt="Show">
        <input type="checkbox" v-model="model">
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{
    title?: string,
    openIconPath: string,
    closedIconPath: string,
}>();
const model = defineModel();

</script>

<style scoped>
label {
    display: inline-flex;
}

input[type="checkbox"] {
    display: none;
}
</style>