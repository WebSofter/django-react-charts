import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import "./App.css";
import PageTop from "./pages/PageTop";
import PageBottom from "./pages/PageBottom";
import PageSettings from "./pages/PageSettings";
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
//import Tailwind from 'primereact/passthrough/tailwind';
import { twMerge } from 'tailwind-merge';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css'

function App() {
  const data: any = [];
  return (
    <PrimeReactProvider value={{ unstyled: false, }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PageTop data={data} />} />
          <Route path="/top" element={<PageTop data={data} />} />
          <Route path="/bottom" element={<PageBottom data={data} />} />
          <Route path="/settings" element={<PageSettings data={data} />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
