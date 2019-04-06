import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import './index.css';
import App from './containers/app-container';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
