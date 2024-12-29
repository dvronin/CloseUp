<template>
    <div class="element container" ref="header">
        <div class="header">
            <div class="drag-area">
                <div>CloseUp 3D viewer</div>
                <div class="file-name">{{ modelName }}</div>
            </div>
            <nav class="links">
                <a target="_blank" @click="OpenHelp()" title="help">
                    <img class="icon" src="/help.svg" alt="github">
                </a>
                <a target="_blank" href="https://github.com/dvronin/CloseUp" title="CloseUp git repo">
                    <img class="icon" src="/favicon.svg" alt="github">
                </a>
                <a target="_blank" href="https://github.com/dvronin" title="git profile">
                    <img class="icon" src="/github-mark.svg" alt="github">
                </a>
                <a target="_blank" href="https://vk.com/dv.ronin" title="vk profile">
                    <img class="icon" src="/VK Logo Black & White.svg" alt="vk">
                </a>
                <TitleBar />
            </nav>
        </div>
        <TabControl>
            <TabItem title="Home">
                <HomeTab />
            </TabItem>
            <TabItem title="View">
                <ViewTab />
            </TabItem>
            <TabItem title="Edit">
                <EditTab />
            </TabItem>
        </TabControl>
        <Help ref="help" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef, type Ref } from 'vue';
import HomeTab from './menu/HomeTab.vue';
import { instance } from '../../instance/instance';
import TabControl from '../shared/TabControl.vue';
import TabItem from '../shared/TabItem.vue';
import ViewTab from './menu/ViewTab.vue';
import EditTab from './menu/EditTab.vue';
import Help from './help/Help.vue';
import TitleBar from '@/electron/components/titlebar/TitleBar.vue';

const modelName: Ref<string> = ref("model_name");
const header = useTemplateRef('header');


onMounted(() => {
    console.log(header.value);

    instance.viewer?.addListener("loaded", () => {
        modelName.value = instance.viewer!.sceneManager.modelManager.model.children[0].name;
    });
})

function OpenHelp() {

    if (header.value != null) {
        const dialog = header.value.querySelector("dialog");
        console.log(dialog);

        if (dialog != null) {
            dialog.showModal();
        }
    }
}

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.drag-area {
    display: flex;
    flex-direction: row;
    app-region: drag;
    justify-content: left;
    flex: 1 1 auto;
}

.file-name {
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
}

.links {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.links>* {
    margin: 4px;
    text-align: center;
    vertical-align: middle;
}

:deep(.separator) {
    width: 2px;
    height: 1rem;
    padding: 0.75rem 0;
    background-color: var(--color-border);
}

:deep(.actions) {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
}

:deep(.actions>*) {
    margin: 1px;
}

a:hover {
    cursor: pointer;
}

:deep(.actions>.separator) {
    margin: 1px 5px;
}
</style>