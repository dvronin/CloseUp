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
}

.header {
    font-size: 120%;
}

.content {
    margin-left: px;
    margin: 2px 4px;
}
</style>