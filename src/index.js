import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. Import the router
import App from './App';
import "./index.css";
import 'flowbite';
import {ScrollToTop} from "./components";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. Wrap your App here */}
      <ScrollToTop/>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);