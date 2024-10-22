<template>
    <div class="settings">
        <div class="settings-item">
            <label for="selection-color">Selection color</label>
            <input type="color" name="selection-color" id="selection-color" :value="selectionColor" class="no-filter"
                @input="ChangeSelectionColor($event)">
        </div>
    </div>
</template>

<script setup lang="ts">
import { instance } from '@/instance/instance';
import type { Enviroment, SelectionManager } from 'm3dv';
import { Color } from 'three';
import { onMounted, ref, type Ref } from 'vue';


const selecionManager: Ref<SelectionManager | null> = ref(null);
const selectionColor: Ref<string> = ref("");

onMounted(() => {
    if (instance.viewer != null) {
        selecionManager.value = instance.viewer.selectionManager;
        selectionColor.value = `#${new Color(selecionManager.value.selectionColor).getHexString()}`;

    }
});

function ChangeSelectionColor(event: Event) {
    const hex = (event.target as any).value;
    selecionManager.value?.SetSelectionColor(hex);
    instance.viewer?.appearance.Render();

}
</script>

<style scoped></style>