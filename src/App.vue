<!-- First, we have some code to interact with the Wool library, which helps us read the dialogue script and execute the dialogue. -->
<script setup lang="ts">
import Replies from '@/components/Replies.vue';
import Statement from '@/components/Statement.vue';
import {useDialogManager} from '@/lib/DialogueManager';

const {errorMessage, isLoaded} = useDialogManager();
</script>

<!-- This is where we display the agent statement and reply buttons. -->
<template>
  <div id="interaction-boxes">
    <template v-if="errorMessage !== null">
      <div class="d-flex">
        <div class="pe-2 text-danger">
          <font-awesome-icon icon="times"/>
        </div>
        <div>{{errorMessage}}</div>
      </div>


    </template>
    <template v-else-if="isLoaded">
      <Statement/>
      <Replies/>
    </template>

    <div v-else>
      <font-awesome-icon icon="circle-notch" spin/>
      Loading...
    </div>
  </div>
</template>

<style scoped>
#interaction-boxes {
  max-width: 30rem;
  margin: 3rem 0;
}

@media screen and (min-width: 1024px) {
  #interaction-boxes {
    margin: 10rem 3rem;
  }
}
</style>
