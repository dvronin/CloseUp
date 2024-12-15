<template>
    <div class="container">
        <div class="headers">
            <div v-for="(item, index) in tabs" :key="index" @click="ChangeActiveTab(index)"
                :class="(index == activeTabIndex) ? 'active' : ''" class="header" ref="headers">
                {{ item.title }}
            </div>
        </div>
        <div ref="content" class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

const headers: Ref<HTMLDivElement[]> = ref([]);
const tabs: Ref<HTMLDivElement[]> = ref([]);
const content = ref<HTMLDivElement>();

const activeTabIndex = ref(0);


onMounted(() => {
    tabs.value = [...content.value!.querySelectorAll(".tab") as any];
    ChangeActiveTab(0);
});

function ChangeActiveTab(index: number) {
    const activeClassName = "active";

    if (index == activeTabIndex.value) {
        tabs.value[index].classList.add(activeClassName);
        activeTabIndex.value = index;
        return;
    }

    if (headers.value.length != 0) {
        if (headers.value[activeTabIndex.value].classList.contains(activeClassName)) {
            headers.value[activeTabIndex.value].classList.remove(activeClassName)
        }
    }
    if (tabs.value.length != 0) {
        if (tabs.value[activeTabIndex.value].classList.contains(activeClassName)) {
            tabs.value[activeTabIndex.value].classList.remove(activeClassName);
        }
    }
    tabs.value[index].classList.add(activeClassName);
    activeTabIndex.value = index;
}

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.header {
    border: 1px solid var(--color-border);
    padding: 3px 5px;
    cursor: pointer;
}

.headers {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.content {
    height: 100%;
    border: 1px solid var(--color-border);
}

.active {
    background-color: var(--color-accent);
    border-bottom: none;
}
</style>