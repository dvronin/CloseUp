<template>
    <div class="settings">
        <div class="settings-item">
            <label for="background-color">Background color</label>
            <input type="color" name="background-color" id="background-color" :value="backgroundColor" class="no-filter"
                @input="ChangeBackgroundColor($event)">
        </div>
        <div class="settings-item">
            <div>HDR image</div>
            <div>
                <BtnInputFile :file-input="LoadHDRImage">HDR</BtnInputFile>
                <button @click="DisableImage()" :disabled="enviroment?.type == BackgroundType.color"
                    title="remove background image">X</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BtnInputFile from '@/components/shared/BtnInputFile.vue';
import { instance } from '@/instance/instance';
import { BackgroundType, type Enviroment } from 'm3dv';
import { Color } from 'three';
import { onMounted, ref, type Ref } from 'vue';


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

function DisableImage() {
    enviroment.value?.SetBackgroundColor(backgroundColor.value);
    instance.viewer?.appearance.Render();
}

</script>

<style scoped></style>