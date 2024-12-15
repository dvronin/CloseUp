<template>
    <ToonMaterial :material="material" />
    <div class="settings-item">
        <label for="specular">Specular</label>
        <ColorPicker name="specular" id="specular" v-model="specular" @input="OnSpecularColorChange($event)" />
    </div>
    <div class="settings-item">
        <label for="shininess">Shininess</label>
        <input type="range" name="shininess" id="shininess" v-model="shininess" min="0" max="1024" step="1"
            @input="OnShininessIntensityChange($event)" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ColorPicker from '@/components/shared/ColorPicker.vue';
import { Material, MeshPhongMaterial } from 'three';
import { instance } from '@/instance/instance';
import ToonMaterial from './ToonMaterial.vue';


const props = defineProps<{
    material: Material
}>();
const material = ref<MeshPhongMaterial>(props.material as any);
const specular = ref<string>(`#${material.value.specular.getHexString()}`);
const shininess = ref(material.value.shininess);

function OnSpecularColorChange(event: Event) {
    const value = (event.target as any).value;
    material.value.specular.set(value);
    instance.viewer?.appearance.Render();
}
function OnShininessIntensityChange(event: Event) {
    const value = (event.target as any).value;
    material.value.shininess = value;
    instance.viewer?.appearance.Render();
}

</script>

<style scoped></style>