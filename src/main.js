import './assets/main.scss';

import {createApp} from 'vue';
import App from './App.vue';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faAngleRight, faCircleNotch, faRedo, faTimes} from '@fortawesome/free-solid-svg-icons';
import DialogueManager from '@/lib/DialogueManager';

library.add(...[
    faAngleRight,
    faCircleNotch,
    faRedo,
    faTimes,
]);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(DialogueManager, {
    // This is where you can change the loaded dialogue, which resides in src/dialogues
    dialogueFile: 'basic',
});
app.mount('#app');
