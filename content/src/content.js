import App from './components/app';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

const proxyStore = new Store({portName: 'upword'});

const anchor = document.createElement('div');
anchor.id = 'upword-anchor';

document.body.insertBefore(anchor, document.body.childNodes[0]);

render(
  <Provider store={proxyStore}>
    <App/>
  </Provider>
  , document.getElementById('upword-anchor'));
