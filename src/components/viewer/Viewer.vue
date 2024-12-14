<template>
    <div class="viewer" @dragenter="onDragEnter($event)" @dragleave="onDragLeave($event)" @dragover="onDragOver($event)"
        @drop="onDrop($event)">
        <canvas class="theme" id="canvas" ref="canvas" />
        <div v-if="dragndrop" class="drag-and-drop"><img src="/folder.svg" alt="" draggable="false"></div>
    </div>
</template>

<script setup lang="ts">
import { instance } from '../../instance/instance';
import { Viewer } from 'm3dv';
import { onMounted, ref, type Ref } from 'vue';

const occtImportJsWasmPath: string = new URL("@/assets/occt-import-js.wasm", import.meta.url).href;
console.log(occtImportJsWasmPath);

const canvas: Ref<HTMLCanvasElement | null> = ref(null);
const dragndrop = ref(false);

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
            instance.viewer.showStats = false;
            instance.viewer.appearance.Render();
            console.log(instance);
        }
    }
});

function onDrop(event: Event) {
    event.preventDefault();
    console.log(event);
    let file: File | null = null;
    const dataTransfer = (event as any).dataTransfer;
    if (dataTransfer.items) {
        if (dataTransfer.items.length == 1) {
            const item = dataTransfer.items[0] as DataTransferItem;
            if (item.kind === "file") {
                file = item.getAsFile();
            }
        };
    } else {
        const fileList = dataTransfer.files as FileList;
        if (fileList.length == 1) {
            file = fileList[0];
        }
    }
    if (file != null) {
        console.log(file.name);
        const url = URL.createObjectURL(file);
        instance.viewer?.LoadModelFile(file?.name, url);
    }

    dragndrop.value = false;
}
function onDragEnter(event: Event) {
    dragndrop.value = true;
}
function onDragLeave(event: Event) {
    dragndrop.value = false;
}
function onDragOver(event: Event) {
    event.preventDefault();
}
</script>

<style scoped>
.viewer {
    flex: auto;
    display: flex;
    border: 1px solid var(--color-border);
    position: relative;
}

canvas {
    flex: 1;
    width: 100%;
    min-width: 100px;
}

.drag-and-drop {
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    margin: 0px 25%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    filter: opacity(0.25);
    pointer-events: none;
}
</style>