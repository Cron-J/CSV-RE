import { compose, createStore, applyMiddleware } from 'redux';
import asyncMiddleware from 'redux-async';
import { devTools } from 'redux-devtools';
import rootReducer from 'reducers';
import reduxasynctransitions from 'redux-async-transitions';

let createStoreWithMiddleware;


export default function configureStore (initialState, history) {
  if (DEBUG) {
    createStoreWithMiddleware = compose(applyMiddleware(asyncMiddleware), reduxasynctransitions(history),
                                devTools())(createStore);
    // createStoreWithMiddleware = applyMiddleware(asyncMiddleware
    // )(createStore);
  } else {
    createStoreWithMiddleware = compose(applyMiddleware(asyncMiddleware),
        reduxasynctransitions(history))(createStore);
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