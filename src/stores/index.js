import { compose, createStore, applyMiddleware } from 'redux';
import asyncMiddleware from 'redux-async';
import { devTools } from 'redux-devtools';
import rootReducer from 'reducers';
import storeEnhancer from 'redux-history-transitions';

let createStoreWithMiddleware;


export default function configureStore (initialState, history) {
  if (DEBUG) {
    createStoreWithMiddleware = compose(applyMiddleware(asyncMiddleware), storeEnhancer(history),
                                devTools())(createStore);
    // createStoreWithMiddleware = applyMiddleware(asyncMiddleware
    // )(createStore);
  } else {
    createStoreWithMiddleware = compose(applyMiddleware(asyncMiddleware),
    storeEnhancer(history))(createStore);
  }
  const store = createStoreWithMiddleware(rootReducer, initialState);
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}