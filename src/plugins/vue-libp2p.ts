import { gossipsub } from '@chainsafe/libp2p-gossipsub'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2'
import { dcutr } from '@libp2p/dcutr'
import { identify } from '@libp2p/identify'
import { webRTC } from '@libp2p/webrtc'
import { webSockets } from '@libp2p/websockets'
import * as filters from '@libp2p/websockets/filters'
import { createLibp2p } from 'libp2p'
import { pubsubPeerDiscovery } from '@libp2p/pubsub-peer-discovery'
import { Connection } from '@libp2p/interface'
import { multiaddr } from '@multiformats/multiaddr'

interface Options {
  proxyMultiaddrs: string
}

const plugin = {
  install: async (app: any, options: Options) => {
    const startLibP2p = async function () {
      const libp2p = await createLibp2p({
        addresses: {
          listen: [
            // create listeners for incoming WebRTC connection attempts on on all
            // available Circuit Relay connections
            '/webrtc'
          ]
        },
        transports: [
          // the WebSocket transport lets us dial a local relay
          webSockets({
            // this allows non-secure WebSocket connections for purposes of the demo
            filter: filters.all
          }),
          // support dialing/listening on WebRTC addresses
          webRTC(),
          // support dialing/listening on Circuit Relay addresses
          circuitRelayTransport({
            // make a reservation on any discovered relays - this will let other
            // peers use the relay to contact us
            discoverRelays: 1
          }),
        ],
        // a connection encrypter is necessary to dial the relay
        connectionEncryption: [noise()],
        // a stream muxer is necessary to dial the relay
        streamMuxers: [yamux()],
        connectionGater: {
          denyDialMultiaddr: () => {
            // by default we refuse to dial local addresses from browsers since they
            // are usually sent by remote peers broadcasting undialable multiaddrs and
            // cause errors to appear in the console but in this example we are
            // explicitly connecting to a local node so allow all addresses
            return false
          }
        },
        peerDiscovery: [
          pubsubPeerDiscovery()
        ],
        services: {
          pubsub: gossipsub(),
          identify: identify(),
          dcutr: dcutr()
        },
        connectionManager: {
          minConnections: 0
        }
      })

      console.log('Will dial proxy:', options.proxyMultiaddrs)
      await libp2p.dial(multiaddr(options.proxyMultiaddrs));
      console.log('Proxy connected.')

      libp2p.addEventListener('connection:open', (event: CustomEvent<Connection>) => {
        console.log(`Connected to ${event.detail.remotePeer}`)
      })
      libp2p.addEventListener('connection:close', (event: CustomEvent) => {
        console.log(`Disconnected from ${event.detail.remotePeer}`)
      })
      libp2p.addEventListener('peer:discovery', async (evt) => {
        const peer = evt.detail
        console.log(`Discovered ${peer.id}`)
        if (peer.multiaddrs.length === 0) return
        console.log(`Dialing to ${peer.id}`)
        await libp2p.dial(peer.multiaddrs)
      })
      // update listening addresses
      libp2p.addEventListener('self:peer:update', () => {
        const multiaddrs = libp2p.getMultiaddrs()
        console.log('Listening on:', multiaddrs)
      })
      return libp2p
    }

    app.provide('startLibP2p', startLibP2p)
  }
}

export default plugin
