# LibP2P + PubSub + Vue + Typescript

A minimal demonstration of how to use `libp2p + pub-sub` with `Vue`. You can send messages to a public chat and also direct to specific peer id.

[Live Demo!](https://filipesoccol.github.io/libp2p-pubsub-vue/)

![screenshot of the js ipfs node id info](https://github.com/filipesoccol/libp2p-pubsub-vue/assets/13040410/0afce13c-1910-40c3-93ea-05237905be18)

This project was bootstrapped with [Vue CLI](https://cli.vuejs.org/).

## Installation and running Client

First clone this repo, install dependencies in the project root and build the project.

```sh
$ git clone https://github.com/filipesoccol/libp2p-pubsub-vue
$ cd libp2p-pubsub-vue
$ npm install
$ npm run dev
```

## Installation and running Relay

```sh
$ git clone https://github.com/filipesoccol/libp2p-pubsub-vue
$ cd libp2p-pubsub-vue
$ npm install
$ node relay
```

### Signaling Servers are important

Verify signaling servers in case two peers not seen each other.
[Check here](https://github.com/filipesoccol/libp2p-pubsub-vue/blob/c4f92ebefdb6750f5ec0ab883c8a738d76b23f9a/src/plugins/vue-libp2p.js#L17)

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
