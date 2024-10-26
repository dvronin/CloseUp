<template>
    <div class="actions">
        <BtnInputCheckbox v-model="wireframe" open-icon-path="/src/assets/visible.svg"
            closed-icon-path="/src/assets/visible.svg" />
        <BtnInputCheckbox v-model="cameraType" open-icon-path="/src/assets/visible.svg"
            closed-icon-path="/src/assets/visible.svg" />
        <BtnInputCheckbox v-model="controlsType" open-icon-path="/src/assets/visible.svg"
            closed-icon-path="/src/assets/visible.svg" />
        <p>Text</p>
    </div>
</template>

<script setup lang="ts">
import { instance } from '@/instance/instance';
import BtnInputCheckbox from '@/components/shared/BtnInputCheckbox.vue';
import { computed } from 'vue';
import { CameraType, ControlsType } from 'm3dv';

const wireframe = computed({
    get: (): boolean => { return instance.viewer!.appearance.wireframe; },
    set: (value: boolean) => {
        instance.viewer!.appearance.wireframe = value;
        instance.viewer?.appearance.Render();
    }
});

const cameraType = computed({
    get: (): boolean => { return instance.viewer!.appearance.cameraType == CameraType.perspective; },
    set: (value: boolean) => {
        instance.viewer!.appearance.SetCameraType(value == true ? CameraType.perspective : CameraType.orthographic);
        instance.viewer?.appearance.Render();
    }
});

const controlsType = computed({
    get: (): boolean => { return instance.viewer!.controls.controlsType == ControlsType.orbit },
    set: (value: boolean) => {
        instance.viewer!.controls.SetCameraControl(value == true ? ControlsType.orbit : ControlsType.trackball);
        instance.viewer?.appearance.Render();
    }
})




</script>

<style scoped></style>