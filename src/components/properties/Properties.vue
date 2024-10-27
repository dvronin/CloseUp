<template>
    <div v-if="selectedItems.length != 0" class="container">
        <HeaderedGroup>
            <template #header>
                Selected
            </template>
            <template #content>
                <details v-for="(item, index) in selectedItems" :key="index" open>
                    <summary>
                        <div class="item-name">{{ GetName(item) }}</div>
                    </summary>
                    <div>Type: {{ item.type }}</div>
                    <div v-if="item.children.length != 0">Children: {{ item.children.length }}</div>
                    <div>Volume: {{ }}</div>
                </details>
            </template>
        </HeaderedGroup>
    </div>
    <div v-else class="container">
        <HeaderedGroup>
            <template #header>Viewer properties</template>
            <template #content>
                <HeaderedGroup>
                    <template #header>Memory</template>
                    <template #content>
                        <div>Geometries: {{ geometries }}</div>
                        <div>Textures: {{ textures }}</div>
                    </template>
                </HeaderedGroup>
                <HeaderedGroup>
                    <template #header>Render</template>
                    <template #content>
                        <div>Calls: {{ calls }}</div>
                        <div>Triangles: {{ triangles }}</div>
                        <div>Lines: {{ lines }}</div>
                        <div>Points: {{ points }}</div>
                    </template>
                </HeaderedGroup>
                <div>{{ }}</div>
            </template>
        </HeaderedGroup>
    </div>
</template>

<script setup lang="ts">
import { instance } from '@/instance/instance';
import type { Object3D, WebGLRenderer } from 'three';
import { onMounted, ref } from 'vue';
import HeaderedGroup from '../shared/HeaderedGroup.vue';

const selectedItems = ref<Object3D[]>(Array.from(instance.viewer!.selectionManager.target));
const geometries = ref((instance.viewer!.renderer as WebGLRenderer).info.memory.geometries);
const textures = ref((instance.viewer!.renderer as WebGLRenderer).info.memory.textures);
const calls = ref((instance.viewer!.renderer as WebGLRenderer).info.render.calls);
const triangles = ref((instance.viewer!.renderer as WebGLRenderer).info.render.triangles);
const lines = ref((instance.viewer!.renderer as WebGLRenderer).info.render.lines);
const points = ref((instance.viewer!.renderer as WebGLRenderer).info.render.points);

onMounted(() => {
    instance.viewer?.selectionManager.addListener("change", OnSelectionChange);
    instance.viewer?.addListener("loaded", () => {
        const info = (instance.viewer!.renderer as WebGLRenderer).info;
        info.reset();
        instance.viewer?.appearance.Render();

        geometries.value = info.memory.geometries;
        textures.value = info.memory.textures;

        calls.value = info.render.calls;
        triangles.value = info.render.triangles;
        lines.value = info.render.lines;
        points.value = info.render.points;

    });
});

function OnSelectionChange(items: Set<Object3D>) {
    selectedItems.value.length = 0;
    selectedItems.value = Array.from(items);
}

function GetName(object: Object3D) {
    const name = object.name.trim();
    if (name.length == 0) {
        return object.type;
    }
    return name;
}

</script>

<style scoped>
.container {
    padding: 2px 4px;
}

.item-name {
    display: list-item;
    color: var(--color-accent);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

summary {
    display: flex;
    overflow-x: hidden;
}
</style>