import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import routes from './routes'
import configureStore from './store/configureStore';

const initialState  = window.__PRELOADED_STATE__|| {};

const store = configureStore(initialState);

ReactDOM.render(
   <Provider store={store}>
     <Router routes={ routes } history={ browserHistory } />
  </Provider>,document.getElementById('main')
)
