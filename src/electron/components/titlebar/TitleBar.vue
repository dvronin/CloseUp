<template>
    <div v-if="showTitleBarButtons" id="titlebar" class="controls">
        <button @click="OnMinimize()"><img class="icon" src="/minus.svg" alt=""></button>
        <button @click="OnMaximize()"><img class="icon" src="/plus.svg" alt=""></button>
        <button @click="OnClose()"><img class="icon" src="/bucket.svg" alt=""></button>
    </div>
</template>
<script lang="ts" setup>
import { instance } from '@/instance/instance';
import { onMounted, ref } from 'vue';

const showTitleBarButtons = ref(true);

onMounted(async () => {
    // console.log(ipcRenderer);

    if (instance.helper.isDesktopApp()) {
        // const { ipcRenderer } = await import("electron");
        // renderer = ipcRenderer;
        // IpcRenderer = ipcRenderer;
        showTitleBarButtons.value = true;
    }
    else {
        showTitleBarButtons.value = false;
    }
})


function OnMinimize() {
    console.log(window);

    (window as any).electronAPI.minimize();
}
function OnMaximize() {
    (window as any).electronAPI.maximize();
}
function OnClose() {
    (window as any).electronAPI.close();
}

</script>

<style scoped>
.controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
</style>