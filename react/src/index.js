import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom'
import './index.css';
// import App from './components/app/App';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css'

import { SciChartSurface, SciChart3DSurface } from "scichart";

export const API_URL = "http://127.0.0.1:8000/api/students/"
export const API_STATIC_MEDIA = "http://localhost:8000/"
// export const API_URL = "http://192.168.56.101:1337/api/students/"
// export const API_STATIC_MEDIA = "http://192.168.56.101:1337/"

SciChartSurface.loadWasmFromCDN();
SciChart3DSurface.loadWasmFromCDN();

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    // <BrowserRouter>
      <App />
    // </BrowserRouter>
    // </React.StrictMode>,
);

reportWebVitals();
