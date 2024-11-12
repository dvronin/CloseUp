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
                            <SelectControl :multiple="true" :size="8" :items="excludeOptions"
                                @change="OnSelectedExcludeChange($event)" />
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
                            <SelectControl :multiple="false" :items="planeOptions" :size="8"
                                @change="OnSelectedPlaneChange($event)" />
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
                            <div class="plane">
                                <div>Plane:</div>
                                <button v-if="editName == false" class="plane-name" @click="OnNameEdit($event)">{{
                                    selectedPlane.name }}</button>
                                <div v-else class="plane-name-edit">
                                    <input style="width: 100%;" type="text" name="" id="" v-model="planeName"
                                        @focusout="OnNameChange($event)">
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #content>
                        <div class="settings-item">
                            <label for="visibility">Visibility</label>
                            <BtnInputCheckbox v-model="visibility" open-icon-path="/visible.svg"
                                closed-icon-path="/hidden.svg" id="visibility" />
                        </div>
                        <div class="settings-item">
                            <div>Normal</div>
                            <div class="vector">
                                <label for="vec-x">x:</label>
                                <input type="number" name="vec-x" id="vec-x" v-model="x" @change="OnNormalChange()">
                                <label for="vec-y">y:</label>
                                <input type="number" name="vec-y" id="vec-y" v-model="y" @change="OnNormalChange()">
                                <label for="vec-z">z:</label>
                                <input type="number" name="vec-z" id="vec-z" v-model="z" @change="OnNormalChange()">
                            </div>
                        </div>
                        <div class="settings-item">
                            <label for="constant">Offset</label>
                            <input type="range" id="constant" v-model="offset"
                                :max="selectedPlane.max + Math.abs(selectedPlane.max / 1e2)"
                                :min="selectedPlane.min - Math.abs(selectedPlane.min / 1e2)" :step="step" />
                        </div>
                        <div class="settings-item">
                            <button @click="OnInvert(selectedPlane)">Invert</button>
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
import SelectControl, { type Option } from '@/components/shared/SelectControl.vue';
import { instance } from '@/instance/instance';
import type { Plane, PlaneManager } from 'm3dv';
import { SectionFillType } from 'm3dv/dist/Managers/Planes/PlaneManager';
import { Object3D, Vector3 } from 'three';
import { computed, onMounted, ref, type Ref } from 'vue';

const selectedPlane: Ref<Plane | null> = ref(null);
const selectedExcluded: Ref<Object3D[]> = ref([]);
const excludeOptions = ref<Option[]>([]);
const selected = ref<readonly Object3D[]>([]);
const planeOptions = ref<Option[]>([]);
const editName = ref(false);
const planeName = ref("");

const x = ref(0);
const y = ref(0);
const z = ref(0);

const planeManager: Ref<PlaneManager | null> = ref(null);
const fillColor: Ref<string> = ref(instance.viewer?.sceneManager.planeManager.color!);

onMounted(() => {
    planeManager.value = instance.viewer!.sceneManager.planeManager;
    UpdatePlaneOptions();
    selected.value = instance.viewer!.selectionManager.target;
    instance.viewer!.addListener("loaded", () => {
        UpdatePlaneOptions();
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

function OnSelectedPlaneChange(event: Option[]) {
    if (event.length != 0) {
        selectedPlane.value = event[0].value;
        editName.value = false;
        x.value = selectedPlane.value!.plane.normal.x;
        y.value = selectedPlane.value!.plane.normal.y;
        z.value = selectedPlane.value!.plane.normal.z;
    }
}

function OnSelectedExcludeChange(event: Option[]) {
    selectedExcluded.value = event.map(value => value.value);
}

function OnInvert(plane: Plane) {
    plane.Invert();
    instance.viewer?.appearance.Render();
}

function getModelArray(): Object3D[] {
    const array: Object3D[] = [];
    instance.viewer?.sceneManager.modelManager.model.traverse(item => array.push(item));
    return array;
}

function UpdateExcludeOptions(items: Object3D[]) {
    excludeOptions.value = items.map((value) => ({ name: value.name, value: value, selected: false }));
}

function Exclude() {
    instance.viewer?.selectionManager.target.forEach(item => {
        instance.viewer?.sceneManager.planeManager.Exclude(item);
    });
    const included = instance.viewer!.sceneManager.planeManager.included;
    const items = getModelArray().filter(item => !included.includes(item));
    UpdateExcludeOptions(items);
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
    selectedExcluded.value.length = 0;
    const items = getModelArray().filter(item => !included.includes(item));
    UpdateExcludeOptions(items);

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

function OnNameEdit(event: Event) {
    editName.value = true;
    planeName.value = selectedPlane.value!.name;
}

function OnNameChange(event: Event) {
    editName.value = false;
    if (planeName.value.trim().length != 0) {
        if (selectedPlane.value != null) {
            (selectedPlane.value.name as any) = planeName.value;
            UpdatePlaneOptions();
        }
    }
}

function OnNormalChange() {
    selectedPlane.value?.plane.normal.set(x.value, y.value, z.value);
    selectedPlane.value?.Update();
}

function UpdatePlaneOptions() {
    planeOptions.value = Array.from(instance.viewer!.sceneManager.planeManager.planes.values())
        .map((value) => ({ name: value.name, value: value, selected: false }));
}

function AddPlane() {
    instance.viewer?.sceneManager.planeManager.AddPlane("New plane", new Vector3(1, 1, 1));
    UpdatePlaneOptions();
}

function DeletePlane() {
    selectedPlane.value?.SetVisibility(false);
    instance.viewer?.sceneManager.planeManager.DeletePlane(selectedPlane.value!);
    UpdatePlaneOptions();
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

.plane {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
}

.plane-name {
    border: none;
    padding: 0;
    color: var(--color-accent);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.plane-name-edit {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
}

.vector {
    display: grid;
    grid-template-columns: auto 1fr;
}
</style>