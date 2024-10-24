<template>
    <div class="element container">
        <div class="header">
            <div>CADViewer powered by <a href="https://github.com/123Wampir/m3dv">m3dv</a></div>
            <div class="file-name">{{ modelName }}</div>
            <nav class="links">
                <a href="https://github.com/123Wampir">
                    <img src="../../assets/github-mark.svg" alt="github">
                </a>
                <a href="https://vk.com/dv.ronin">
                    <img src="../../assets/VK Logo Black & White.svg" alt="vk">
                </a>
            </nav>
        </div>
        <Menu />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import Menu from './menu/Menu.vue';
import { instance } from '@/instance/instance';

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

img {
    height: 1rem;
    width: 1rem;
}
</style>