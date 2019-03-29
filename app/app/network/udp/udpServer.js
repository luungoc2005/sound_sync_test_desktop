import dgram from 'dgram';
import ip from 'ip';
import os from 'os';
import uuid from 'uuid';
import { ADDR_BROADCAST } from '../messaging/actionTypes';

// class UdpListeningServer {
//   port: number = 8089
//   server

//   constructor(port: number = 8089) {
//     this.port = port
//   }

//   start = () => {
//     this.server = dgram.createSocket('udp4')

//     this.server.on('listening', () => {
//       const address = server.address(); 
//       console.log('UDP Server started and listening on ' + address.address + ":" + address.port);
//     })

//     this.server.bind(this.port)
//     return this
//   }
// }

const BROADCAST_INTERVAL = 5000;
const BROADCAST_PORT = 4545
// const BROADCAST_HOST = '255.255.255.255';
const BROADCAST_HOST = '239.10.10.197';

export class UdpBroadcastClient {
  port: number = BROADCAST_PORT;
  sendHandler: number = 0;
  sender = null;

  constructor(port: number = BROADCAST_PORT) {
    this.port = port
  }

  start = () => {
    this.message = {
      _t: ADDR_BROADCAST,
      id: uuid.v4(),
      name: os.hostname(),
      address: ip.address(),
      port: this.port,
    }
    this.sender = () => this.sendBroadcast(JSON.stringify(this.message));
    this.sendHandler = setTimeout(
      this.sender,
      BROADCAST_INTERVAL
    )
    
    return this;
  }

  stop = () => {
    if (this.sendHandler > 0) clearTimeout(this.sendHandler);
  }

  sendBroadcast = (message: string | any[]) => {
    const client = dgram.createSocket({type: 'udp4', reuseAddr: true});
    
    try {
      client.bind(this.port, () => {
        client.setBroadcast(true);
        client.send(
          message, 0, message.length, this.port, BROADCAST_HOST, 
          (error, bytes) => {
            if (!error) {
              console.log(`(${new Date().getTime()}) Broadcasted message with length ${bytes}`)
              client.close()
  
              if (this.sender) {
                this.sendHandler = setTimeout(
                  this.sender,
                  BROADCAST_INTERVAL
                )
              }
            }
            else {
              console.error(`(${new Date().getTime()}) Broadcast error ${error}`)
            }
          }
        );
      });
    }
    catch (ex) {
      console.error(`(${new Date().getTime()}) Broadcast error ${ex}`)
    }
  }
}