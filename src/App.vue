<template>
  <header>
    <Header v-if="viewerReady" />
  </header>
  <main>
    <aside class="element">
      <Sidebar direction="left">
        <Resizer direction="right">
          <TreeView v-if="model != null" :items="treeItems" />
        </Resizer>
      </Sidebar>
    </aside>
    <Viewer />
    <aside class="element">
      <Sidebar direction="right">
        <Resizer direction="left">
          <Settings />
        </Resizer>
      </Sidebar>
    </aside>
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
import { Object3D } from 'three';
import Resizer from './components/shared/Resizer.vue';
import Settings from './components/settings/Settings.vue';
import { ViewFitType, ViewType } from 'm3dv';

const model = ref<Object3D | null>(null);
const treeItems = ref<Object3D[]>([]);
const viewerReady = ref(false);

onMounted(() => {
  if (instance.viewer != null) {
    instance.viewer.addListener("loaded", onModelLoad);
    viewerReady.value = true;
  }
  window.addEventListener("keydown", onKeyDown)
})

function onModelLoad() {
  model.value = instance.viewer!.sceneManager.modelManager.model;
  treeItems.value.length = 0;
  treeItems.value.push(...model.value.children);
}

function onKeyDown(event: KeyboardEvent) {
  switch (event.code) {
    case "KeyF":
      if (instance.viewer?.selectionManager.target.length != 0) {
        instance.viewer?.appearance.FitInView(ViewFitType.selected);
      }
      else if (instance.viewer.sceneManager.modelManager.model.children.length != 0) {
        instance.viewer?.appearance.FitInView(ViewFitType.model);
      }
      break;
    case "KeyI":
      if (instance.viewer?.selectionManager.target.length != 0) {
        instance.viewer?.Isolate();
      }
      else if (instance.viewer.appearance.viewType == ViewType.isolated) {
        instance.viewer?.Isolate();
      }
      break;
    case "KeyS":
      if (instance.viewer?.selectionManager.target.length != 0) {
        instance.viewer?.selectionManager.target.forEach(item => {
          instance.viewer?.SetVisibility(item, true);
        })
      }
      break;
    case "KeyH":
      if (instance.viewer?.selectionManager.target.length != 0) {
        instance.viewer?.selectionManager.target.forEach(item => {
          instance.viewer?.SetVisibility(item, false);
        })
      }
      break;
    case "KeyA":
      if (event.ctrlKey == true) {
        event.preventDefault();
        instance.viewer?.selectionManager.HideSelected();
        instance.viewer?.selectionManager.Select(instance.viewer.sceneManager.modelManager.model);
        instance.viewer?.selectionManager.ShowSelected();
        instance.viewer?.appearance.Render();
      }
      break;
    case "KeyU":
      instance.viewer?.selectionManager.HideSelected();
      instance.viewer?.selectionManager.Select();
      instance.viewer?.selectionManager.ShowSelected();
      instance.viewer?.appearance.Render();
      break;
    default:
      break;
  }
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
  max-width: 33%;
  flex: auto 0 0;
}
</style>
