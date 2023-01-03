import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DataLayer } from './context/data.context';
import reducer, { initialState } from './context/data.reducer';

ReactDOM.render(
    <React.StrictMode>
        <DataLayer initialState={initialState} reducer={reducer}>
            <App />
        </DataLayer>
    </React.StrictMode>,
    document.getElementById('root')
);
