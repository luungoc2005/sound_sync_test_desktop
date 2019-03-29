// @flow
import { 
  CREATE_CLIENT, 
  END_CLIENT, 
  SET_HOSTNAME, 
  PLAYER_OPEN_FILE,
  PLAYER_OPEN_FILE_SUCCESS,
  PLAYER_OPEN_FILE_ERROR,
} from '../actions/player';
import type { Action } from './types';

export default function counter(state = {
  hostname: '',
  channelId: '',
  token: '',
  fileOpening: false,
  fileName: '',
  status: '',
}, action: Action) {
  switch (action.type) {
    case SET_HOSTNAME:
      return {
        ...state,
        hostname: action.hostname,
      };
    case CREATE_CLIENT:
      return {
        ...state,
        channelId: action.channelId,
        token: action.token,
      };
    case END_CLIENT:
      return {
        ...state,
        channelId: '',
        token: '',
      };
    case PLAYER_OPEN_FILE:
      return {
        ...state,
        fileOpening: true,
        fileName: '',
      };
    case PLAYER_OPEN_FILE_SUCCESS:
      return {
        ...state,
        fileOpening: false,
        fileName: action.fileName,
      }
    case PLAYER_OPEN_FILE_ERROR:
      return {
        ...state,
        fileOpening: false,
      }
    default:
      return state;
  }
}
