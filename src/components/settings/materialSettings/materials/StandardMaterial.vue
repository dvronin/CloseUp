<template>
    <ToonMaterial :material="material" />
    <div class="settings-item">
        <label for="roughness">Roughness</label>
        <input type="range" name="roughness" id="roughness" v-model="roughness" min="0" max="1" step="0.01"
            @input="OnRoughnessChange($event)" />
    </div>
    <div class="settings-item">
        <label for="metalness">Metalness</label>
        <input type="range" name="metalness" id="metalness" v-model="metalness" min="0" max="1" step="0.01"
            @input="OnMetalnessChange($event)" />
    </div>
</template>

<script lang="ts" setup>
import type { MeshStandardMaterial, Material as ThreeMaterial } from 'three';
import { ref } from 'vue';
import { instance } from '@/instance/instance';
import ToonMaterial from './ToonMaterial.vue';

const props = defineProps<{
    material: ThreeMaterial
}>();
const material = ref<MeshStandardMaterial>(props.material as any);
const roughness = ref(material.value.roughness);
const metalness = ref(material.value.metalness);

function OnRoughnessChange(event: Event) {
    const value = (event.target as any).value;
    material.value.roughness = value;
    instance.viewer?.appearance.Render();
}

function OnMetalnessChange(event: Event) {
    const value = (event.target as any).value;
    material.value.metalness = value;
    instance.viewer?.appearance.Render();
}

</script>

<style scoped></style>