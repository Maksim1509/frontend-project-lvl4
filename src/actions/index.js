import { createAction } from 'redux-actions';
import axios from 'axios';

import routes from '../routes';

export const addChannel = createAction('CHANNEL_ADD');
export const changeChannel = createAction('CHANNEL_CHANGE');
export const test = '';

export const sendingMessageRequest = createAction('MESSAGE_SENDING_REQUEST');
export const sendingMessageSucces = createAction('MESSAGE_SENDING_SUCCES');
export const sendingMessageFailure = createAction('MESSAGE_SENDING_FAILURE');

export const sendingMessage = (channelId, message, userName) => async () => {
  const data = { data: { attributes: { message: message.message, userName } } };
  await axios.post(routes.channelMessagesPath(channelId), data);
  // dispatch(sendingMessageSucces(response.data));
};
