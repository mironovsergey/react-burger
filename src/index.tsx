import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';

import { store } from './services/store';

import App from './components/app/app';

const root = ReactDOM.createRoot(
    document.getElementById('app-root') as HTMLDivElement
);

root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);