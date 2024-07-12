import React from 'react';
import './index.scss';
import ReactDOM from 'react-dom/client';
import App from './App';
export const API_URL = "http://127.0.0.1:8000/api/students/"
export const API_STATIC_MEDIA = "http://localhost:8000/"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
