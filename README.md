# LibP2P + PubSub + Vue app

** THIS IS NOT A WORKING PROJECT RIGHT NOW **

A minimal demonstration of how to use `libp2p + pub-sub` with `Vue`. You can send messages to a public chat and also direct to specific peer id.

[Live Demo!](https://filipesoccol.github.io/libp2p-pubsub-vue//)

![screenshot of the js ipfs node id info](./src/assets/ipfs-vue-screenshot.png)

This project was bootstrapped with [Vue CLI](https://cli.vuejs.org/).

## Before you start

First clone this repo, install dependencies in the project root and build the project.

```console
$ git clone https://github.com/filipesoccol/libp2p-pubsub-vue
$ cd libp2p-pubsub-vue
$ npm install
$ npm run build
```

### Compiles and hot-reloads for development

```console
$ npm run serve
```

### Compiles and minifies for production

```console
$ npm run build
```

### Run your deploy to github pages

```console
$ npm run deploy
```

### Run your tests

```console
$ npm run test
```

### Lints and fixes files

```console
$ npm run lint
```

### Signaling Servers are important

Verify signaling servers in case two peers not seen each other.
[Check here](https://github.com/filipesoccol/libp2p-pubsub-vue/blob/c4f92ebefdb6750f5ec0ab883c8a738d76b23f9a/src/plugins/vue-libp2p.js#L17)

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
