<template>
  <div class="ipfs-info">
    <img class="ipfs-logo" alt="IPFS logo" src="../assets/logo.svg" />
    <form v-on:submit.prevent="sendMessage">
      <div id="messages" class="messages">
        <p v-for="(m,idx) in messages" :key="idx">{{ m }}</p>
      </div>
      <input size="50" v-model="message" placeholder="Write something and press enter."/><br>
      <input size="50" v-model="peer" placeholder="Fill target Peer for direct message."/>
      <input type="submit">
    </form>
    <h4>{{ status }}</h4>
    <h5>ID: {{ id }}</h5>
  </div>
</template>

<script>
import { pipe } from 'it-pipe'
import { createEd25519PeerId } from '@libp2p/peer-id-factory'
import { inject } from 'vue'

export default {
  name: "IpfsInfo",
  data: function() {
    return {
      status: "Connecting to IPFS...",
      id: "",
      message: "",
      peer: "",
      messages: [],
      libp2p: {}
    };
  },
  mounted: function() {
    this.startPubsub();
  },
  methods: {
    async startPubsub() {
      this.libp2p = await inject('startLibP2p')();
      window.libp2p = this.libp2p
      this.id = await createEd25519PeerId()
      console.log(this.id.toString())
      this.libp2p.pubsub.addEventListener('message', (message) => {
        this.messages.push(`${message.detail.topic}:`, new TextDecoder().decode(message.detail.data));
        var elem = document.getElementById('messages');
        elem.scrollTop = elem.scrollHeight;
      })
    },
    sendMessage () {
        this.libp2p.pubsub.publish('ourNews', new TextEncoder().encode('this.message'))
        this.message = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ipfs-logo {
  height: 10rem;
}
.messages {
  display: flex;
  flex-direction: column;
  flex-flow: column;
  align-items: center;
  overflow-y: scroll;
  max-height: 300px;
}
.messages p {
  max-width: 300px;
}

</style>