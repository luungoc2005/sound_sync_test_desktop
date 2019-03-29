
export const ADDR_BROADCAST = 'ADDR_BROADCAST';
export const SERVER_PING = 'PING';
export const CLIENT_PONG = 'PONG';

export type NetworkActions = 
  | typeof SERVER_PING 
  | typeof CLIENT_PONG

export default {
  [SERVER_PING]: 0,
  [CLIENT_PONG]: 1,
}