<template>
    <details v-if="model.name.length != 0" class="tree-item">
        <summary>
            <div class="name">{{ model.name }}</div>
            <input type="checkbox" v-model="model.visible"
                @change="instance.viewer?.SetVisibility(model, model.visible)">
        </summary>
        <TreeViewNode v-for="child in model.children" :model="child" />
    </details>
    <div class="nodes" v-if="model.name.length == 0">
        <TreeViewNode :model="child" v-for="child in model.children" />
    </div>
</template>

<script setup lang="ts">
import { instance } from '../../instance/instance';
import { Object3D } from 'three';

const props = defineProps<{
    model: Object3D
}>();

</script>

<style scoped>
summary {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    justify-content: space-between;
    margin: 2px 15px;
}

details {
    margin-left: 10px;
    border-left: 1px var(--color-border) dashed;
}

div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.nodes {
    padding-left: 5px;
}
</style>