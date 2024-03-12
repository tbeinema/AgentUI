<script setup lang="ts">
import {WoolPendingAction} from '@/types/WoolTypes';
import {PropType} from 'vue';

defineProps({
  action: {
    required: true,
    type: Object as PropType<WoolPendingAction>,
  },
});
</script>

<template>
  <div class="w-100 py-1 text-center">
    <img
        :src="`./src/dialogues/images/${action.value}`"
        :alt="action.value">
  </div>
</template>

<style scoped>
img {
  max-width: 100%;
  max-height: 30vh;
}
</style>
