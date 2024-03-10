<script setup lang="ts">
import {useDialogManager} from '@/lib/DialogueManager';
import {WoolReply} from '@/types/WoolTypes';
import {PropType, ref, watch} from 'vue';

defineProps({
  reply: {
    required: true,
    type: Object as PropType<WoolReply>,
  },
});

const model = defineModel();

const {currentStep} = useDialogManager();
const inputField = ref<HTMLInputElement>();
watch(currentStep, () => {
  // Refocus input when step has changed
  inputField.value.focus();
});
</script>

<template>
  <div class="input-group">
    <span class="input-group-text">{{ reply.beforeStatement }}</span>
    <input ref="inputField" type="text" class="form-control" v-model="model" autofocus autocomplete="off">
    <span class="input-group-text">{{ reply.afterStatement }}</span>
    <button class="btn btn-primary m1" type="submit">
      <font-awesome-icon icon="angle-right"/>
    </button>
  </div>
</template>
