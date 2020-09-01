import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore} from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/rootReducer";

const store = createStore(rootReducer);

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

ReactDom.render(app, document.getElementById('root'));

