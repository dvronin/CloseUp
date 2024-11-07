<template>
    <div class="settings">
        <HeaderedGroup>
            <template #header>
                Background type
            </template>
            <template #content>
                <div class="settings-item">
                    <label for="background-color">Background color</label>
                    <input type="color" name="background-color" id="background-color" v-model="backgroundColor"
                        class="no-filter" @input="ChangeBackgroundColor($event)">
                </div>
                <div class="settings-item">
                    <div>HDR image</div>
                    <div>
                        <BtnInputFile :file-input="LoadHDRImage" accept=".hdr">
                            <img class="icon" src="/folder.svg" alt="Load HDR image">
                        </BtnInputFile>
                        <button @click="SetBackgroundImage()"
                            :disabled="enviroment?.type == BackgroundType.image || enviroment?.texture == null"
                            title="enable background image">
                            <img class="icon" src="/visible.svg" alt="Show background image">
                        </button>
                    </div>
                </div>
            </template>
        </HeaderedGroup>
        <HeaderedGroup>
            <template #header>
                Background
            </template>
            <template #content>
                <div class="settings-item">
                    <label for="exposure">Exposure</label>
                    <input type="range" name="exposure" id="exposure" min="0.001" step="0.01" max="2"
                        @input="OnExposureChange($event)">
                </div>
                <div class="settings-item">
                    <label for="tone">Tone mapping</label>
                    <select name="tone" id="tone" @input="OnToneMappingChange($event)">
                        <option value="0">linear</option>
                        <option value="1">Reinhard</option>
                        <option value="2">Cineon</option>
                        <option value="3">ASEC</option>
                        <option value="4">AgX</option>
                        <option value="5">Neutral</option>
                    </select>
                </div>
            </template>
        </HeaderedGroup>
        <HeaderedGroup v-show="enviroment?.texture != null">
            <template #header>
                Background image
            </template>
            <template #content>
                <div class="settings-item">
                    <label for="reflection">Reflection</label>
                    <input type="checkbox" name="reflection" id="reflection" @change="OnReflectionChange($event)">
                </div>
                <div class="settings-item">
                    <label for="background-intensity">Intensity</label>
                    <input type="range" name="background-intensity" id="background-intensity" min="0" step="0.01"
                        max="1" @input="OnBackgroundIntensityChange($event)">
                </div>
                <div class="settings-item">
                    <label for="background-blurriness">Blurriness</label>
                    <input type="range" name="background-blurriness" id="background-blurriness" min="0" max="1"
                        step="0.01" value="0" @input="OnBackgroundBlurrinessChange($event)">
                </div>
                <div class="settings-item">
                    <label for="background-rotation-x">X</label>
                    <input type="range" name="background-rotation-x" id="background-rotation-x" min="0" max="360"
                        value="0" @input="OnBackgroundRotationXChange($event)">
                </div>
                <div class="settings-item">
                    <label for="background-rotation-y">Y</label>
                    <input type="range" name="background-rotation-y" id="background-rotation-y" min="0" max="360"
                        value="0" @input="OnBackgroundRotationYChange($event)">
                </div>
                <div class="settings-item">
                    <label for="background-rotation-z">Z</label>
                    <input type="range" name="background-rotation-z" id="background-rotation-z" min="0" max="360"
                        value="0" @input="OnBackgroundRotationZChange($event)">
                </div>
            </template>
        </HeaderedGroup>
    </div>
</template>

<script setup lang="ts">
import BtnInputFile from '../../../shared/BtnInputFile.vue';
import { instance } from '../../../../instance/instance';
import { BackgroundType, type Enviroment } from 'm3dv';
import { ToneMapping } from 'm3dv/dist/Managers/Objects/Enviroment';
import { Color } from 'three';
import { onMounted, ref, type Ref } from 'vue';
import HeaderedGroup from '../../../shared/HeaderedGroup.vue';


const enviroment: Ref<Enviroment | null> = ref(null);
const backgroundColor: Ref<string> = ref("");

onMounted(() => {
    if (instance.viewer != null) {
        enviroment.value = instance.viewer.appearance.enviroment;
        backgroundColor.value = `#${new Color(enviroment.value.color).getHexString()}`;
    }
});

function ChangeBackgroundColor(event: Event) {
    const hex = (event.target as any).value;
    enviroment.value?.SetBackgroundColor(hex);
    instance.viewer?.appearance.Render();
}

function LoadHDRImage(event: Event) {
    let f = event.target as any;
    let str = "";
    if (f != null)
        str = window.URL.createObjectURL(f.files[0]);
    if (str.length != 0) {
        enviroment.value?.LoadBackgroundImage(str).then(() => {
            instance.viewer?.appearance.Render();
        });
    }
}

function SetBackgroundImage() {
    enviroment.value?.SetBackgroundImage();
    instance.viewer?.appearance.Render();
}

function OnReflectionChange(event: Event) {
    const value = (event.target as any).checked;
    enviroment.value?.SetReflectionMap(value);
    instance.viewer?.appearance.Render();
}

function OnExposureChange(event: Event) {
    enviroment.value!.exposure = (event.target as any).value;
    instance.viewer?.appearance.Render();
}
function OnBackgroundIntensityChange(event: Event) {
    enviroment.value!.backgroundIntensity = (event.target as any).value;
    instance.viewer?.appearance.Render();
}
function OnBackgroundBlurrinessChange(event: Event) {
    enviroment.value!.backgroundBlurriness = (event.target as any).value;
    instance.viewer?.appearance.Render();
}
function OnBackgroundRotationXChange(event: Event) {
    enviroment.value!.backgroundRotation.x = (event.target as any).value * Math.PI / 180;
    instance.viewer?.appearance.Render();
}
function OnBackgroundRotationYChange(event: Event) {
    enviroment.value!.backgroundRotation.y = (event.target as any).value * Math.PI / 180;
    instance.viewer?.appearance.Render();
}
function OnBackgroundRotationZChange(event: Event) {
    enviroment.value!.backgroundRotation.z = (event.target as any).value * Math.PI / 180;
    instance.viewer?.appearance.Render();
}
function OnToneMappingChange(event: Event) {
    const value = Number.parseInt((event.target as any).value);
    enviroment.value!.toneMapping = value as ToneMapping;
    instance.viewer?.appearance.Render();
}

</script>

<style scoped></style>