<template>
    <StandardMaterial :material="material" />
    <div class="settings-item">
        <label for="ior">IOR</label>
        <input type="range" name="ior" id="ior" v-model="ior" min="1" max="2.33" step="0.01"
            @input="OnIorChange($event)" />
    </div>
    <div class="settings-item">
        <label for="reflectivity">Reflectivity</label>
        <input type="range" name="reflectivity" id="reflectivity" v-model="reflectivity" min="0" max="1" step="0.01"
            @input="OnReflectivityChange($event)" />
    </div>
    <div class="settings-item">
        <label for="iridescence">Iridescence</label>
        <input type="range" name="iridescence" id="iridescence" v-model="iridescence" min="0" max="1" step="0.01"
            @input="OnIridescenceChange($event)" />
    </div>
    <div class="settings-item">
        <label for="iridescence-ior">Iridescence IOR</label>
        <input type="range" name="iridescence-ior" id="iridescence-ior" v-model="iridescenceIOR" min="1" max="2.33"
            step="0.01" @input="OnIridescenceIORChange($event)" />
    </div>
    <div class="settings-item">
        <label for="sheen">Sheen</label>
        <input type="range" name="sheen" id="sheen" v-model="sheen" min="0" max="1" step="0.01"
            @input="OnSheenChange($event)" />
    </div>
    <div class="settings-item">
        <label for="sheen-roughness">Sheen roughness</label>
        <input type="range" name="sheen-roughness" id="sheen-roughness" v-model="sheenRoughness" min="0" max="1"
            step="0.01" @input="OnSheenRoughnessChange($event)" />
    </div>
    <div class="settings-item">
        <label for="sheen-color">Sheen color</label>
        <ColorPicker name="sheen-color" id="sheen-color" v-model="sheenColor" @input="OnSheenColorChange($event)" />
    </div>
    <div class="settings-item">
        <label for="specular-intensity">Specular intensity</label>
        <input type="range" name="specular-intensity" id="specular-intensity" v-model="specularIntensity" min="0"
            max="1" step="0.01" @input="OnSpecularIntensityChange($event)" />
    </div>
    <div class="settings-item">
        <label for="specular-color">Specular color</label>
        <ColorPicker name="specular-color" id="specular-color" v-model="specularColor"
            @input="OnSpecularColorChange($event)" />
    </div>
    <div class="settings-item">
        <label for="transmission">Transmission</label>
        <input type="range" name="transmission" id="transmission" v-model="transmission" min="0" max="1" step="0.01"
            @input="OnTransmissionChange($event)" />
    </div>
</template>

<script lang="ts" setup>
import type { Material, MeshPhysicalMaterial } from 'three';
import { ref } from 'vue';
import StandardMaterial from './StandardMaterial.vue';
import { instance } from '@/instance/instance';
import ColorPicker from '@/components/shared/ColorPicker.vue';


const props = defineProps<{
    material: Material
}>();
const material = ref<MeshPhysicalMaterial>(props.material as any);
const ior = ref(material.value.ior);
const reflectivity = ref(material.value.reflectivity);
const iridescence = ref(material.value.iridescence);
const iridescenceIOR = ref(material.value.iridescenceIOR);
const sheen = ref(material.value.sheen);
const sheenRoughness = ref(material.value.sheenRoughness);
const sheenColor = ref<string>(`#${material.value.sheenColor.getHexString()}`);
const clearcoat = ref(material.value.clearcoat);
const clearcoatRoughness = ref(material.value.clearcoatRoughness);
const specularIntensity = ref(material.value.specularIntensity);
const specularColor = ref<string>(`#${material.value.specularColor.getHexString()}`);
const transmission = ref(material.value.transmission);

function OnIorChange(event: Event) {
    const value = (event.target as any).value;
    material.value.ior = value;
    instance.viewer?.appearance.Render();
}
function OnReflectivityChange(event: Event) {
    const value = (event.target as any).value;
    material.value.reflectivity = value;
    instance.viewer?.appearance.Render();
}
function OnIridescenceChange(event: Event) {
    const value = (event.target as any).value;
    material.value.iridescence = value;
    instance.viewer?.appearance.Render();
}
function OnIridescenceIORChange(event: Event) {
    const value = (event.target as any).value;
    material.value.iridescenceIOR = value;
    instance.viewer?.appearance.Render();
}
function OnSheenChange(event: Event) {
    const value = (event.target as any).value;
    material.value.sheen = value;
    instance.viewer?.appearance.Render();
}
function OnSheenRoughnessChange(event: Event) {
    const value = (event.target as any).value;
    material.value.sheenRoughness = value;
    instance.viewer?.appearance.Render();
}
function OnSheenColorChange(event: Event) {
    const value = (event.target as any).value;
    material.value.sheenColor.set(value);
    instance.viewer?.appearance.Render();
}
function OnClearcoatChange(event: Event) {
    const value = (event.target as any).value;
    material.value.clearcoat = value;
    instance.viewer?.appearance.Render();
}
function OnClearcoatRoughnessChange(event: Event) {
    const value = (event.target as any).value;
    material.value.clearcoatRoughness = value;
    instance.viewer?.appearance.Render();
}
function OnSpecularIntensityChange(event: Event) {
    const value = (event.target as any).value;
    material.value.specularIntensity = value;
    instance.viewer?.appearance.Render();
}
function OnSpecularColorChange(event: Event) {
    const value = (event.target as any).value;
    material.value.specularColor.set(value);
    instance.viewer?.appearance.Render();
}
function OnTransmissionChange(event: Event) {
    const value = (event.target as any).value;
    material.value.transmission = value;
    instance.viewer?.appearance.Render();
}
</script>

<style scoped></style>