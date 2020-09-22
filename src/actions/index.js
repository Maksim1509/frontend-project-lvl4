import { createAction } from 'redux-actions';
import axios from 'axios';

import routes from '../routes';

export const addChannel = createAction('CHANNEL_ADDED');

export const addChannelRequest = (name) => async () => {
  const data = { data: { attributes: { name } } };
  await axios.post(routes.channelsPath(), data);
};

export const changeChannel = createAction('CHANNEL_CHANGE');

export const sendingMessageRequest = createAction('MESSAGE_SENDING_REQUEST');
export const sendingMessageSucces = createAction('MESSAGE_SENDING_SUCCES');
export const sendingMessageFailure = createAction('MESSAGE_SENDING_FAILURE');

export const sendingMessage = (channelId, message, userName) => async () => {
  const data = { data: { attributes: { message: message.message, userName } } };
  await axios.post(routes.channelMessagesPath(channelId), data);
};

export const modalsDisable = createAction('MODALS_DESABLED');
export const modalAddEnable = createAction('MODAL_ADD_ENABLED');
export const modalRemoveEnable = createAction('MODAL_REMOVE_ENABLED');
export const modalRenameEnable = createAction('MODAL_RENAME_ENABLED');

export const removeChannel = (id) => async () => {
  await axios.delete(routes.channelPath(id), { params: { id } });
};

export const removeChannelSucces = createAction('CHANEL_REMOVED');

export const renameChannel = (id, name) => async () => {
  const data = { data: { attributes: { name } } };
  console.log(id, data);
  await axios.patch(routes.channelPath(id), data, { params: { id } });
};

export const renameChannelSucces = createAction('CHANNEL_RENAMED');
