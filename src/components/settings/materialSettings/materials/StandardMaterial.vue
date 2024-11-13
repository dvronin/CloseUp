<template>
    <Material :material="material" />
    <div class="settings-item">
        <label for="color">Color</label>
        <ColorPicker type="color" name="color" id="color" v-model="color" @input="OnColorChange($event)" />
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

function OnColorChange(event: Event) {
    const value = (event.target as any).value;
    material.value.color.set(value);
    instance.viewer?.appearance.Render();
}

</script>

<style scoped></style>