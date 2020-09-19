import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state, action) {
    const newChannel = action.payload;
    return [...state, newChannel];
  },
}, []);

const currentChannelId = handleActions({
  [actions.changeChannel](state, { payload }) {
    return payload.id;
  },
}, 1);

const messages = handleActions({
  [actions.sendingMessageSucces](state, { payload }) {
    const { data: { attributes } } = payload;
    return [...state, attributes];
  },
}, []);

export default combineReducers({
  channels,
  messages,
  currentChannelId,
});
