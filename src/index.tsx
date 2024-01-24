import { createRoot } from 'react-dom/client';
import AppIndex from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './contexts/AuthContexts';
import React from 'react';
import ActivityListProvider from '@contexts/ActivityListContext';

const container = document.getElementById('root');
const root = container && createRoot(container);
root?.render(
  // <React.StrictMode>
  <AuthProvider>
    <ActivityListProvider>
      <AppIndex />
    </ActivityListProvider>
  </AuthProvider>
  // </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
