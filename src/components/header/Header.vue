<template>
    <div class="element container">
        <div class="header">
            <div>Viewer</div>
            <div class="file-name">Model name</div>
            <nav>
                <a href="">git</a>
                <a href="">vk</a>
                <a href="">else</a>
            </nav>
        </div>
        <Menu/>
    </div>
</template>

<script setup lang="ts">
import Menu from './menu/Menu.vue';

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.file-name {}
</style>