import { createAction } from 'redux-actions';
import axios from 'axios';

import routes from '../routes';

export const addChannel = createAction('CHANNEL_ADD');
export const test = '';

export const sendingMessageRequest = createAction('MESSAGE_SENDING_REQUEST');
export const sendingMessageSucces = createAction('MESSAGE_SENDING_SUCCES');
export const sendingMessageFailure = createAction('MESSAGE_SENDING_FAILURE');

export const sendingMessage = (channelId, messageText) => async (dispatch) => {
  const data = { data: { attributes: messageText } };
  const response = await axios.post(routes.channelMessagesPath(channelId), data);
  dispatch(sendingMessageSucces(response.data));
};
