<template>
    <div class="actions">
        <BtnInputFile :fileInput="onFileLoad" accept=".gtlf,.glb,.step,.iges,.brep" title="Load model file">
            <img class="icon" src="/folder.svg" alt="Load model file">
        </BtnInputFile>
    </div>
</template>

<script setup lang="ts">
import { instance } from '../../../instance/instance';
import BtnInputFile from '../../../components/shared/BtnInputFile.vue';




function onFileLoad(event: Event) {
    const files = (event.target as any).files;
    if (files.length != 0) {
        const file = files[0] as File;
        const src = URL.createObjectURL(file);
        instance.viewer?.LoadModelFile(file.name, src, false);
    }
}

</script>

<style scoped></style>