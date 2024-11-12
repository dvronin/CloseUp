<template>
    <div class="actions">
        <div>Sections</div>
        <button @click="instance.helper.emit(`sidebar-change`, `PlaneSettings`)"><img class="icon" src="/gear.svg"
                alt=""></button>
        <div class="separator"></div>
        <div>Explode</div>
        <button style="padding: 3px;" @click="instance.helper.emit(`sidebar-change`, `ExplodeSettings`)"><img
                class="icon" src="/gear.svg" alt=""></button>
    </div>
</template>

<script setup lang="ts">
import { instance } from '../../../instance/instance';
import BtnInputFile from '../../../components/shared/BtnInputFile.vue';


</script>

<style scoped></style>