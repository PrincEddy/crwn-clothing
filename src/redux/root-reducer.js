import {combineReducers} from 'redux';

import UserReducer from './user/user.reducer';
//import { deflate } from 'zlib';


export default combineReducers({
    user:UserReducer
})