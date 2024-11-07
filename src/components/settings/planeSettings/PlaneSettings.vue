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
                        Background type
                    </template>
                    <template #content>
                        <div class="settings-item">
                            <label for="fill-color">Fill color</label>
                            <input type="color" name="fill-color" id="fill-color" v-model="fillColor" class="no-filter"
                                @input="ChangeSectionFillColor($event)">
                        </div>
                        <div class="settings-item">
                            <div>Texture</div>
                            <div>
                                <BtnInputFile :file-input="LoadSectionFillImage" accept=".jpg,.jpeg,.png">
                                    <img class="icon" src="/folder.svg" alt="Load image texture">
                                </BtnInputFile>
                                <button @click="SetSectionFillColor()"
                                    :disabled="planeManager?.type == SectionFillType.image || planeManager?.texture == null"
                                    title="enable fill image">
                                    <img class="icon" src="/visible.svg" alt="Show image">
                                </button>
                                <button :disabled="planeManager?.texture == null" title="remove texture">
                                    <img class="icon" src="/minus.svg" alt="Remove texture">
                                </button>
                            </div>
                        </div>
                    </template>
                </HeaderedGroup>
                <HeaderedGroup>
                    <template #header>
                        Exclude list
                    </template>
                    <template #content>
                        <div class="list">
                            <select class="list-items" multiple v-model="selectedExcluded" size="4">
                                <option v-for="(item, index) in excluded" :value="item" :key="index">{{ item.name }}
                                </option>
                            </select>
                            <div class="controls">
                                <button :disabled="selected.length == 0" @click="Exclude()"><img class="icon"
                                        src="/plus.svg" alt="Add plane"></button>
                                <button :disabled="selectedExcluded.length == 0" @click="Include()"><img class="icon"
                                        src="/minus.svg" alt="Remove plane"></button>
                            </div>
                        </div>
                    </template>
                </HeaderedGroup>
                <HeaderedGroup>
                    <template #header>
                        Plane list
                    </template>
                    <template #content>
                        <div class="list">
                            <select class="list-items" v-model="selectedPlane" size="4">
                                <option :value="null" :key="-1"></option>
                                <option v-for="(item, index) in items" :value="item" :key="index">{{ item.name }}
                                </option>
                            </select>
                            <div class="controls">
                                <button @click="AddPlane()"><img class="icon" src="/plus.svg" alt="Add plane"></button>
                                <button :disabled="selectedPlane == null" @click="DeletePlane()"><img class="icon"
                                        src="/minus.svg" alt="Remove plane"></button>
                            </div>
                        </div>
                    </template>
                </HeaderedGroup>
                <HeaderedGroup v-if="selectedPlane != null">
                    <template #header>
                        <div class="selected-plane">
                            <div>Plane:</div>
                            <div class="plane-name">{{ selectedPlane.name }}</div>
                        </div>
                    </template>
                    <template #content>
                        <div class="settings-item">
                            <label for="visibility">Visibility</label>
                            <BtnInputCheckbox v-model="visibility" open-icon-path="/visible.svg"
                                closed-icon-path="/hidden.svg" id="visibility" />
                        </div>
                        <div class="settings-item">
                            <button @click="OnInvert(selectedPlane)">Invert</button>
                        </div>
                        <div class="settings-item">
                            <label for="constant">Offset</label>
                            <input type="range" id="constant" v-model="offset"
                                :max="selectedPlane.max + Math.abs(selectedPlane.max / 1e2)"
                                :min="selectedPlane.min - Math.abs(selectedPlane.min / 1e2)" :step="step" />
                        </div>
                    </template>
                </HeaderedGroup>
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

const items = ref<Plane[]>([]);
const selectedPlane: Ref<Plane | null> = ref(null);
const selectedExcluded: Ref<Object3D[]> = ref([]);
const excluded = ref<Object3D[]>([]);
const selected = ref<readonly Object3D[]>([]);

const planeManager: Ref<PlaneManager | null> = ref(null);
const fillColor: Ref<string> = ref(instance.viewer?.sceneManager.planeManager.color!);

onMounted(() => {
    planeManager.value = instance.viewer!.sceneManager.planeManager;
    items.value = Array.from(instance.viewer!.sceneManager.planeManager.planes.values());
    selected.value = instance.viewer!.selectionManager.target;
    instance.viewer!.addListener("loaded", () => {
        console.log(instance.viewer?.sceneManager.planeManager.planes);
        items.value = Array.from(instance.viewer!.sceneManager.planeManager.planes.values());
    });
    instance.viewer?.selectionManager.addListener("change", () => {
        selected.value = instance.viewer!.selectionManager.target;
    });
})

const visibility = computed({
    get: () => selectedPlane.value?.visible,
    set: (value: boolean) => {
        selectedPlane.value?.SetVisibility(value);
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

const step = computed(() => Math.abs(selectedPlane.value!.max - selectedPlane.value!.min) / 1000);

const offset = computed({
    get: () => selectedPlane.value?.plane.constant,
    set: (value: number) => {
        selectedPlane.value?.SetOffset(value);
        instance.viewer?.appearance.Render();
    }
})

function OnInvert(plane: Plane) {
    plane.Invert();
    instance.viewer?.appearance.Render();
}

function getModelArray(): Object3D[] {
    const array: Object3D[] = [];
    instance.viewer?.sceneManager.modelManager.model.traverse(item => array.push(item));
    return array;
}

function Exclude() {
    instance.viewer?.selectionManager.target.forEach(item => {
        instance.viewer?.sceneManager.planeManager.Exclude(item);
    });
    const included = instance.viewer!.sceneManager.planeManager.included;
    excluded.value.length = 0;
    excluded.value = getModelArray().filter(item => !included.includes(item));
    instance.viewer?.appearance.Render();
}

function Include() {
    selectedExcluded.value.forEach(item => {
        const obj = instance.viewer?.sceneManager.modelManager.model.getObjectByProperty("uuid", item.uuid);
        if (obj != undefined) {
            instance.viewer?.sceneManager.planeManager.Include(obj);
        }
    });
    const included = instance.viewer!.sceneManager.planeManager.included;
    excluded.value.length = 0;
    selectedExcluded.value.length = 0;
    excluded.value = getModelArray().filter(item => !included.includes(item));
    instance.viewer?.selectionManager.Select(instance.viewer.sceneManager.modelManager.model);
    instance.viewer?.selectionManager.HideSelected();
    instance.viewer?.selectionManager.Select();
    instance.viewer?.appearance.Render();
}

function LoadSectionFillImage(event: Event) {
    let f = event.target as any;
    let str = "";
    if (f != null)
        str = window.URL.createObjectURL(f.files[0]);
    if (str.length != 0) {
        planeManager.value?.LoadSectionFillImage(str).then(() => {
            instance.viewer?.appearance.Render();
        });
    }
}

function ChangeSectionFillColor(event: Event) {
    const hex = (event.target as any).value;
    planeManager.value?.SetSectionFillColor(hex);
    instance.viewer?.appearance.Render();
}

function SetSectionFillColor() {
    planeManager.value?.SetSectionFillImage();
    instance.viewer?.appearance.Render();
}

function AddPlane() {
    instance.viewer?.sceneManager.planeManager.AddPlane("New plane", new Vector3(1, 1, 1));
    items.value = Array.from(instance.viewer!.sceneManager.planeManager.planes.values());
}

function DeletePlane() {
    selectedPlane.value?.SetVisibility(false);
    instance.viewer?.sceneManager.planeManager.DeletePlane(selectedPlane.value!);
    items.value = Array.from(instance.viewer!.sceneManager.planeManager.planes.values());
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