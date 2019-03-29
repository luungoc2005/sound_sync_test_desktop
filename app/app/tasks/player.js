import extractAudio from 'ffmpeg-extract-audio';
import { parseFile } from 'music-metadata';
import nanoid from 'nanoid';
import request from 'request-promise';
import fs from 'fs';
import path from 'path';
import { ipcMain } from 'electron';
import { dialog } from 'electron';
import { 
  PLAYER_OPEN_FILE, PLAYER_OPEN_FILE_SUCCESS, PLAYER_OPEN_FILE_ERROR,
  PLAYER_ACTION, 
} from './actionTypes';
import { DEFAULT_SERVER_ADDRESS } from '../../constants';
import io from 'socket.io-client';
import { eventNames } from 'cluster';

ipcMain.on('redux_dispatch', (event, action) => {
  switch (action.type) {
    case PLAYER_OPEN_FILE:
      playerOpenFile(action);
      break;
    case PLAYER_ACTION:
      handlePlayerAction(action);
      break;
  }
})

let mainWindow;
let ioClient;
let channelId;
let token;

const playerOpenFile = (args) => {
  if (mainWindow) {
    dialog.showOpenDialog(mainWindow, {
      filters: [
        { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
      ],
      properties: [
        'openFile'
      ],
    }, (filePaths) => {
      if (filePaths && filePaths.length) {
        openFile(filePaths[0], args);
      }
    });
  }
}

const openFile = async (fileName, args) => {
  try {
    const audioId: string = nanoid();
    const outputFile = `_tmp/${audioId}.mp3`;
    
    await extractAudio({
      input: fileName,
      output: outputFile,
    })

    if (fs.existsSync(outputFile)) {
      // TODO: This is unoptimal

      const metadata = await parseFile(outputFile, { 
        duration: true
      });

      const req = request.post(`${DEFAULT_SERVER_ADDRESS}/player/start`)
      const form = req.form();
      const fileStream = fs.createReadStream(outputFile);

      if (args) {
        Object.keys(args).forEach(key => form.append(key, args[key]));
      }
      form.append('fileName', path.basename(fileName));
      form.append('duration', metadata.format.duration);
      form.append('media', fileStream);

      const resp = await req;
      console.log(resp);

      fileStream.close();
      fs.unlinkSync(outputFile); // remove the file;

      // connect to master namespace
      channelId = args.channelId;
      token = args.token;

      ioClient = io(`${DEFAULT_SERVER_ADDRESS}/${channelId}-master`)

      mainWindow.webContents.send('dispatch', {
        type: PLAYER_OPEN_FILE_SUCCESS,
        fileName,
      })
    }
    else {

    }
  }
  catch (err) {
    console.error(err)
  }
}

export const eventTypes = {
  action: 'action',
}

export const handlePlayerAction = (origAction) => {
  if (ioClient) {
    console.log(origAction);
    const { type, action, ...args } = origAction;
    const socketAction = {
      token,
      type: action,
      ...args,
    }
    console.log(socketAction)
    ioClient.emit(eventTypes.action, socketAction)
  }
}

export default {
  initialize: (window) => mainWindow = window
}