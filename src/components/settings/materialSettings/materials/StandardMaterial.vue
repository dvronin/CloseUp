<template>
    <Material :material="material" />
    <div class="settings-item">
        <label for="color">Color</label>
        <ColorPicker name="color" id="color" v-model="color" @input="OnColorChange($event)" />
    </div>
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
import Material from './Material.vue';
import { ref } from 'vue';
import ColorPicker from '@/components/shared/ColorPicker.vue';
import { instance } from '@/instance/instance';

const props = defineProps<{
    material: ThreeMaterial
}>();
const material = ref<MeshStandardMaterial>(props.material as any);
const color = ref<string>(`#${material.value.color.getHexString()}`);
const roughness = ref(material.value.roughness);
const metalness = ref(material.value.metalness);

function OnColorChange(event: Event) {
    const value = (event.target as any).value;
    material.value.color.set(value);
    instance.viewer?.appearance.Render();
}

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