/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes';

const defaultId = 1;

const channelSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: defaultId,
  },
  reducers: {
    addChannel(state, action) {
      const newChannel = action.payload;
      state.channels.push(newChannel);
    },
    removeChannel: (state, { payload }) => {
      const { id: removedChannelId } = payload;
      state.channels = state.channels.filter(({ id }) => id !== removedChannelId);
      state.currentChannelId = defaultId;
    },
    renameChannel: (state, { payload }) => {
      const { data: { id, attributes: { name } } } = payload;
      const renamedChannel = state.channels.find((channel) => channel.id === id);
      renamedChannel.name = name;
    },
    changeChannel(state, { payload }) {
      const { id } = payload;
      state.currentChannelId = id;
    },
  },
});

const useChannelActions = () => {
  const addChannelRequest = async (name) => {
    const data = { attributes: { name } };
    await axios.post(routes.channelsPath(), { data });
  };

  const removeChannelRequest = async (id) => {
    const params = { id };
    await axios.delete(routes.channelPath(id), { params });
  };

  const renameChannelRequest = async (id, name) => {
    const data = { attributes: { name } };
    await axios.patch(routes.channelPath(id), { data }, { params: { id } });
  };

  return {
    addChannelRequest,
    removeChannelRequest,
    renameChannelRequest,
  };
};

const actions = { ...channelSlice.actions };

export { actions, useChannelActions };
export default channelSlice.reducer;
