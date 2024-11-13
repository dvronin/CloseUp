<template>
    <label class="button" :class="model == true ? 'checked' : ''" :title="props.title" :id="props.id">
        <input type="checkbox" v-model="model" :id="props.id" @change="emits('change', $event)">
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{
    title?: string,
    id?: string
}>();
const model = defineModel();

const emits = defineEmits<{
    "change": [value: Event]
}>();

</script>

<style scoped>
label {
    appearance: none;
    border-radius: 1rem;
    padding: 0;
    background: var(--color-main);
    border: 1px solid var(--color-border);
    accent-color: var(--color-accent);
    width: 3rem;
    position: relative;
}

input[type='checkbox'] {
    display: none;
}

label::before,
label::after {
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    border: 1px solid var(--color-border);
    margin: 2px;
}

label::before {
    opacity: 0;
}

label::after {
    position: absolute;
    left: 0;
}

.checked::after {
    left: auto;
    right: 0;
    background-color: var(--color-accent);
    border-color: var(--color-accent);
}
</style>