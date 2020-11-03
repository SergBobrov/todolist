import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import {Provider} from "react-redux";
import {store} from "./state/store";
import {App} from "./App";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
