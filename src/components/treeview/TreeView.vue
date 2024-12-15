<template>
    <div class="container">
        <TreeViewNode v-for="item in items" :model="item" :key="item.uuid" />
    </div>
</template>

<script setup lang="ts">
import { Object3D } from "three";
import TreeViewNode from "./TreeViewNode.vue"
import { ref, watchEffect } from "vue";

const props = defineProps<{
    items: Object3D[]
}>();
const items = ref<Object3D[]>(props.items);
watchEffect(() => {
    console.log("change");

})

</script>

<style scoped>
.container {
    overflow-y: auto;
    overflow-x: hidden;
}
</style>