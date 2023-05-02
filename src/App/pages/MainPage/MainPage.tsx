import React from 'react';

import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
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
      <div className={styles.MainPage}>
        <MainForm
          username={username}
          task={task}
          recieveNewTask={recieveNewTask}
        />
        <Button
          onClick={handleLogout}
          className={styles.MainPage__logoutButton}
        >
          Сменить пользователя
        </Button>
      </div>
    );
  }

  return <Loader />;
};

export default MainPage;
