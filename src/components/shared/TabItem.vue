<template>
    <div class="tab" :class="(props.active == true) ? 'active' : ''">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    active?: boolean
}>();
</script>

<style scoped>
.tab {
    display: none;
}

.tab.active {
    display: block;
}
</style>