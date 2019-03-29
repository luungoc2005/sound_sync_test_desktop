import { ipcRenderer } from 'electron';

export const ipcMiddleware = store => next => action => {
  ipcRenderer.send('redux_dispatch', action);
  return next(action);
}