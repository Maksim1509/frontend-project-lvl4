// @ts-nocheck

import React from 'react';
import { render } from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import App from './components/App.jsx';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';

// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

render(<App gon={gon}/>, document.getElementById('chat'));
