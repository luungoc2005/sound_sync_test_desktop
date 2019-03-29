import net from 'net';
import { SERVER_PING, CLIENT_PONG } from '../messaging/actionTypes';
import { mixedTypeAnnotation } from '@babel/types';
import { EventEmitter } from 'events';

const TCP_HOST = '127.0.0.1';
const KEEP_ALIVE_INTERVAL = 500; // in ms

export class TcpServer extends EventEmitter {
  port: number = 8090;
  server: net.Server;

  connectedClients: tcpConnection[] = []
  
  constructor(port: number = 8090) {
    super();
    this.port = port
  }

  start = () => {
    this.server = net.createServer()
    this.server.listen(this.port, TCP_HOST, () => {
      console.log(`TCP Server listening on ${TCP_HOST}:${this.port}`);
    })

    // event handlers
    this.server.on('connection', (socket) => {
      socket.on('close', 
        () => this.remove(socket.remoteAddress, socket.remotePort)
      )
      const newConnection = new tcpConnection(socket)
      this.connectedClients.push(newConnection)
    })

    return this;
  }

  stop = () => {
    if (this.server) {
      this.server.close(() => {
        console.log('Server shutdown')
      })
    }
    return this;
  }

  remove = (remoteAddress, remotePort) => {
    const clientIdx = this.connectedClients
      .map(client => client.socket)
      .findIndex(
        (socket) => socket.remoteAddress === remoteAddress && socket.remotePort === remotePort
      )
    if (clientIdx > -1) {
      this.connectedClients.splice(clientIdx, 1)
      console.log(`Closed connectioned with ${remoteAddress}:${remotePort}`)
    }

    return this;
  }
}

export class TcpConnection extends EventEmitter {
  socket: net.Socket;
  delay: number = 0;
  pingHandle: number = 0;

  constructor(socket: net.Socket) {
    super();
    
    this.socket = socket;

    socket.on('data', (json) => {
      try {
        const data = JSON.parse(json);

        if (data._t && data._t === CLIENT_PONG && data._d) {
          this.delay = new Date().getTime() - data._d;
          this.emit('delaychanged', this.delay);
        }
      }
      catch (ex) {
        console.error(ex)
      }
    })

    this.pingHandle = setTimeout(this.pingClient, KEEP_ALIVE_INTERVAL);

    socket.on('close', clearTimeout(this.pingHandle));
  }

  pingClient = () => {
    socket.write(JSON.stringify({
      _t: SERVER_PING,
      _d: new Date().getTime(),
    }))
    this.pingHandle = setTimeout(this.pingClient, KEEP_ALIVE_INTERVAL);
  }
}