import { initThemeMode } from 'flowbite-react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx'; // Cambia { App } por App

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

initThemeMode();