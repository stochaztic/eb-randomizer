import React from 'react';
import  { hydrate, render } from 'react-dom';
import './normalize.css';
import './skeleton.css';
import './index.css';
import App from './App';

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
