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
                    <div v-if="IsMesh(item)" class="material">
                        <div>Material:</div>
                        <ColorPicker :hide-hex="true" :readonly="true" :model-value="GetMaterialColor(item)" />
                        <div>{{ GetMaterialName(item) }}</div>
                    </div>
                    <div>Area: {{ areas.get(item)?.toFixed(6) }}</div>
                    <div>Volume: {{ volumes.get(item)?.toFixed(6) }} </div>
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
import type { Color, Material, Mesh, Object3D, WebGLRenderer } from 'three';
import { onMounted, ref } from 'vue';
import HeaderedGroup from '../shared/HeaderedGroup.vue';
import ColorPicker from '../shared/ColorPicker.vue';

const selectedItems = ref<Object3D[]>(Array.from(instance.viewer!.selectionManager.target));
const geometries = ref((instance.viewer!.renderer as WebGLRenderer).info.memory.geometries);
const textures = ref((instance.viewer!.renderer as WebGLRenderer).info.memory.textures);
const calls = ref((instance.viewer!.renderer as WebGLRenderer).info.render.calls);
const triangles = ref((instance.viewer!.renderer as WebGLRenderer).info.render.triangles);
const lines = ref((instance.viewer!.renderer as WebGLRenderer).info.render.lines);
const points = ref((instance.viewer!.renderer as WebGLRenderer).info.render.points);

const areas = ref<Map<Object3D, number>>(new Map());
const volumes = ref<Map<Object3D, number>>(new Map());

selectedItems.value.forEach(item => OnCompute(item));

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
    const keys = Array.from(areas.value.keys());
    const array = selectedItems.value.filter(item => !keys.includes(item));
    array.forEach(item => OnCompute(item));
}

function GetName(object: Object3D) {
    const name = object.name.trim();
    if (name.length == 0) {
        return object.type;
    }
    return name;
}

function IsMesh(object: Object3D): boolean {
    return object.type == "Mesh" ? true : false;
}

function GetMaterial(object: Object3D): Material | null {
    const selected = instance.viewer!.selectionManager.target;
    const index = selected.findIndex(item => item.uuid == object.uuid);
    if (index != -1) {
        const mesh = selected[index] as Mesh;
        if (mesh.isMesh != undefined && mesh.isMesh == true) {
            return instance.viewer!.sceneManager.modelManager.materialManager.GetMaterial(mesh);
        }
    }
    return null;
}
function GetMaterialName(object: Object3D): string {
    const mat = GetMaterial(object);
    if (mat != null) {
        return mat.name.trim().length != 0 ? mat.name.trim() : `${mat.type}`
    }
    return "not found";
}
function GetMaterialColor(object: Object3D) {
    const mat = GetMaterial(object);
    if (mat != null) {
        const color = (mat as any).color as Color;
        if (color != undefined && color.isColor == true) {
            return `#${color.getHexString()}`;
        }
    }
    return "#000";
}

function OnCompute(object: Object3D) {
    let _area = 0;
    let _volume = 0;

    if (window.Worker) {

        const worker = new Worker(new URL("../../workers/computeWorker", import.meta.url), { type: "module" });
        worker.onerror = (e) => {
            console.log(e);
            worker.terminate();
        }
        worker.onmessageerror = (e) => {
            console.log(e);
            worker.terminate();
        }
        worker.onmessage = (e) => {
            worker.terminate();
            areas.value.set(object, e.data.area);
            volumes.value.set(object, e.data.volume);
        }
        const json = object.toJSON();
        const obj = JSON.stringify(json);
        worker.postMessage(obj);

        areas.value.set(object, _area);
        volumes.value.set(object, _volume);
    }
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

.material {
    display: flex;
}
</style>