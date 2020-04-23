import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import Reducers from './Reducers/index'

const reduxRouterMiddleware = routerMiddleware(createBrowserHistory());
const middleware = [
    thunk,
    reduxRouterMiddleware
];

const composeEnhancers =
    typeof window === 'object' &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;


export const store = createStore(
    Reducers,
    composeEnhancers(applyMiddleware(...middleware)),

);