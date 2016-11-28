import App from './components/app';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/store';


const store = configureStore();

const anchor = document.createElement('div');
anchor.id = 'upword-anchor';

document.body.insertBefore(anchor, document.body.childNodes[0]);

render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('upword-anchor'));
