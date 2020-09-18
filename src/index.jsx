import React from 'react';
import { render } from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import io from 'socket.io-client';

import '../assets/application.scss';
import gon from 'gon';

import App from './components/App.jsx';
import rootReducer from './reducers';
import { sendingMessageSucces } from './actions';

// @ts-nocheck

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);
console.log(gon.currentChannelId);
const preloadedState = {
  channels: gon.channels,
  currentChannelId: gon.currentChannelId,
  messages: gon.messages,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: [thunk],
});

const socket = io();
socket.on('newMessage', (data) => {
  console.log(data);
  store.dispatch(sendingMessageSucces(data));
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);

export default socket;
