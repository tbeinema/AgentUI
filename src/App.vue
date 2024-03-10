<!-- First, we have some code to interact with the Wool library, which helps us read the dialogue script and execute the dialogue. -->
<script setup>
import {computed, ref} from 'vue'
// CHANGE THE DIALOGUE FILE USED BY ADAPTING THE FILE NAME BELOW (leave the ?raw!).
import dialogue from '@/dialogues/input-types.wool?raw';

// Create the WOOL server
const server = new _wool.DirectServer();

// This loads the dialogue from the .wool file
const dialogueId = 'your-dialogue';
server.loadDialogue(dialogueId, dialogue);

const dialogueSteps = ref([]);
const pushDialogueStep = step => {
  console.log('Adding dialogue step', step);
  dialogueSteps.value.push(step);
  console.log(server.getNode().pendingActions);
};

// This starts the dialogue with the "Start" node, and inserts in into the step history
const startDialogue = () => pushDialogueStep(server.startDialogue({
  dialogueId,
  startNodeId: 'Start',
  keepVars: true,
  externalVars: {},
}));
startDialogue();

// Reference to the latest inserted step, so that we can display it
const currentStep = computed(() => dialogueSteps.value[dialogueSteps.value.length - 1]);
const inputText = ref('');

// Method to submit a chosen reply, so that we can get the next step in the dialogue
const progressDialogue = replyId => {
  const parameters = {
    replyId,
    replyIndex: 0,
    textInput: inputText.value !== '' ? inputText.value : undefined
  };
  server.parseActionsBeforeProgress(parameters);
  pushDialogueStep(server.progressDialogue(parameters));

  // Clear input for next step
  inputText.value = '';
}

// Easily restart the complete dialogue (for example, when it has ended)
const restart = () => {
  dialogueSteps.value = [];
  startDialogue();
}

// State shortcuts (as we use these checks in multiple places and we don't want to clutter the template below)
const isEnded = computed(() => currentStep.value.id === 'End');
</script>

<!-- This is where we display the agent statement and reply buttons. -->
<template>
  <div id="interaction-boxes">
    <div id="agent-box" class="agent-spacing">
      <template v-if="isEnded"><i>Dialogue ended.</i></template>
      <template v-else-if="currentStep.pendingActions.length > 0">
        {{ currentStep.statement }}
        <div class="media-box" v-for="pendingAction in currentStep.pendingActions">
          <template v-if="pendingAction.type === 'image'">
            <img :src="'./src/assets/images/' + pendingAction.value" :alt="pendingAction.value">
          </template>
          <template v-else-if="pendingAction.type === 'video'">
            <iframe width="95%" style="aspect-ratio: 16/9" :src="pendingAction.value" title="YouTube Video"
                    frameborder="0" allow="web-share" allowfullscreen></iframe>
          </template>
        </div>
      </template>
      <template v-else>{{ currentStep.statement }}</template>
    </div>

    <div class="d-flex flex-wrap justify-content-end">
      <div id="reply-box" class="reply-spacing" v-for="reply in currentStep.replies">
        <form @submit.prevent="progressDialogue(reply.replyId)">
          <div class="ïnput-reply" v-if="reply.replyType === 'TEXTINPUT'">
            <div class="input-group">
              <span class="input-group-text">{{ reply.beforeStatement }}</span>
              <input type="text" class="form-control" v-model="inputText">
              <span class="input-group-text">{{ reply.afterStatement }}</span>
              <button class="btn btn-primary m1" type="submit">
                <font-awesome-icon icon="angle-right"/>
              </button>
            </div>
          </div>
          <button v-else type="submit" class="btn btn-primary m1">
            {{ reply.replyType === 'AUTOFORWARD' ? 'Continue' : reply.statement }}
          </button>
        </form>
      </div>

      <button v-if="isEnded" @click="restart()" class="btn btn-warning m-1">
        Restart
      </button>
    </div>
  </div>
</template>

<style scoped>

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

.agent-spacing {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.media-box img {
  padding-top: 5px;
  padding-bottom: 5px;
  max-width: 95%;
  max-height: 95%;
}

.reply-spacing {
  margin: 0.3rem;
}

</style>
