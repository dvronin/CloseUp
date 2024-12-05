<template>
    <dialog ref="dialog">
        <div class="popup theme">
            <HeaderedGroup class="container">
                <template #header>
                    <h1>Help</h1>
                </template>
                <template #content>
                    <details open>
                        <summary>
                            <h2>Keyboard shortcuts</h2>
                        </summary>
                        <div class="grid-list content">
                            <div>Fit in view (full model/selected parts)</div>
                            <div class="shortcut"><kbd>F</kbd></div>
                            <div>Select/Unselect multiple objects</div>
                            <div class="shortcut"><kbd>Shift</kbd></div>
                            <div>Select all</div>
                            <div class="shortcut"><kbd>Ctrl</kbd> + <kbd>A</kbd></div>
                            <div>Unselect all</div>
                            <div class="shortcut"><kbd>U</kbd></div>
                            <div>Hide selected</div>
                            <div class="shortcut"><kbd>H</kbd></div>
                            <div>Show selected</div>
                            <div class="shortcut"><kbd>S</kbd></div>
                            <div>Isolate selected</div>
                            <div class="shortcut"><kbd>I</kbd></div>
                        </div>
                    </details>
                    <details>
                        <summary>
                            <h2>About</h2>
                        </summary>
                        <div class="content">CloseUp 3D viewer powered by <a target="_blank"
                                href="https://github.com/123Wampir/m3dv">m3dv</a> library.<br>
                            It provides basic viewer experience and implements some features like cutting planes and
                            exploded views.<br>
                            CloseUp also have powerful material editor which allows to change appearance of your
                            model.<br>
                            There's still a lot of thing i would like to implement in this project (Ex. viewcube,
                            texture manager, recreate my old animation <a target="_blank"
                                href="https://github.com/123Wampir/CADAnimation">app</a>, ray-tracing and more and
                            more).<br>
                            Stay tuned <span class="theme">🌵🌵🌵</span>
                        </div>
                    </details>
                </template>
            </HeaderedGroup>
            <button autofocus @click="dialog?.close()">Close (Esc)</button>
        </div>
    </dialog>
</template>

<script lang="ts" setup>
import HeaderedGroup from '@/components/shared/HeaderedGroup.vue';
import { useTemplateRef } from 'vue';

const dialog = useTemplateRef('dialog');


</script>

<style scoped>
dialog {
    position: fixed;
    border: none;
    color: var(--color-text);
    background-color: transparent;
    width: 100%;
    height: 100%;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 99999;
    max-width: 100%;
    max-height: 100%;
}

dialog::backdrop {
    backdrop-filter: blur(10px);
}

.popup {
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 90%;
    background-color: var(--color-main);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    padding: 1rem;
    margin: auto;
}

.container {
    overflow: auto;
}

.grid-list {
    display: grid;
    grid-template-columns: 1fr auto;
}

.content {
    margin: 5px;
    text-align: justify;
    color: var(--color-text);
}

.grid-list>* {
    margin: 5px 0;
}

.shortcut {
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatar {
    height: 4rem;
}

kbd {
    background-color: var(--color-main);
    border-radius: 3px;
    border: 1px solid var(--color-border);
    box-shadow:
        0 1px 1px rgba(0, 0, 0, 0.2),
        0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
    color: var(--color-text);
    display: inline-block;
    font-size: 0.85em;
    font-weight: 700;
    line-height: 1;
    padding: 2px 4px;
    white-space: nowrap;
    height: fit-content;
}

h1,
h2,
h3 {
    font-size: revert;
    display: inline;
}


@media (max-width: 800px) {
    .popup {
        width: 90%;
    }
}
</style>