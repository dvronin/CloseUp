<template>
    <ToonMaterial :material="material" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Material, MeshLambertMaterial } from 'three';
import ToonMaterial from './ToonMaterial.vue';


const props = defineProps<{
    material: Material
}>();
const material = ref<MeshLambertMaterial>(props.material as any);
</script>

<style scoped></style>