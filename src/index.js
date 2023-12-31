import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import "./style/style.css"
const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>,
);