export { 
  PLAYER_OPEN_FILE, 
  PLAYER_OPEN_FILE_SUCCESS, 
  PLAYER_OPEN_FILE_ERROR,
} from '../../app/tasks/actionTypes';

export const SET_HOSTNAME = 'SET_HOSTNAME';
export const CREATE_CLIENT = 'CREATE_CLIENT';
export const END_CLIENT = 'END_CLIENT';

export const MEDIA_ACTIONS = {
  ONPLAY: 0,
  PLAYING: 1,
  SEEKING: 2,
  SEEKED: 3,
  ONPAUSE: 4,
  SYNC: 10,
}