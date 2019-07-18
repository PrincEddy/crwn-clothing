
import  UserActionType  from './user.type';

export const setCurrentUSer = user => ({
    type:UserActionType.SET_CURRENT_USER,
    payload:user
});