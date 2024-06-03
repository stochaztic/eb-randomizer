import React from 'react';
import  { createRoot } from 'react-dom/client';
import './normalize.css';
import './skeleton.css';
import './index.css';
import App from './App.jsx';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); 
root.render(<App />);