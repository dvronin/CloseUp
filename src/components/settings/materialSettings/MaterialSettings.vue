<template>
    <div class="settings">
        <HeaderedGroup>
            <template #header>Material editor</template>
            <template #content>
                <HeaderedGroup>
                    <template #header>
                        Materials list
                    </template>
                    <template #content>
                        <div class="list">
                            <SelectControl :multiple="false" :size="8" :items="materialOptions"
                                @change="OnSelectedMaterialChange($event)" />
                            <div class="controls">
                                <button @click="console.log('Add')"><img class="icon" src="/plus.svg"
                                        alt="Add plane"></button>
                                <button :disabled="selectedMaterial == null" @click="console.log('Delete')"><img
                                        class="icon" src="/minus.svg" alt="Remove plane"></button>
                            </div>
                        </div>
                    </template>
                </HeaderedGroup>
                <HeaderedGroup v-if="selectedMaterial != null">
                    <template #header>
                        <div class="selected-material">
                            <div class="material">
                                <div>Material:</div>
                                <button v-if="editName == false" class="material-name" @click="OnNameEdit($event)">{{
                                    selectedMaterial.name }}</button>
                                <div v-else class="material-name-edit">
                                    <input style="width: 100%;" type="text" name="" id="" v-model="materialName"
                                        @focusout="OnNameChange($event)">
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #content>
                        <div class="settings-item">
                            <label for="type">Type</label>
                            <SelectControl id="type" :items="typeOptions" :multiple="false"
                                @change="OnTypeChange($event)" />
                        </div>
                        <component :key="selectedMaterial.uuid" :is="types[selectedType]"
                            v-bind="{ material: selectedMaterial }"></component>

                    </template>
                </HeaderedGroup>

            </template>
        </HeaderedGroup>
    </div>
</template>

<script lang="ts" setup>
import HeaderedGroup from '@/components/shared/HeaderedGroup.vue';
import SelectControl, { type Option } from '@/components/shared/SelectControl.vue';
import { onMounted, ref } from 'vue';
import BasicMaterial from './materials/BasicMaterial.vue';
import LambertMaterial from './materials/LambertMaterial.vue';
import ToonMaterial from './materials/ToonMaterial.vue';
import PhongMaterial from './materials/PhongMaterial.vue';
import StandardMaterial from './materials/StandardMaterial.vue';
import PhysicalMaterial from './materials/PhysicalMaterial.vue';
import { Material, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial } from 'three';
import { instance } from '@/instance/instance';
import type { MaterialManager } from 'm3dv';

const types: any = { BasicMaterial, ToonMaterial, LambertMaterial, PhongMaterial, StandardMaterial, PhysicalMaterial };
const typeOptions = ref<Option[]>([
    { name: "Basic", value: "BasicMaterial", selected: false },
    { name: "Toon", value: "ToonMaterial", selected: false },
    { name: "Lambert", value: "LambertMaterial", selected: false },
    { name: "Phong", value: "PhongMaterial", selected: false },
    { name: "Standard", value: "StandardMaterial", selected: false },
    { name: "Physical", value: "PhysicalMaterial", selected: false },
]);
const selectedType = ref<string>("PhysicalMaterial");

const materialOptions = ref<Option[]>([]);
const materialManager: MaterialManager = instance.viewer!.sceneManager.modelManager.materialManager;

const selectedMaterial = ref<Material | null>(null);
const editName = ref(false);
const materialName = ref("");

onMounted(() => {
    UpdateMaterialOptions();
    instance.viewer!.addListener("loaded", () => {
        UpdateMaterialOptions();
    });
})


function UpdateMaterialOptions() {
    materialOptions.value = materialManager.GetMaterials().map((value, index) => {
        value.name = value.name.trim().length != 0 ? value.name.trim() : `${value.type} ${index}`
        return {
            name: value.name,
            value: value,
            selected: false
        }
    }).sort((a, b) => a.name.localeCompare(b.name));
}

function OnSelectedMaterialChange(option: Option[]) {
    if (option.length != 0) {
        const value = option[0].value;
        selectedMaterial.value = value;
        const materials = materialManager.GetMaterials();
        const index = materials.findIndex(item => item.uuid == value.uuid);
        if (index != -1)
            UpdateSelectedType(materials[index]);
    }
}

function OnNameEdit(event: Event) {
    editName.value = true;
    materialName.value = selectedMaterial.value!.name;
}

