<template>
    <div class="container">
        <TreeViewNode v-if="model" :model="model" />
    </div>
</template>

<script setup lang="ts">
import type { Object3D } from "three";
import TreeViewNode from "./TreeViewNode.vue"

const props = defineProps<{
    model: Object3D
}>();

</script>

<style scoped>
.container {
    overflow-y: auto;
    overflow-x: hidden;
}
</style>