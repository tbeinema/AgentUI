<script setup lang="ts">
import ImageAction from '@/components/action/ImageAction.vue';
import YoutubeAction from '@/components/action/YoutubeAction.vue';
import {useDialogManager} from '@/lib/DialogueManager';

const {currentStep: step, isEnded} = useDialogManager();
</script>

<template>
  <div id="agent-box" class="p-2 mb-1">
    <span v-if="isEnded" class="fst-italic">Dialogue ended.</span>
    <span v-else>{{ step.statement }}</span>

    <div class="media-box" v-for="pendingAction in step.pendingActions">
      <ImageAction :action="pendingAction" v-if="pendingAction.type === 'image'"/>
      <YoutubeAction :action="pendingAction" v-else-if="pendingAction.type === 'video'"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/variables';

#agent-box {
  background-color: lighten($secondary, 30%);
  border-color: $secondary;
  border-style: solid;
  border-radius: $border-radius;
  border-width: 3px;
  min-height: 8rem;
}
</style>
