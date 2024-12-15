<template>
    <div v-if="showTitleBarButtons" id="titlebar" class="controls">
        <button @click="OnMinimize()"><img class="icon" src="/minus.svg" alt=""></button>
        <button @click="OnMaximize()"><img class="icon" src="/maximize.svg" alt=""></button>
        <button @click="OnClose()"><img class="icon" src="/cross.svg" alt=""></button>
    </div>
</template>
<script lang="ts" setup>
import { instance } from '@/instance/instance';
import { onMounted, ref } from 'vue';

const showTitleBarButtons = ref(true);

onMounted(async () => {
    if (instance.helper.isDesktopApp()) {
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