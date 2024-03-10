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
  <div class="w-100 py-1">
    <iframe
        width="100%" style="aspect-ratio: 16/9" :src="action.value" title="YouTube Video"
        frameborder="0" allow="web-share" allowfullscreen></iframe>
  </div>
</template>

<style scoped>

</style>
