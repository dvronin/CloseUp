<template>
    <div class="settings">
        <HeaderedGroup>
            <template #header>
                Background type
            </template>
            <template #content>
                <div class="settings-item">
                    <div>Background color</div>
                    <ColorPicker name="background-color" id="background-color" v-model="backgroundColor"
                        @input="ChangeBackgroundColor($event)" />
                </div>
                <div class="settings-item">
                    <div>HDR image</div>
                    <div>
                        <SelectControl id="hdr" :multiple="false" :items="envMaps"
                            @change="OnEnviromentChange($event)" />
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
                    <SelectControl id="tone" :multiple="false" :items="toneMappingTypes"
                        @change="OnToneMappingChange($event)" />
                </div>
            </template>
        </HeaderedGroup>
        <HeaderedGroup v-show="enviroment?.texture != null">
            <template #header>
                Background image
            </template>
            <template #content>
                <div class="settings-item">
                    <div for="reflection">Reflection</div>
                    <BtnToggle name="reflection" id="reflection" v-model="reflection"
                        @change="OnReflectionChange($event)" />
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
import SelectControl, { type Option } from '@/components/shared/SelectControl.vue';
import ColorPicker from '@/components/shared/ColorPicker.vue';
import BtnToggle from '@/components/shared/BtnToggle.vue';

import env1 from '/hdr/hdr1.hdr?url'
import env2 from '/hdr/hdr2.hdr?url'
import env3 from '/hdr/hdr3.hdr?url'
import env4 from '/hdr/hdr4.hdr?url'
import env5 from '/hdr/hdr5.hdr?url'
import env6 from '/hdr/hdr6.hdr?url'
import env7 from '/hdr/hdr7.hdr?url'
import env8 from '/hdr/hdr8.hdr?url'


const enviroment: Ref<Enviroment | null> = ref(null);
const backgroundColor: Ref<string> = ref("");
const toneMappingTypes = ref<Option[]>([
    { name: "Linear", value: 0, selected: false },
    { name: "Reinhard", value: 1, selected: false },
    { name: "Cineon", value: 2, selected: false },
    { name: "ASEC", value: 3, selected: false },
    { name: "AgX", value: 4, selected: false },
    { name: "Neutral", value: 5, selected: false },
]);

const envMaps = ref<Option[]>([
    { name: "Env 1", value: env1, selected: false },
    { name: "Env 2", value: env2, selected: false },
    { name: "Env 3", value: env3, selected: false },
    { name: "Env 4", value: env4, selected: false },
    { name: "Env 5", value: env5, selected: false },
    { name: "Env 6", value: env6, selected: false },
    { name: "Env 7", value: env7, selected: false },
    { name: "Env 8", value: env8, selected: false },
]);

const reflection = ref(false);

onMounted(() => {
    if (instance.viewer != null) {
        enviroment.value = instance.viewer.appearance.enviroment;
        reflection.value = enviroment.value.isReflectionMapEnabled;
        const toneMapping = instance.viewer.appearance.enviroment.toneMapping;
        const index = toneMappingTypes.value.findIndex(item => item.value == toneMapping);
        if (index != -1) {
            toneMappingTypes.value[index].selected = true;
        }
        backgroundColor.value = `#${new Color(enviroment.value.color).getHexString()}`;
    }
});

function ChangeBackgroundColor(event: Event) {
    const hex = (event.target as any).value;
    enviroment.value?.SetBackgroundColor(hex);
    instance.viewer?.appearance.Render();
}

function OnEnviromentChange(option: Option[]) {
    const value = option[0].value;
    const url = new URL(value, import.meta.url);
    enviroment.value!.LoadBackgroundImage(url.href).then(e => {
        instance.viewer?.appearance.Render();
    });
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
function OnToneMappingChange(option: Option[]) {
    const value = option[0].value;
    enviroment.value!.toneMapping = value as ToneMapping;
    instance.viewer?.appearance.Render();
}

</script>

<style scoped></style>