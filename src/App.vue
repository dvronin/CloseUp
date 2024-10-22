<template>
  <header>
    <Header />
  </header>
  <main>
    <aside class="element">
      <Sidebar direction="right">
        <Resizer direction="right">
          <TreeView v-if="model != null" :model="model" />
        </Resizer>
      </Sidebar>
    </aside>
    <Viewer />
    <div class="element">
      <Sidebar direction="left">
        <Resizer direction="left">
          <Settings />
        </Resizer>
      </Sidebar>
    </div>
  </main>
  <footer class="element">footer</footer>
</template>

<script setup lang="ts">
import Header from './components/header/Header.vue';
import Viewer from './components/viewer/Viewer.vue';
import Sidebar from './components/shared/Sidebar.vue';
import TreeView from './components/treeview/TreeView.vue';
import { instance } from './instance/instance';
import { onMounted, ref } from 'vue';
import type { Object3D } from 'three';
import Resizer from './components/shared/Resizer.vue';
import TabControl from './components/shared/TabControl.vue';
import TabItem from './components/shared/TabItem.vue';
import Settings from './components/settings/Settings.vue';

const model = ref<Object3D | null>(null);

onMounted(() => {
  if (instance.viewer != null) {
    instance.viewer.addListener("loaded", onModelLoad);
  }
})

function onModelLoad() {
  model.value = instance.viewer?.sceneManager.modelManager.model;
}

</script>


<style scoped>
main {
  flex: auto 1 0;
  width: auto;
  height: 0%;
  display: flex;
  flex-direction: row;
}

aside {
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 25%;
  flex: auto 0 0;
}
</style>
