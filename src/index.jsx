import React from 'react';
import { render } from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';

import '../assets/application.scss';
import gon from 'gon';
import App from './components/App.jsx';

// import faker from 'faker';
// @ts-nocheck
// import cookies from 'js-cookie';

// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

render(<App gon={gon} />, document.getElementById('chat'));
