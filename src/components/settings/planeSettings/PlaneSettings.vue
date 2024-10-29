<template>
    <div class="settings">
        <HeaderedGroup>
            <template #header>
                Plane settings
            </template>
            <template #content>
                <div class="settings-item">
                    <label for="clip-intersection">Clip intersection</label>
                    <BtnInputCheckbox v-model="intersection" open-icon-path="/visible.svg"
                        closed-icon-path="/hidden.svg" id="clip-intersection" />
                </div>
                <HeaderedGroup>
                    <template #header>
                        Plane list
                    </template>
                    <template #content>
                        <div class="list">
                            <select class="list-items" v-model="selected" size="4">
                                <option :value="null" :key="-1"></option>
                                <option v-for="(item, index) in items" :value="item" :key="index">{{ item.name }}
                                </option>
                            </select>
                            <div class="controls">
                                <button><img class="icon" src="/plus.svg" alt="Add plane"></button>
                                <button :disabled="selected == null"><img class="icon" src="/minus.svg"
                                        alt="Remove plane"></button>
                            </div>
                        </div>
                    </template>
                </HeaderedGroup>
                <HeaderedGroup v-if="selected != null">
                    <template #header>
                        Plane: {{ selected.name }}
                    </template>
                    <template #content>
                        <div class="settings-item">
                            <label for="visibility">Visibility</label>
                            <BtnInputCheckbox v-model="visibility" open-icon-path="/visible.svg"
                                closed-icon-path="/hidden.svg" id="visibility" />
                        </div>
                        <div class="settings-item">
                            <button @click="OnInvert(selected)">Invert</button>
                        </div>
                        <div class="settings-item">
                            <label for="constant">Offset</label>
                            <input type="range" id="constant" v-model="offset"
                                :max="selected.max + Math.abs(selected.max / 1e2)"
                                :min="selected.min - Math.abs(selected.min / 1e2)" :step="step" />
                        </div>
                    </template>
                </HeaderedGroup>
            </template>
        </HeaderedGroup>
    </div>
</template>

<script setup lang="ts">
import BtnInputCheckbox from '@/components/shared/BtnInputCheckbox.vue';
import HeaderedGroup from '@/components/shared/HeaderedGroup.vue';
import { instance } from '@/instance/instance';
import type { Plane } from 'm3dv';
import { computed, onMounted, ref, type Ref } from 'vue';

const items = ref<readonly Plane[]>([]);
const selected: Ref<Plane | null> = ref(null);

onMounted(() => {
    instance.viewer!.addListener("loaded", () => {
        items.value = instance.viewer!.sceneManager.planeManager.planes;
    });
    items.value = instance.viewer!.sceneManager.planeManager.planes;
})

const visibility = computed({
    get: () => selected.value?.visible,
    set: (value: boolean) => {
        selected.value?.SetVisibility(value);
        instance.viewer?.appearance.Render();
    }
});
const clipIntersection = ref(instance.viewer!.sceneManager.planeManager.clipIntersection);
const intersection = computed({
    get: (): boolean => { return clipIntersection.value; },
    set: (value: boolean) => {
        instance.viewer?.sceneManager.planeManager.ClipIntersection(value);
        clipIntersection.value = instance.viewer!.sceneManager.planeManager.clipIntersection;
        instance.viewer?.appearance.Render();
    }
});

const step = computed(() => Math.abs(selected.value!.max - selected.value!.min) / 1000);

const offset = computed({
    get: () => selected.value?.plane.constant,
    set: (value: number) => {
        selected.value?.SetOffset(value);
        instance.viewer?.appearance.Render();
    }
})

function OnInvert(plane: Plane) {
    plane.Invert();
    instance.viewer?.appearance.Render();
}

</script>

<style scoped>
.list {
    display: flex;
    flex-direction: row;
}

.list-items {
    flex: 1 0 auto;
    overflow: auto;
    background-color: var(--color-main);
}

option {
    background-color: var(--color-main);
    color: var(--color-text);
}

.controls {
    display: flex;
    flex-direction: column;
}
</style>