function OnNameChange(event: Event) {
    editName.value = false;
    if (materialName.value.trim().length != 0) {
        if (selectedMaterial.value != null) {
            selectedMaterial.value.name = materialName.value.trim();
            UpdateMaterialOptions();
        }
    }
}

function UpdateSelectedType(material: Material) {

    const Basic = material as MeshBasicMaterial;
    if (Basic.isMeshBasicMaterial != undefined && Basic.isMeshBasicMaterial == true) {
        selectedType.value = "BasicMaterial";
    }
    const Toon = material as MeshToonMaterial;
    if (Toon.isMeshToonMaterial != undefined && Toon.isMeshToonMaterial == true) {
        selectedType.value = "ToonMaterial";
    }
    const Phong = material as MeshPhongMaterial;
    if (Phong.isMeshPhongMaterial != undefined && Phong.isMeshPhongMaterial == true) {
        selectedType.value = "PhongMaterial";
    }
    const Lambert = material as MeshLambertMaterial;
    if (Lambert.isMeshLambertMaterial != undefined && Lambert.isMeshLambertMaterial == true) {
        selectedType.value = "LambertMaterial";
    }
    const Standard = material as MeshStandardMaterial;
    if (Standard.isMeshStandardMaterial != undefined && Standard.isMeshStandardMaterial == true) {
        selectedType.value = "StandardMaterial";
    }
    const Physical = material as MeshPhysicalMaterial;
    if (Physical.isMeshPhysicalMaterial != undefined && Physical.isMeshPhysicalMaterial == true) {
        selectedType.value = "PhysicalMaterial";
    }

    const index = typeOptions.value.findIndex(item => item.value == selectedType.value);
    if (index != -1) {
        typeOptions.value.forEach(item => item.selected = false);
        typeOptions.value[index].selected = true;
    }
}

function OnTypeChange(option: Option[]) {
    if (option.length != 0) {
        const value = option[0].value;
        if (types[value] != undefined) {
            selectedType.value = option[0].value;
            const materials = materialManager.GetMaterials();
            const index = materials.findIndex(item => item.uuid == selectedMaterial.value!.uuid);
            if (index != -1)
                CreateFromMaterial(option[0].value, materials[index]);
        }
    }
}

function CreateFromMaterial(type: string, material: Material) {
    let newMaterial: Material;
    if (type == "BasicMaterial") {
        newMaterial = new MeshBasicMaterial();
    }
    else if (type == "ToonMaterial") {
        newMaterial = new MeshToonMaterial();
    }
    else if (type == "PhongMaterial") {
        newMaterial = new MeshPhongMaterial();
    }
    else if (type == "LambertMaterial") {
        newMaterial = new MeshLambertMaterial();
    }
    else if (type == "StandardMaterial") {
        newMaterial = new MeshStandardMaterial();
    }
    else {
        newMaterial = new MeshPhysicalMaterial();
    }

    newMaterial.name = material.name;
    newMaterial.clippingPlanes = material.clippingPlanes;

    const sharedProps = Object.keys(newMaterial)
        .filter(prop => !Object.keys(new Material()).includes(prop))
        .filter(prop => Object.keys(material).includes(prop))
        .filter(prop => prop != "defines");

    sharedProps.forEach(prop => {
        (newMaterial as any)[prop] = (material as any)[prop];
    });

    instance.viewer?.sceneManager.modelManager.materialManager.ReplaceMaterial(material, newMaterial);
    instance.viewer?.sceneManager.modelManager.materialManager.DeleteMaterial(material);
    instance.viewer?.sceneManager.modelManager.model.traverse(item => {
        const mesh = item as Mesh;
        if (mesh.isMesh != undefined && mesh.isMesh) {
            (mesh.material as any) = instance.viewer?.sceneManager.modelManager.materialManager.GetMaterial(mesh);
        }
    });
    UpdateMaterialOptions();
    selectedMaterial.value = newMaterial;
    instance.viewer?.appearance.Render();
}

</script>

<style scoped>
.list {
    display: flex;
    flex-direction: row;
}

.controls {
    display: flex;
    flex-direction: column;
}

.selected-material {
    display: flex;
    flex-direction: row;
}

.material {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
}

.material-name {
    border: none;
    padding: 0;
    color: var(--color-accent);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.material-name-edit {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
}
</style>