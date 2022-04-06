import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import homeReducer from './homeReducer';
export default combineReducers({
    global: mainReducer,
    home: homeReducer
});
