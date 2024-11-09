<template>
    <div class="element container">
        <div class="header">
            <div>CADViewer powered by <a target="_blank" href="https://github.com/123Wampir/m3dv">m3dv</a></div>
            <div class="file-name">{{ modelName }}</div>
            <nav class="links">
                <a target="_blank" href="https://github.com/123Wampir">
                    <img class="icon" src="/github-mark.svg" alt="github">
                </a>
                <a target="_blank" href="https://vk.com/dv.ronin">
                    <img class="icon" src="/VK Logo Black & White.svg" alt="vk">
                </a>
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
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import HomeTab from './menu/HomeTab.vue';
import { instance } from '../../instance/instance';
import TabControl from '../shared/TabControl.vue';
import TabItem from '../shared/TabItem.vue';
import ViewTab from './menu/ViewTab.vue';
import EditTab from './menu/EditTab.vue';

const modelName: Ref<string> = ref("model_name");

onMounted(() => {
    console.log(instance);

    instance.viewer?.addListener("loaded", () => {
        modelName.value = instance.viewer!.sceneManager.modelManager.model.children[0].name;
    });
})

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

.file-name {}

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
}

:deep(.actions>*) {
    margin: 1px;
}

:deep(.actions>.separator) {
    margin: 1px 5px;
}
</style>