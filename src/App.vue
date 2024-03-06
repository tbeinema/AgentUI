<script setup>
import {computed, ref} from 'vue'
import dialogue from '@/dialogues/basic.wool?raw';

// Create the WOOL server
const server = new _wool.DirectServer();

// This loads the basic dialogue
const dialogueId = 'your-dialogue';
server.loadDialogue(dialogueId, dialogue);

const dialogueSteps = ref([]);
const pushDialogueStep = step => {
  console.log('Adding dialogue step', step);
  dialogueSteps.value.push(step);
};

// This starts the dialogue with the "Start" node, and inserts in into the step history
const startDialogue = () => pushDialogueStep(server.startDialogue({
  dialogueId,
  startNodeId: 'Start',
  keepVars: true,
  externalVars: {},
}));
startDialogue();

// Reference to the latest inserted step
const currentStep = computed(() => dialogueSteps.value[dialogueSteps.value.length - 1]);

// Method to submit a chosen reply
const progressDialogue = replyId => pushDialogueStep(server.progressDialogue({delay: 1000, replyId, replyIndex: 0}));

// Easily restart the complete dialogue
const restart = () => {
  dialogueSteps.value = [];
  startDialogue();
}

// State shortcuts
const isEnded = computed(() => currentStep.value.id === 'End');
</script>

<template>
  <div id="interaction-boxes">
    <div id="agent-box" class="agent-spacing">
      <template v-if="isEnded">Dialogue ended.</template>
      <template v-else>{{ currentStep.statement }}</template>
    </div>

    <div class="d-flex flex-wrap justify-content-end">
      <button v-for="reply in currentStep.replies" @click="progressDialogue(reply.replyId)" class="btn btn-primary m-1">
        <template v-if="reply.replyType === 'AUTOFORWARD'">Continue</template>
        <template v-else>{{ reply.statement }}</template>
      </button>

      <button v-if="isEnded" @click="restart()" class="btn btn-warning m-1">
        Restart
      </button>
    </div>
  </div>
</template>

<style scoped>
.agent-spacing {
  padding: 0.5rem;
}

#agent-name {
  color: #27567d;
}

#agent-statement {
  color: black;
}

#interaction-boxes {
  max-width: 500px;
  margin: 3rem 0;
}

@media screen and (min-width: 1024px) {
  #interaction-boxes {
    margin: 10rem 3rem;
  }
}

#agent-box {
  background-color: #fcead5;
  border-color: orange;
  border-style: solid;
  border-radius: 10px;
  border-width: 3px;
  min-height: 150px;
}

#reply-box {
  color: black;
}

#user-reply-text {
  background-color: #27567d;
  border-color: lightskyblue;
  border-style: solid;
  border-radius: 10px;
  border-width: 3px;
  color: white;
}

#user-reply-continue {
  background-color: orange;
  border-color: white;
  border-style: solid;
  border-radius: 10px;
  border-width: 3px;
  color: black;
}
</style>
