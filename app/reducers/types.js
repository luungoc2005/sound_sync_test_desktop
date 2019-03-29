import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type counterStateType = {
  +counter: number
};

export type playerStateType = {
  channelId: string;
  token: string;
}

export type Action = {
  +type: string
};

export type GetState = () => counterStateType | playerStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
