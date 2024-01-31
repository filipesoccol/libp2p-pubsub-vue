<script setup lang="ts">
import IpfsInfo from "./components/IpfsInfo.vue";
</script>

<template>
  <div id="app">
    <img id="libp2p-logo" alt="IPFS logo" src="./assets/libp2p-logo.png" />
    <IpfsInfo />
  </div>
</template>

<style>
body {
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#libp2p-logo {
  height: 10rem;
  margin: 24px;
}
</style>
