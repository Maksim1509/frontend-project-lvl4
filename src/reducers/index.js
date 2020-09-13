import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state, action) {
    const newChannel = action.payload.channel;
    return [...state, newChannel];
  },
}, []);

const messages = handleActions({
  [actions.sendingMessageSucces](state, { payload }) {
    const { data: { attributes: { message, id } } } = payload;
    console.log(payload);
    return [...state, { message, id }];
  },
}, []);

export default combineReducers({
  channels,
  messages,
});
