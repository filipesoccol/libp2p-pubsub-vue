import { createApp } from 'vue'
import App from './App.vue'
import VueLibp2p from './plugins/vue-libp2p';

createApp(App).use(VueLibp2p).mount('#app')