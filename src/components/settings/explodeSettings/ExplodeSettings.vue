<template>
    <div class="settings">
        <HeaderedGroup>
            <template #header>
                Plane settings
            </template>
            <template #content>
                <div class="settings-item">
                    <label for="explode-value">Value</label>
                    <input type="range" name="explode-value" id="explode-value" v-model="value" @input="Explode(value)"
                        min="0" step="0.01" max="1">
                </div>
            </template>
        </HeaderedGroup>
    </div>
</template>

<script setup lang="ts">
import BtnInputCheckbox from '@/components/shared/BtnInputCheckbox.vue';
import BtnInputFile from '@/components/shared/BtnInputFile.vue';
import HeaderedGroup from '@/components/shared/HeaderedGroup.vue';
import { instance } from '@/instance/instance';
import type { Plane, PlaneManager } from 'm3dv';
import { SectionFillType } from 'm3dv/dist/Managers/Planes/PlaneManager';
import { Object3D, Vector3 } from 'three';
import { computed, onMounted, ref, type Ref } from 'vue';

const planeManager: Ref<PlaneManager | null> = ref(null);
const power = ref(3);
const value = ref(0);

onMounted(() => {

})

function Explode(value: number) {
    instance.viewer?.explodeView.Explode(value, power.value);
    instance.viewer?.appearance.Render();
}

</script>

<style scoped>
.list {
    display: flex;
    flex-direction: row;
}

.list-items {
    flex: 1 1 auto;
    overflow: auto;
    background-color: var(--color-main);
}

option {
    background-color: var(--color-main);
    color: var(--color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.controls {
    display: flex;
    flex-direction: column;
}

.selected-plane {
    display: flex;
    flex-direction: row;
}

.plane-name {}
</style>