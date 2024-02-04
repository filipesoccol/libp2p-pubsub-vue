<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import { Libp2p, PubSub, Message } from "@libp2p/interface";
import { fromString, toString } from "uint8arrays";

const messagesRef = ref<HTMLElement | null>(null);
const status = ref<string>("Connecting to Relay...");
const id = ref<string>("");
const message = ref<string>("");
const peer = ref<string>("");
const messages = ref<string[]>([]);

const startLibP2p = inject("startLibP2p") as () => Promise<Libp2p>;
const libp2p = ref<Libp2p | null>(null);
const pubsub = ref<PubSub | null>(null);

onMounted(async () => {
  libp2p.value = await startLibP2p();
  pubsub.value = libp2p.value.services.pubsub as PubSub;
  const topic = "ourRoom";
  pubsub.value.subscribe(topic);
  status.value = "Relay connected.";
  id.value = libp2p.value.peerId.toString();
  pubsub.value.addEventListener("message", (event: CustomEvent<Message>) => {
    const topic = event.detail.topic;
    if (topic == "_peer-discovery._p2p._pubsub") return;
    messages.value.push(toString(event.detail.data));
    if (messagesRef.value)
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
  });
});

const sendMessage = async () => {
  if (!pubsub.value) return;
  await pubsub.value.publish("ourRoom", fromString(message.value));
  message.value = "";
};
</script>

<template>
  <div class="ipfs-info">
    <form v-on:submit.prevent="sendMessage">
      <div id="messages" ref="messagesRef" class="messages">
        <p v-for="(m, idx) in messages" :key="idx">{{ m }}</p>
      </div>
      <input
        size="50"
        v-model="message"
        placeholder="Write something and press enter."
      /><br />
      <input
        size="50"
        v-model="peer"
        placeholder="Fill target Peer for direct message."
      />
      <input type="submit" />
    </form>
    <h4>{{ status }}</h4>
    <h5>ID: {{ id }}</h5>
  </div>
</template>

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
