<template>
    <div class="group">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.group {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 2px 4px;
}

.header {
    font-size: 120%;
    /* border-bottom: 1px solid var(--color-border); */

}
</style>