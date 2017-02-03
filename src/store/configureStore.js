'use strict';

import {createStore, applyMiddleware,compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';


export default function configureStore(initialState={}) {



  const enhancer = compose(
  	applyMiddleware(thunk )
  )

const store = createStore(rootReducer,initialState, enhancer);




  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducer').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store;
}
