<template>
    <label class="button" :title="title">
        <img v-if="visible" class="icon" :src="props.openIconPath" alt="Hide">
        <img v-else class="icon" :src="props.closedIconPath" alt="Show">
        <input type="checkbox" v-model="model" @change="OnValueChange($event)" :id="id">
    </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    title?: string,
    openIconPath: string,
    closedIconPath: string,
    id?: string
}>();
const model = defineModel();
const visible = ref(model.value);

function OnValueChange(event: Event) {
    const value = (event.target as any).checked;
    visible.value = value;
}

</script>

<style scoped>
label {
    display: inline-flex;
}

input[type="checkbox"] {
    display: none;
}
</style>