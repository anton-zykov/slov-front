import React from 'react';

import { HashRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
