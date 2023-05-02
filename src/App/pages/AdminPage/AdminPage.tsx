import React from 'react';

import { Button } from 'components/Button';
import { useNavigate } from 'react-router-dom';
import {
  getOneUserResponse,
  getOneUserTrainingTimesResponse,
} from 'services/backendRequests';

import AddNewUserForm from './AddNewUserForm';
import styles from './AdminPage.module.scss';
import UserStats from './UserStats';
import UserStatsForm from './UserStatsForm';

const AdminPage: React.FC = () => {
  const [userStats, setUserStats] = React.useState<getOneUserResponse>([]);
  const [userTrainingTimes, setUserTrainingTimes] =
    React.useState<getOneUserTrainingTimesResponse>([]);
  const navigate = useNavigate();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className={styles.adminPage}>
      <h3>Добавить нового ученика</h3>
      <AddNewUserForm />
      <h3>Статистика по ученику</h3>
      <UserStatsForm
        setUserStats={setUserStats}
        setUserTrainingTimes={setUserTrainingTimes}
      />
      <UserStats userStats={userStats} userTrainingTimes={userTrainingTimes} />
      <Button onClick={handleLogout}>Выход</Button>
    </div>
  );
};

export default AdminPage;
