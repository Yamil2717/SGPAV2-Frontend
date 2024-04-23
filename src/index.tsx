import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Si deseas medir el rendimiento de tu aplicaci�n, puedes descomentar la siguiente l�nea
// y pasar una funci�n para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o enviarlos a un punto de an�lisis. Aprende m�s en: https://bit.ly/CRA-vitals
//reportWebVitals();