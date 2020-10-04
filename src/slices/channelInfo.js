/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import i18next from 'i18next';
import routes from '../routes';

const defaultChannelId = 1;

const channelSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: defaultChannelId,
  },
  reducers: {
    addChannel(state, action) {
      const newChannel = action.payload;
      state.channels.push(newChannel);
    },
    removeChannel: (state, { payload }) => {
      const { id: removedChannelId } = payload;
      state.channels = state.channels.filter(({ id }) => id !== removedChannelId);
      state.currentChannelId = defaultChannelId;
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
    try {
      await axios.post(routes.channelsPath(), { data });
    } catch (e) {
      toast.error(i18next.t(e.message));
    }
  };

  const removeChannelRequest = async (id) => {
    const params = { id };
    try {
      await axios.delete(routes.channelPath(id), { params });
    } catch (e) {
      toast.error(i18next.t(e.message));
    }
  };

  const renameChannelRequest = async (id, name) => {
    const data = { attributes: { name } };
    try {
      await axios.patch(routes.channelPath(id), { data }, { params: { id } });
    } catch (e) {
      toast.error(i18next.t(e.message));
    }
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
