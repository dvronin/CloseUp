<template>
    <div>
        <input type="file" @change="onFileLoad($event)">
    </div>
</template>

<script setup lang="ts">
import { instance } from '@/instance/instance';




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