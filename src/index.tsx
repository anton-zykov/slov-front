import React from 'react';

import ReactDOM from 'react-dom/client';
import 'styles/styles.module.scss';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
