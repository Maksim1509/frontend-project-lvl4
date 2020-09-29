/* eslint-disable no-param-reassign */

import { createAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const removeChannel = createAction('removeChannel');

const slice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload }) => {
      const { data: { attributes } } = payload;
      state.messages.push(attributes);
    },
  },
  extraReducers: {
    [removeChannel]: (state, { payload }) => {
      const { id } = payload;
      state.messages = state.messages.filter(({ channelId }) => channelId !== id);
    },
  },
});

const useSendMessageActions = () => {
  const sendMessage = async ({ currentChannelId, message, userName }) => {
    const data = {
      attributes: {
        message, userName,
      },
    };
    await axios.post(routes.channelMessagesPath(currentChannelId), { data });
  };
  return {
    sendMessage,
  };
};

const actions = { ...slice.actions };

export { actions, useSendMessageActions };
export default slice.reducer;
