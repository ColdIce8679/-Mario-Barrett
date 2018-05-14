import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { Route, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import * as api from './services/api';
import index from './routes/index';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument({ api }))
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={index}></Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();
