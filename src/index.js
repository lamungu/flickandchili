import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux'

/**
 * This creates the store by doing the following:
 * 1. It fetches the master Reducer in /reducers/index.js, which combines
 *    all of the smaller reducers into one, single source of truth
 *
 * 2. It applies the Thunk Middleware. This pretty much allows us to make
 *    AJAX calls within Redux actions without it throwing errors
 */
const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),

);

/**
 * This history is a copy of the History API within
 * HTML5, along with added Redux capabilities.
 */
const history = createHistory();

// Provider:
// He's responsible to binding the whole store to the application. We are then able to fetch
// the information by using the `connect` function afterwards within the child components.
ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
