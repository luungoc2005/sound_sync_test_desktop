import os from 'os';
import player from './tasks/player';
import { SET_HOSTNAME } from '../actions/player';

let mainWindow;

export const initialize = (window) => {
  mainWindow = window;
  mainWindow.webContents.send('dispatch', {
    type: SET_HOSTNAME,
    hostname: os.hostname(),
  })
  player.initialize(mainWindow);
}