import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { instance } from './instance/instance';
import { ChangeTheme, SetColor, type Settings } from './components/settings/appSettings/settings';

const settings = window.localStorage.getItem("app.settings");
if (settings != null) {
    const settingsObj = JSON.parse(settings) as Settings;
    instance.settings = settingsObj;
}

createApp(App).mount('#app')

SetColor('--color-main', instance.settings.themeColours.main);
SetColor('--color-text', instance.settings.themeColours.text);
SetColor('--color-accent', instance.settings.themeColours.accent);
SetColor('--color-border', instance.settings.themeColours.border);
ChangeTheme(instance.settings.useDarkTheme);
