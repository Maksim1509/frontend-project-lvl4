import React from 'react';
import { render } from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import gon from 'gon';
import 'bootstrap';
import '../assets/application.scss';
import App from './components/App.jsx';
import reducer, { actions } from './slices';
import { userName, UserNameContext } from './userName-context';

// @ts-nocheck

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const preloadedState = {
  channelInfo: {
    channels: gon.channels,
    currentChannelId: gon.currentChannelId,
  },
  messagesInfo: {
    messages: gon.messages,
  },
};

const store = configureStore({
  reducer,
  preloadedState,
});

const socket = io();
socket.on('newMessage', (data) => {
  store.dispatch(actions.addMessage(data));
});
socket.on('newChannel', ({ data: { attributes } }) => {
  store.dispatch(actions.addChannel(attributes));
});
socket.on('removeChannel', ({ data: { id } }) => {
  store.dispatch(actions.removeChannel({ id }));
});
socket.on('renameChannel', (data) => {
  store.dispatch(actions.renameChannel(data));
});

render(
  <Provider store={store}>
    <UserNameContext.Provider value={userName}>
      <App />
    </UserNameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
