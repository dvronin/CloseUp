<template>
    <div class="tree-item" :class="model.children.length != 0 ? `has-children` : ``">
        <details v-if="model.children.length != 0">
            <summary class="item">
                <div class="name" :title="name">{{ name }}</div>
                <div class="actions">
                    <BtnInputCheckbox v-model="visibility" title="Show/Hide" :open-icon-path="visibleSvg"
                        :closed-icon-path="hiddenSvg" />
                    <button title="Select" @click="Select(model)">
                        <img class="icon" src="/lens.svg" alt="Select">
                    </button>
                    <button title="Isolate" @click="Isolate(model)">
                        <img class="icon" src="/filter.svg" alt="Isolate">
                    </button>
                    <button title="Fit in view" @click="FitInView(model)">
                        <img class="icon" src="/fit.svg" alt="Fit in view">
                    </button>
                </div>
            </summary>
            <TreeViewNode v-for="child in model.children" :model="child" :key="child.uuid" />
        </details>
        <div v-else>
            <div class="item">
                <div class="name" :title="name">{{ name }}</div>
                <div class="actions">
                    <BtnInputCheckbox v-model="visibility" title="Show/Hide" :open-icon-path="visibleSvg"
                        :closed-icon-path="hiddenSvg" />
                    <button title="Show" @click="Select(props.model)">
                        <img class="icon" src="/lens.svg" alt="Select">
                    </button>
                    <button title="Isolate" @click="Isolate(props.model)">
                        <img class="icon" src="/filter.svg" alt="Isolate">
                    </button>
                    <button title="Fit in view" @click="FitInView(props.model)">
                        <img class="icon" src="/fit.svg" alt="Fit in view">
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ViewFitType } from 'm3dv';
import { instance } from '../../instance/instance';
import { Object3D } from 'three';
import BtnInputCheckbox from '../shared/BtnInputCheckbox.vue';
import { computed } from 'vue';
import visibleSvg from '/visible.svg'
import hiddenSvg from '/hidden.svg'

const props = defineProps<{
    model: Object3D
}>();
const visibility = computed({
    get: () => props.model.visible,
    set: (value) => instance.viewer?.SetVisibility(props.model, value),
})

const name = computed(() => {
    let name = props.model.name.trim();
    if (name.length == 0) {
        if (props.model.children.length != 0) {
            return "Object";
        }
        else {
            return "Mesh";
        }
    }
    return name;
})

function Select(model: Object3D) {
    instance.viewer?.selectionManager.Select(instance.viewer.sceneManager.modelManager.model);
    instance.viewer?.selectionManager.HideSelected();
    const obj = instance.viewer?.sceneManager.modelManager.model.getObjectByProperty("uuid", model.uuid);
    if (obj != undefined) {
        instance.viewer?.selectionManager.Select(obj);
        instance.viewer?.selectionManager.ShowSelected();
    }

    instance.viewer?.appearance.Render();
}

function Isolate(model: Object3D) {
    const obj = instance.viewer?.sceneManager.modelManager.model.getObjectByProperty("uuid", model.uuid);
    if (obj != undefined) {
        instance.viewer?.selectionManager.Select(instance.viewer.sceneManager.modelManager.model);
        instance.viewer?.selectionManager.HideSelected();
        instance.viewer?.selectionManager.Select(obj);
        instance.viewer?.Isolate();
        instance.viewer?.selectionManager.Select();
    }
}

function FitInView(model: Object3D) {
    const obj = instance.viewer?.sceneManager.modelManager.model.getObjectByProperty("uuid", model.uuid);
    if (obj != undefined) {
        instance.viewer?.selectionManager.Select(instance.viewer.sceneManager.modelManager.model);
        instance.viewer?.selectionManager.HideSelected();
        instance.viewer?.selectionManager.Select(obj);
        instance.viewer?.appearance.FitInView(ViewFitType.selected);
        instance.viewer?.selectionManager.Select();
    }
}

</script>

<style scoped>
.tree-item {
    margin-left: 10px;
    border-left: 1px var(--color-border) dashed;
}

.has-children {
    border-color: var(--color-accent)
}

.item {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    justify-content: space-between;
    margin: 1px 15px;
    align-items: center;
}

div {
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

.actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.actions>button,
.actions>.button {
    background: transparent;
}
</style>