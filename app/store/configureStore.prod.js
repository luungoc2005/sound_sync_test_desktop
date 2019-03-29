// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { ipcMiddleware } from '../utils/ipcMiddleware';
import createRootReducer from '../reducers';
import type { counterStateType } from '../reducers/types';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router, ipcMiddleware);

function configureStore(initialState?: counterStateType) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
