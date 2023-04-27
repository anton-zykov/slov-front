import React from 'react';

import { HashRouter, Route, Routes } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
