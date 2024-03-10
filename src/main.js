import './assets/main.css';

import {createApp} from 'vue';
import App from './App.vue';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";

library.add(...[
    faAngleRight
]);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
