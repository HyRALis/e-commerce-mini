import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './Reducers/rootReducer';

const initialState = {};

const middleWare = [thunk];

const reduxStore = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default reduxStore;
