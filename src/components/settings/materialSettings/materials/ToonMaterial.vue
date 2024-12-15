<template>
    <BasicMaterial :material="material" />
    <div class="settings-item">
        <label for="emissive">Emissive</label>
        <ColorPicker name="emissive" id="emissive" v-model="emissive" @input="OnEmissiveColorChange($event)" />
    </div>
    <div class="settings-item">
        <label for="emissive-intensity">Emissive intensity</label>
        <input type="range" name="emissive-intensity" id="emissive-intensity" v-model="emissiveIntensity" min="0"
            max="2" step="0.01" @input="OnEmissiveIntensityChange($event)" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ColorPicker from '@/components/shared/ColorPicker.vue';
import { MeshToonMaterial, Material } from 'three';
import { instance } from '@/instance/instance';
import BasicMaterial from './BasicMaterial.vue';


const props = defineProps<{
    material: Material
}>();
const material = ref<MeshToonMaterial>(props.material as any);
const emissive = ref<string>(`#${material.value.emissive.getHexString()}`);
const emissiveIntensity = ref(material.value.emissiveIntensity);

function OnEmissiveColorChange(event: Event) {
    const value = (event.target as any).value;
    material.value.emissive.set(value);
    instance.viewer?.appearance.Render();
}
function OnEmissiveIntensityChange(event: Event) {
    const value = (event.target as any).value;
    material.value.emissiveIntensity = value;
    instance.viewer?.appearance.Render();
}

</script>

<style scoped></style>