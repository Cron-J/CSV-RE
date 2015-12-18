import React     from 'react';
import ReactDOM  from 'react-dom';
import Root      from 'containers/Root';
import configureStore from '../stores';
import createHistory from 'history/lib/createBrowserHistory';

import { useQueries } from 'history';

const history = useQueries(createHistory)();

const target = document.getElementById('root');
const store  = configureStore(window.__INITIAL_STATE__, history);

const node = <Root routerHistory={history} store={store}/>;
ReactDOM.render(node, target);
