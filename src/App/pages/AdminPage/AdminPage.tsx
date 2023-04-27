import React from 'react';

import { useNavigate } from 'react-router-dom';

import AddNewUserForm from './AddNewUserForm';
import styles from './AdminPage.module.scss';
import UserStatistics from './UserStatistics';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
      <h3>Добавить нового ученика.</h3>
      <AddNewUserForm />
      <h3>Статистика по ученику.</h3>
      <UserStatistics />
      <button onClick={handleLogout}>Выход</button>
    </div>
  );
};

export default AdminPage;
