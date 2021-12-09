import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import rootstore from './redux/store.js';

import { PersistGate } from 'redux-persist/lib/integration/react'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootstore.store}>
      <PersistGate persistor={rootstore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
