import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faPen, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

// Añadir iconos a la biblioteca
library.add(faPen, faTrash, faSave, faTimes);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
