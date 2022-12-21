import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { persistor, store } from './App/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from "react-router-dom"
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </PersistGate>
  </Provider>
);

