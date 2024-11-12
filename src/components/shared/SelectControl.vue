<template>
    <div class="container" v-if="props.size == undefined && props.multiple == false">
        <button class="selected">
            <span>{{ selected.length != 0 ? selected[0].name : " " }}</span>
            <img class="icon" src="/arrow.svg" alt="open\close select">
        </button>
        <div class="list context" :style="`height: ${props.size != undefined ? props.size + 0.0 : ''}lh`">
            <option class="option" v-for="(item, index) in items" :value="item.value" :key="index"
                :selected="item.selected" @mousedown="OnOptionChange($event, item)">
                {{ item.name }}
            </option>
        </div>
    </div>
    <div class="container" v-else>
        <div class="list" :style="`height: ${props.size != undefined ? props.size : ''}lh`">
            <option v-for="(item, index) in items" :value="item.value" :key="index" :selected="item.selected"
                @mousedown="OnOptionChange($event, item)">
                {{ item.name }}
            </option>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue';

export interface Option {
    name: string,
    selected: boolean,
    value: any
}

onMounted(() => {
    selected.value = props.items.filter(item => item.selected == true);
    watchEffect(() => {
        items.value = props.items;
        selected.value = props.items.filter(item => item.selected == true);

    })
})

const selected = ref<Option[]>([]);
const props = defineProps<{
    multiple?: boolean,
    size?: number
    items: Option[]
}>();
const items = ref<Option[]>(props.items);


const emits = defineEmits<{
    change: [value: Option[]]
}>();

function OnOptionChange(event: MouseEvent, value: Option) {
    if (props.multiple && event.shiftKey) {
        value.selected = !value.selected;
    }
    else {
        props.items.forEach(item => item.selected = false);
        value.selected = true;
    }
    selected.value = props.items.filter(item => item.selected == true);
    emits("change", selected.value);
    return false;
}

</script>

<style scoped>
.container {
    width: 100%;
    position: relative;
    flex: 1 0 0;
}

.selected {
    justify-content: space-between;
    margin: 0;
    align-items: center;
    width: 100%;
    line-height: 1rem;
    min-height: 1rem;
}

.context {
    display: none;
    position: absolute;
    left: 0;
    z-index: 999;
}

.list {
    overflow: auto;
    width: 100%;
    border: 1px solid var(--color-border);
    background-color: var(--color-main);
}

.icon {
    transform: rotate(90deg);
}

.container:focus-within>.context {
    display: block;
    box-sizing: border-box;
}

.container:focus-within .icon {
    transform: rotate(270deg);
}

.container:focus-within option[selected] {
    background-color: transparent;
}

.container:focus-within option:hover {
    background-color: var(--color-accent);
}

option {
    width: 100%;
    user-select: none;
    padding: 6px 6px 5px 6px;
    line-height: 1rem;
}

option[selected] {
    background-color: var(--color-accent);
}
</style>