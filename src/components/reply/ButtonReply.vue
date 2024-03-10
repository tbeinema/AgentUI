<script setup lang="ts">
import {WoolReply} from '@/types/WoolTypes.js';
import {PropType} from 'vue';

defineProps({
  reply: {
    required: true,
    type: Object as PropType<WoolReply>,
  },
});
</script>

<template>
  <button type="submit" class="btn btn-primary m-1">
    {{ reply.replyType === 'AUTOFORWARD' ? 'Continue' : reply.statement }}
  </button>
</template>
