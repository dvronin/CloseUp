<template>
  <Layout>
    <template #header>
      <Header v-if="viewerReady" />
    </template>
    <template #main>
      <aside class="element">
        <Sidebar direction="left">
          <Resizer direction="right">
            <TreeView v-if="model != null" :items="treeItems" />
            <div class="placeholder" v-else>Load model to see tree</div>
          </Resizer>
        </Sidebar>
      </aside>
      <Viewer />
      <aside class="element">
        <Sidebar direction="right">
          <Resizer direction="left">
            <component :is="sidebarItems[selectedSidebarItem]"></component>
          </Resizer>
        </Sidebar>
      </aside>
    </template>
    <template #footer>
      footer
    </template>
  </Layout>
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
import ViewSettings from './components/settings/viewSettings/ViewSettings.vue';
import { ViewFitType, ViewType } from 'm3dv';
import Layout from './components/layout/Layout.vue';
import Properties from './components/properties/Properties.vue';
import PlaneSettings from './components/settings/planeSettings/PlaneSettings.vue';
import ExplodeSettings from './components/settings/explodeSettings/ExplodeSettings.vue';
import MaterialSettings from './components/settings/materialSettings/MaterialSettings.vue';
import AppSettings from './components/settings/appSettings/AppSettings.vue';

const model = ref<Object3D | null>(null);
const treeItems = ref<Object3D[]>([]);
const viewerReady = ref(false);
const sidebarItems: any = {
  Properties,
  ViewSettings,
  PlaneSettings,
  ExplodeSettings,
  MaterialSettings,
  AppSettings
};

const selectedSidebarItem = ref<string>("Properties");

onMounted(() => {
  if (instance.viewer != null) {
    instance.viewer.addListener("loaded", onModelLoad);
    viewerReady.value = true;
  }
  instance.helper.addListener("sidebar-change", ChangeSidebarItem);
  window.addEventListener("keydown", onKeyDown);
})

function onModelLoad() {
  model.value = instance.viewer!.sceneManager.modelManager.model;
  treeItems.value.length = 0;
  treeItems.value.push(...model.value.children);
}

function ChangeSidebarItem(value: string) {
  if (sidebarItems[value] != undefined) {
    selectedSidebarItem.value = value;
  }
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
aside {
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 33%;
  flex: auto 0 0;
}

.placeholder {
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
