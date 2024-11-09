<template>
    <div class="container" :style="setDirection()">
        <div class="content" :style="style" ref="content">
            <slot></slot>
        </div>
        <div class="separator" :class="props.direction">
            <div class="separator-area" @mousedown="onMouseDown($event)"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';


const props = defineProps<{
    direction?: "up" | "down" | "left" | "right",
}>();

function setDirection(): string {
    switch (props.direction) {
        case "down":
        case undefined:
            return "flex-direction: column";
        case "up":
            return "flex-direction: column-reverse";
        case "left":
            return "flex-direction: row-reverse";
        case "right":
            return "flex-direction: row";
        default:
            return "flex-direction: column";
    }
}

const style = ref("");
const content: Ref<HTMLElement | null> = ref(null);

let grabbed = false;
let pos: { x: number, y: number } = { x: 0, y: 0 };
function onMouseDown(event: MouseEvent) {
    grabbed = true;
    pos = { x: event.clientX, y: event.clientY };
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp);
}
function onMouseMove(event: MouseEvent) {
    if (grabbed) {
        if (props.direction == 'up' || props.direction == "down") {
            let yOffset = event.clientY - pos.y;
            if (props.direction == 'up')
                yOffset = -yOffset;
            style.value = `height:${content.value!.offsetHeight + yOffset}px`;
            pos.y = event.clientY;
        }
        else {
            let xOffset = event.clientX - pos.x;
            if (props.direction == 'left')
                xOffset = -xOffset;
            style.value = `width:${content.value!.offsetWidth + xOffset}px`;
            pos.x = event.clientX;
        }
    }
}
function onMouseUp(event: MouseEvent) {
    grabbed = false;
    document.body.removeEventListener("mousemove", onMouseMove);
    document.body.removeEventListener("mouseup", onMouseUp);
}

</script>

<style scoped>
.container {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.content {
    flex: 1 0 0;
    overflow: auto;
}

.separator {
    background-color: var(--color-border);
    user-select: none;
    position: relative;
    display: flex;
    align-items: baseline;
    justify-content: center;
}

.down {
    flex-direction: column;
}

.up {
    flex-direction: column-reverse;
}

.right {
    flex-direction: row;
}

.left {
    flex-direction: row-reverse;
}

.down,
.up {
    height: 2px;
    width: 100%;
    cursor: n-resize;
}

.left,
.right {
    width: 2px;
    height: 100%;
    cursor: e-resize;
}

.separator-area {
    position: absolute;
    width: 500%;
    height: 500%;
}

.separator-area:hover {
    background-color: var(--color-accent);

}
</style>