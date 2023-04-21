import React from 'react';

import { useNavigate } from 'react-router-dom';

import MainForm from './MainForm';
import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  if (!username) {
    setTimeout(() => navigate('/login'), 3000);
    return (
      <div>
        Вы не вошли в аккаунт, через 3 секунды вы будете перенаправлены на
        страницу входа.
      </div>
    );
  }

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
      <MainForm username={username} />
      <button onClick={handleLogout}>Сменить пользователя</button>
    </div>
  );
};

export default MainPage;
