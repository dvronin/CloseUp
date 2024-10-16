<template>
    <div class="viewer">
        <canvas id="canvas" ref="canvas" />
    </div>
</template>

<script setup lang="ts">
import { instance } from '@/instance/instance';
import { Viewer } from 'cad-model-viewer/dist/Viewer';
import { onMounted, ref, type Ref } from 'vue';

const occtImportJsWasmPath: string = "";
const canvas: Ref<HTMLCanvasElement | null> = ref(null);

onMounted(() => {
    console.log(canvas);
    if (canvas.value != null) {
        if (instance.viewer == null) {
            instance.viewer = new Viewer(canvas.value, { occtImportJsWasmPath: occtImportJsWasmPath });
            console.log(instance);
            
        }
    }
});

</script>

<style scoped>
.viewer {
    flex: auto;
    display: flex;
}

canvas {
    flex: 1;
    width: 100%;
    z-index: 1;
}
</style>