import { createApp } from 'vue'
import App from './App.vue'
import libp2p from './plugins/vue-libp2p';

createApp(App).use(libp2p, {
    // proxyMultiaddrs: '/ip4/138.197.80.162/tcp/41835/ws/p2p/12D3KooWLX9hcAkz6zXJ2RykbWbGLt2xgLUfz9Lq2gStZYxG2v56'
    proxyMultiaddrs: '/ip4/127.0.0.1/tcp/41835/ws/p2p/12D3KooWSem6hAouxkbKTwnUFTThDyNKJZuNabsLyysh33VEDza2'
}).mount('#app')