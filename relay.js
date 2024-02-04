
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { circuitRelayServer } from '@libp2p/circuit-relay-v2'
import { identify } from '@libp2p/identify'
import { mplex } from '@libp2p/mplex'
import { webSockets } from '@libp2p/websockets'
import * as filters from '@libp2p/websockets/filters'
import { pubsubPeerDiscovery } from '@libp2p/pubsub-peer-discovery'
import { createLibp2p } from 'libp2p'
import { gossipsub } from '@chainsafe/libp2p-gossipsub'
import { tcp } from '@libp2p/tcp'
import { floodsub } from '@libp2p/floodsub'

const server = await createLibp2p({
  addresses: {
    listen: ['/ip4/127.0.0.1/tcp/41835/ws']
  },
  transports: [
    webSockets({
      filter: filters.all
    }),
    tcp()
  ],
  peerDiscovery: [
    pubsubPeerDiscovery({
        interval: 1000
    })
  ],
  connectionEncryption: [noise()],
  connectionGater: {
    denyDialMultiaddr: () => {
      // by default we refuse to dial local addresses from browsers since they
      // are usually sent by remote peers broadcasting undialable multiaddrs and
      // cause errors to appear in the console but in this example we are
      // explicitly connecting to a local node so allow all addresses
      return false
    }
  },
  streamMuxers: [yamux(), mplex()],
  services: {
	pubsub: floodsub(),
    identify: identify(),
    relay: circuitRelayServer({
      reservations: {
        maxReservations: Infinity
      }
    })
  },
  connectionManager: {
    minConnections: 0
  }
})

server.addEventListener('peer:discovery',( evt ) => {
    const peer = evt.detail
    console.log(`Discovered: ${peer.id}`)
})

console.log('Relay listening on multiaddr(s): ', server.getMultiaddrs().map((ma) => ma.toString()))