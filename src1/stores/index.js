import { compose, createStore } from 'redux';
import asyncMiddleware from 'redux-async-transitions';
import { devTools } from 'redux-devtools';
import rootReducer from 'reducers';

let createStoreWithMiddleware;

export default function configureStore (initialState, history) {
  if (DEBUG) {
    createStoreWithMiddleware = compose(asyncMiddleware(history),
                                devTools())(createStore);
  } else {
    createStoreWithMiddleware = compose(asyncMiddleware(history))(createStore);
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