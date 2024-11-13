<template>
    <div class="settings-item">
        <label for="opacity">Opacity</label>
        <input type="range" name="opacity" id="opacity" v-model="opacity" min="0" max="1" step="0.01"
            @input="OnOpacityChange($event)">
    </div>
    <div class="settings-item">
        <label for="alpha-hash">Alpha hash</label>
        <BtnToggle id="alpha-hash" v-model="alphaHash" @change="OnALphaHashChange($event)" />
    </div>
</template>

<script lang="ts" setup>
import BtnToggle from '@/components/shared/BtnToggle.vue';
import { instance } from '@/instance/instance';
import type { Material } from 'three';
import { ref } from 'vue';


const props = defineProps<{
    material: Material
}>();

const opacity = ref(props.material.opacity);
const alphaHash = ref(props.material.alphaHash);

function OnOpacityChange(event: Event) {
    const value = (event.target as any).value as number;
    if (value != 1) {
        props.material.transparent = true;
    }
    else props.material.transparent = false;
    if (props.material.version == 0)
        props.material.needsUpdate = true;
    props.material.opacity = value;
    instance.viewer?.appearance.Render();
}

function OnALphaHashChange(event: Event) {
    const value = (event.target as any).checked;
    props.material.alphaHash = value;
    instance.viewer?.appearance.Render();
}

</script>

<style scoped></style>