import { createLibp2p } from 'libp2p'
import { webRTCStar } from '@libp2p/webrtc-star'
import {noise} from "@chainsafe/libp2p-noise"
import { gossipsub } from '@chainsafe/libp2p-gossipsub'

const star = webRTCStar()
const noiseEncryption = noise('test');

const plugin = {
  install: (app, options) => {

    const startLibP2p = async function () {
      const node = await createLibp2p({
        addresses: {
          listen: [
            '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
            '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star'
          ]
        },
        transports: [
          star.transport
        ],
        peerDiscovery: [
          star.discovery
        ],
        connectionEncryption: [
          noiseEncryption
        ],
        pubsub: gossipsub({
          emitSelf: true
        })
      })

      // Listen for new peers
      node.addEventListener('peer:discovery', (peerId) => {
        //console.log(`Found peer ${peerId.detail.id.toString()}`)
      })

      // Listen for new connections to peers
      node.addEventListener('peer:connect', (connection) => {
        // console.log(`Connected to ${connection.remotePeer.toB58String()}`)
        console.log(connection)
        console.log(`Connected to ${connection}`)
      })

      // Listen for peers disconnecting
      node.addEventListener('peer:disconnect', (connection) => {
        console.log(`Disconnected from ${connection.remotePeer.toString()}`)
      })
    
      await node.start()
      return node
    }

    app.provide('startLibP2p', startLibP2p)
  }
}

export default plugin
