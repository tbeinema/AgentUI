<script setup lang="ts">
import ButtonReply from '@/components/reply/ButtonReply.vue';
import TextualReply from '@/components/reply/TextualReply.vue';
import {useDialogManager} from '@/lib/DialogueManager';
import {ref, watch} from 'vue';

const {
  currentStep: step,
  isEnded,
  progressDialogue,
  restart,
} = useDialogManager();

// Define input models
const inputValue = ref('');

// Clear inputs when the current step changes
watch(step, () => inputValue.value = '');
</script>

<template>
  <div class="d-flex flex-wrap justify-content-end">
    <form
        v-for="(reply, replyIndex) in step.replies"
        @submit.prevent="progressDialogue(reply.replyId, replyIndex, inputValue)">
      <TextualReply
          v-if="['TEXTINPUT', 'NUMERICINPUT'].includes(reply.replyType)"
          v-model="inputValue"
          :reply="reply"/>
      <ButtonReply
          v-else
          :reply="reply"/>
    </form>

    <button
        v-if="isEnded"
        class="btn btn-warning m-1"
        @click="restart()">
      <font-awesome-icon icon="redo"/>
      Restart
    </button>
  </div>
</template>
