<template>
    <div class="actions">
        <div>Sections</div>
        <button @click="instance.helper.emit(`sidebar-change`, `PlaneSettings`)"><img class="icon" src="/gear.svg"
                alt=""></button>
        <div class="separator"></div>
        <div>Explode</div>
        <button @click="instance.helper.emit(`sidebar-change`, `ExplodeSettings`)"><img class="icon" src="/gear.svg"
                alt=""></button>
        <div class="separator"></div>
        <div>Materials</div>
        <button @click="instance.helper.emit(`sidebar-change`, `MaterialSettings`)"><img class="icon" src="/gear.svg"
                alt=""></button>
        <div class="separator"></div>
        <div>Preferences</div>
        <button @click="instance.helper.emit(`sidebar-change`, `AppSettings`)"><img class="icon" src="/gear.svg"
                alt=""></button>
    </div>
</template>

<script setup lang="ts">
import { instance } from '../../../instance/instance';

</script>

<style scoped></style>