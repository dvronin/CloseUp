<template>
    <TabControl>
        <TabItem title="Enviroment">
            <EnviromentSettings />
        </TabItem>
        <TabItem title="Selection">
            <SelectionSettings />
        </TabItem>
    </TabControl>
</template>

<script setup lang="ts">
import TabControl from '../../shared/TabControl.vue';
import TabItem from '../../shared/TabItem.vue';
import EnviromentSettings from './enviromentSettings/EnviromentSettings.vue';
import SelectionSettings from './selectionSettings/SelectionSettings.vue';

</script>

<style scoped></style>