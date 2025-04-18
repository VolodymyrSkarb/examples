import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import toDoApi from './api/api';
import {Provider} from 'react-redux';
import { setupStore } from './store';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

toDoApi.setBaseUrl(process.env.REACT_APP_BASE_URL || 'http://localhost:5000');

const store = setupStore();

root.render(
  <Provider store={store} >
    <BrowserRouter>
      {/*// <React.StrictMode>*/}
      <App />
      {/*// </React.StrictMode>*/}
    </BrowserRouter>
  </ Provider>
);
