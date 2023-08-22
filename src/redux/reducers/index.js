import { combineReducers } from 'redux';

import userReducer from './user.js';
import alertReducer from './alert.js';

export const reducers = combineReducers({ 
    user: userReducer,
    alert: alertReducer
});