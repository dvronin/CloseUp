<template>
    <header>
        <slot name="header"></slot>
    </header>
    <main>
        <slot name="main"></slot>
    </main>
    <footer class="element">
        <slot name="footer"></slot>
    </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
main {
    flex: auto 1 0;
    width: auto;
    height: 0%;
    display: flex;
    flex-direction: row;
}
</style>