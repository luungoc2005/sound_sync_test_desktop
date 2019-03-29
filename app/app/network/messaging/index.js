import actionTypes, { NetworkActions } from './actionTypes';
import { DataVariable } from './dataTypes';

interface INetworkMessage {
  type: NetworkActions;
  toBuffer(): Buffer;
}

class NetworkMessage implements INetworkMessage {
  constructor(type: NetworkActions, data: DataVariable[]) {
    this.type = type
    this.data = data
  }

  toBuffer = () => {
    
  }
}