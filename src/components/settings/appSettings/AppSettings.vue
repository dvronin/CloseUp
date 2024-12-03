<template>
    <div class="settings">
        <HeaderedGroup>
            <template #header>
                Application settings
            </template>
            <template #content>
                <HeaderedGroup>
                    <template #header>
                        Theme
                    </template>
                    <template #content>
                        <div class="settings-item">
                            <label for="explode-value">Light</label>
                            <BtnToggle v-model="useDarkTheme" @change="OnChangeTheme(useDarkTheme)" />
                            <label for="explode-value">Dark</label>
                        </div>
                        <div class="settings-item">
                            <label for="main-color">Main color</label>
                            <ColorPicker id="main-color" v-model="mainColor"
                                @input="OnColorChange('--color-main', mainColor)" @change="SaveSettings()" />
                        </div>
                        <div class="settings-item">
                            <label for="text-color">Text color</label>
                            <ColorPicker id="text-color" v-model="textColor"
                                @input="OnColorChange('--color-text', textColor)" @change="SaveSettings()" />
                        </div>
                        <div class="settings-item">
                            <label for="accent-color">Accent color</label>
                            <ColorPicker id="accent-color" v-model="accentColor"
                                @input="OnColorChange('--color-accent', accentColor)" @change="SaveSettings()" />
                        </div>
                        <div class="settings-item">
                            <label for="border-color">Border color</label>
                            <ColorPicker id="border-color" v-model="borderColor"
                                @input="OnColorChange('--color-border', borderColor)" @change="SaveSettings()" />
                        </div>
                        <div class="settings-item">
                            <button @click="ResetColours()">Reset colours</button>
                        </div>
                    </template>
                </HeaderedGroup>
            </template>
        </HeaderedGroup>
    </div>
</template>

<script setup lang="ts">
import BtnToggle from '@/components/shared/BtnToggle.vue';
import HeaderedGroup from '@/components/shared/HeaderedGroup.vue';
import SelectControl, { type Option } from '@/components/shared/SelectControl.vue';
import { instance } from '@/instance/instance';
import { onMounted, ref } from 'vue';
import { ChangeTheme, SetColor } from './settings';
import ColorPicker from '@/components/shared/ColorPicker.vue';

const useDarkTheme = ref<boolean>(instance.settings.useDarkTheme);
const mainColor = ref<string>(instance.settings.themeColours.main);
const textColor = ref<string>(instance.settings.themeColours.text);
const accentColor = ref<string>(instance.settings.themeColours.accent);
const borderColor = ref<string>(instance.settings.themeColours.border);

onMounted(() => {

});

function OnChangeTheme(useDarkTheme: boolean) {
    ChangeTheme(useDarkTheme);
    instance.settings.useDarkTheme = useDarkTheme;
    window.localStorage.setItem("app.settings", JSON.stringify(instance.settings));
}

function OnColorChange(name: "--color-main" | "--color-text" |
    "--color-accent" | "--color-border", value: string) {
    SetColor(name, value);
    switch (name) {
        case '--color-main':
            instance.settings.themeColours.main = value;
            mainColor.value = value;
            break;
        case '--color-text':
            instance.settings.themeColours.text = value;
            textColor.value = value;
            break;
        case '--color-accent':
            instance.settings.themeColours.accent = value;
            accentColor.value = value;
            break;
        case '--color-border':
            instance.settings.themeColours.border = value;
            borderColor.value = value;
            break;
        default:
            break;
    }
}

function SaveSettings() {
    window.localStorage.setItem("app.settings", JSON.stringify(instance.settings));
}

function ResetColours() {
    OnColorChange('--color-main', "#eeeeee");
    OnColorChange('--color-text', "#111111");
    OnColorChange('--color-accent', "#118bfe");
    OnColorChange('--color-border', "#d0d0d0");
    SaveSettings();
}

</script>

<style scoped>
.list {
    display: flex;
    flex-direction: row;
}

.list-items {
    flex: 1 1 auto;
    overflow: auto;
}

option {
    background-color: var(--color-main);
    color: var(--color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.controls {
    display: flex;
    flex-direction: column;
}

.selected-plane {
    display: flex;
    flex-direction: row;
}

.plane-name {}
</style>