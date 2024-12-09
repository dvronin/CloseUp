<template>
    <div class="actions">
        <BtnInputCheckbox v-model="wireframe" title="Show\Hide wireframe" :open-icon-path="visibleSvg"
            :closed-icon-path="hiddenSvg" />
        <BtnInputCheckbox v-model="cameraType" title="Perspective\Orthographic camera" :open-icon-path="visibleSvg"
            :closed-icon-path="hiddenSvg" />
        <BtnInputCheckbox v-model="controlsType" title="Orbit\Trackball controls" :open-icon-path="visibleSvg"
            :closed-icon-path="hiddenSvg" />
        <BtnInputCheckbox v-model="axesVisibility" title="Show\Hide axes helper" :open-icon-path="visibleSvg"
            :closed-icon-path="hiddenSvg" />
        <div class="separator"></div>
        <div>Enviroment</div>
        <button @click="instance.helper.emit(`sidebar-change`, `ViewSettings`)"><img class="icon" src="/gear.svg"
                alt=""></button>
        <div class="separator"></div>
        <div>Properties</div>
        <button @click="instance.helper.emit(`sidebar-change`, `Properties`)"><img class="icon" src="/gear.svg"
                alt=""></button>
    </div>
</template>

<script setup lang="ts">
import { instance } from '../../../instance/instance';
import BtnInputCheckbox from '../../../components/shared/BtnInputCheckbox.vue';
import { computed } from 'vue';
import { CameraType, ControlsType } from 'm3dv';
import visibleSvg from '/visible.svg'
import hiddenSvg from '/hidden.svg'

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
});

const axesHelper = instance.viewer!.sceneManager.scene.getObjectByProperty("type", "AxesHelper");

const axesVisibility = computed({
    get: (): boolean => { return axesHelper!.visible; },
    set: (value: boolean) => {
        axesHelper!.visible = value;
        instance.viewer?.appearance.Render();
    }
});

</script>

<style scoped></style>