import React from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './AdminPage.module.scss';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
      <div>This is an admin page.</div>
      <button onClick={handleLogout}>Выход</button>
    </div>
  );
};

export default AdminPage;
