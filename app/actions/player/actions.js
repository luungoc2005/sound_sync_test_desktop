import io from 'socket.io-client';
import qs from 'qs';
import { DEFAULT_SERVER_ADDRESS } from '../../constants';
import { 
  PLAYER_OPEN_FILE, PLAYER_ACTION 
} from '../../app/tasks/actionTypes';
import { 
  MEDIA_ACTIONS,
  SET_HOSTNAME, 
  CREATE_CLIENT, 
  END_CLIENT,
} from './index';

export const setHostname = (hostname) => ({ type: SET_HOSTNAME, hostname })

export const createClient = () => {
  return async (dispatch: Dispatch, getState: GetState) => {
    const params = {
      name: getState().player.hostname
    }
    let resp = await fetch(`${DEFAULT_SERVER_ADDRESS}/channels/create?${qs.stringify(params)}`, {
      method: 'POST',
    });
    let data = await resp.text();

    console.log(data);
    dispatch({type: CREATE_CLIENT, ...JSON.parse(data)});
  }
}

export const endClient = () => ({ type: END_CLIENT })

export function startPlayer() {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    dispatch({
      type: PLAYER_OPEN_FILE,
      channelId: state.player.channelId,
      token: state.player.token,
    })
  }
}

const wrapAsync = (fn) => (dispatch: Dispatch, getState: GetState) => 
  fn(dispatch, getState)
    .catch(error => dispatch({ type: 'ERROR', error }))

export const handleOnPlay = (position) => ({ type: PLAYER_ACTION, action: MEDIA_ACTIONS.ONPLAY, position })
export const handleOnPause = (position) => ({ type: PLAYER_ACTION, action: MEDIA_ACTIONS.ONPAUSE, position })
export const handleOnSeeking = (position) => ({ type: PLAYER_ACTION, action: MEDIA_ACTIONS.SEEKING, position })
export const handleOnSeeked = (position) => ({ type: PLAYER_ACTION, action: MEDIA_ACTIONS.SEEKED, position })
export const handleOnSync = (position) => ({ type: PLAYER_ACTION, action: MEDIA_ACTIONS.SYNC, position })