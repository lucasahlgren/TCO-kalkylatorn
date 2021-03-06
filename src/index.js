import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

/* Redux */
import {createStore} from 'redux';
import allReducers from './redux/reducers';
import {Provider} from 'react-redux';
import {loadState, saveState} from "./data/localStorage";

const localStorageState = loadState()

const store = createStore(allReducers, localStorageState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {saveState(store.getState())})


ReactDOM.render(   
    <BrowserRouter>
    <Provider store={store} >
        <App />
    </Provider>
    </BrowserRouter> ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
