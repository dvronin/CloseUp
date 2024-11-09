<template>
    <div class="settings">
        <HeaderedGroup>
            <template #header>
                Explode settings
            </template>
            <template #content>
                <div class="settings-item">
                    <label for="explode-value">Value</label>
                    <input type="range" name="explode-value" id="explode-value" v-model="value" @input="Explode(value)"
                        min="0" step="0.01" max="1">
                </div>
                <div class="settings-item">
                    <label for="explode-type">Explode type</label>
                    <SelectControl :multiple="false" :items="types" @change="OnExplodeTypeChange($event)" />
                </div>
                <div class="settings-item">
                    <label for="explode-power">Power</label>
                    <input type="range" name="explode-power" id="explode-power" v-model="power" @input="Explode(value)"
                        min="0" step="0.01" max="1">
                </div>
            </template>
        </HeaderedGroup>
    </div>
</template>

<script setup lang="ts">
import HeaderedGroup from '@/components/shared/HeaderedGroup.vue';
import SelectControl, { type Option } from '@/components/shared/SelectControl.vue';
import { instance } from '@/instance/instance';
import { ExplodeType } from 'm3dv';
import { computed, onMounted, ref, type Ref } from 'vue';

const power = ref(3);
const value = ref(0);
const types = ref<Option[]>([
    { name: "Simple", value: ExplodeType.simple, selected: true },
    { name: "Phased", value: ExplodeType.phased, selected: false }
]);
const explodeType = ref(ExplodeType.simple);

onMounted(() => {
    explodeType.value = instance.viewer!.explodeView.type;
})

function Explode(value: number) {
    instance.viewer?.explodeView.Explode(value, power.value);
    instance.viewer?.appearance.Render();
}

function OnExplodeTypeChange(option: Option[]) {
    instance.viewer?.explodeView.InitExplode(instance.viewer.sceneManager.modelManager.model, option[0].value);
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