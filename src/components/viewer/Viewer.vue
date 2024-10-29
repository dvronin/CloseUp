<template>
    <div class="viewer">
        <canvas id="canvas" ref="canvas" />
    </div>
</template>

<script setup lang="ts">
import { instance } from '../../instance/instance';
import { Viewer } from 'm3dv';
import { onMounted, ref, type Ref } from 'vue';

const occtImportJsWasmPath: string = new URL("@/assets/occt-import-js.wasm", import.meta.url).href;
console.log(occtImportJsWasmPath);

const canvas: Ref<HTMLCanvasElement | null> = ref(null);

onMounted(() => {
    console.log(canvas);
    if (canvas.value != null) {
        const observer = new ResizeObserver(e => {
            instance.viewer?.appearance.Resize();
        });
        observer.observe(canvas.value);
        if (instance.viewer == null) {
            instance.viewer = new Viewer(canvas.value, { occtImportJsWasmPath: occtImportJsWasmPath });
            instance.viewer.appearance.enviroment.SetBackgroundColor(0x333333);
            instance.viewer.showStats = true;
            instance.viewer.appearance.Render();
            console.log(instance);
        }
    }
});

</script>

<style scoped>
.viewer {
    flex: auto;
    display: flex;
    position: relative;
    border: 1px solid var(--color-border);
}

canvas {
    flex: 1;
    width: 100%;
    z-index: 1;
    min-width: 100px;
}
</style>