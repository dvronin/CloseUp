<template>
    <details v-if="model.name.length != 0" class="tree-item">
        <summary>
            <div class="name" @click="Select(model)">{{ model.name }}</div>
            <div class="actions">
                <input type="checkbox" v-model="model.visible" title="Show\Hide"
                    @change="instance.viewer?.SetVisibility(model, model.visible)">
                <button title="Isolate" @click="Isolate(model)">I</button>
                <button title="Fit in view" @click="FitInView(model)">F</button>
            </div>

        </summary>
        <TreeViewNode v-for="child in model.children" :model="child" />
    </details>
    <div class="nodes" v-if="model.name.length == 0">
        <TreeViewNode :model="child" v-for="child in model.children" />
    </div>
</template>

<script setup lang="ts">
import { ViewFitType } from 'm3dv';
import { instance } from '../../instance/instance';
import { Object3D } from 'three';

const props = defineProps<{
    model: Object3D
}>();

function Select(model: Object3D) {
    instance.viewer?.selectionManager.HideSelected();
    instance.viewer?.selectionManager.Select(model);
    instance.viewer?.selectionManager.ShowSelected();

    instance.viewer?.appearance.Render();
}

function Isolate(model: Object3D) {
    instance.viewer?.selectionManager.Select(model);
    instance.viewer?.Isolate();
    // instance.viewer?.selectionManager.Select();
}

function FitInView(model: Object3D) {
    instance.viewer?.selectionManager.Select(model);
    instance.viewer?.appearance.FitInView(ViewFitType.selected);
}

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

div{
    white-space: nowrap;
}

.name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.nodes {
    padding-left: 5px;
}

.action {
    display: flex;
    flex-direction: row;
}
</style>