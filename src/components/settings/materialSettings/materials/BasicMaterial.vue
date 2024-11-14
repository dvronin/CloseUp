<template>
    <Material :material="material" />
    <div class="settings-item">
        <label for="color">Color</label>
        <ColorPicker name="color" id="color" v-model="color" @input="OnColorChange($event)" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Material from './Material.vue';
import ColorPicker from '@/components/shared/ColorPicker.vue';
import { MeshBasicMaterial, Material as ThreeMaterial } from 'three';
import { instance } from '@/instance/instance';


const props = defineProps<{
    material: ThreeMaterial
}>();
const material = ref<MeshBasicMaterial>(props.material as any);
const color = ref<string>(`#${material.value.color.getHexString()}`);

function OnColorChange(event: Event) {
    const value = (event.target as any).value;
    material.value.color.set(value);
    instance.viewer?.appearance.Render();
}

</script>

<style scoped></style>