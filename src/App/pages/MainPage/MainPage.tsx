import React from 'react';

import { useNavigate } from 'react-router-dom';
import { getOneUser, getOneUserResponse } from 'services/backendRequests';

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

  const [task, setTask] = React.useState<getOneUserResponse | null>(null);
  const recieveNewTask = () => {
    getOneUser({ username }).then(setTask);
  };

  React.useEffect(recieveNewTask, []);

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  if (task) {
    return (
      <div>
        <MainForm
          username={username}
          task={task}
          recieveNewTask={recieveNewTask}
        />
        <button onClick={handleLogout}>Сменить пользователя</button>
      </div>
    );
  }

  return <div>Задание загружается...</div>;
};

export default MainPage;
