import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state, action) {
    const newChannel = action.payload;
    return [...state, newChannel];
  },
  [actions.removeChannelSucces](state, action) {
    const { payload: { id: removedChannelId } } = action;
    return state.filter(({ id }) => id !== removedChannelId);
  },
  [actions.renameChannelSucces](state, { payload }) {
    const { data: { id, attributes: { name } } } = payload;
    const copyState = state.slice();
    const renamedChannel = copyState.find((channel) => channel.id === id);
    renamedChannel.name = name;
    return copyState;
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
  [actions.removeChannelSucces](state, action) {
    const { payload: { id } } = action;
    return state.filter(({ channelId }) => channelId !== id);
  },
}, []);

const modalsUIState = handleActions({
  [actions.modalsDisable]() {
    return 'disabled';
  },
  [actions.modalAddEnable]() {
    return 'add';
  },
  [actions.modalRemoveEnable](_state, { payload }) {
    const { id } = payload;
    return { id, state: 'remove' };
  },
  [actions.modalRenameEnable](_state, { payload }) {
    const { id } = payload;
    return { id, state: 'rename' };
  },
}, 'disabled');

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  modalsUIState,
});
