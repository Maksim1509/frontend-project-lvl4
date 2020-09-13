import React from 'react';
import { render } from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import '../assets/application.scss';
import gon from 'gon';

import App from './components/App.jsx';
import rootReducer from './reducers';

// import faker from 'faker';
// @ts-nocheck
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

const preloadedState = {
  channels: gon.channels,
  messages: gon.messages,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: [thunk],
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
