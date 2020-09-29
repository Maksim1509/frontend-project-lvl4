import { combineReducers } from 'redux';

import messagesInfo, { actions as messagesInfoActions, useSendMessageActions } from './messagesInfo';
import channelInfo, { actions as channelInfoActions, useChannelActions } from './channelInfo';
import modal, { actions as modalActions } from './modal';

export default combineReducers({
  messagesInfo,
  channelInfo,
  modal,
});

const actions = {
  ...messagesInfoActions,
  ...channelInfoActions,
  ...modalActions,
};

const asyncActions = {
  useSendMessageActions,
  useChannelActions,
};

export {
  actions,
  asyncActions,
};
