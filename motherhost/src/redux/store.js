import {applyMiddleware, createStore} from 'redux';
import {mainReducer} from './Reducer';
import thunk from 'redux-thunk';

export const Store = createStore(mainReducer, applyMiddleware(thunk));
