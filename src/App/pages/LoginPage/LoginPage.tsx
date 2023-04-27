import React from 'react';

import { useNavigate } from 'react-router-dom';
import { login } from 'services/backendRequests';

import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const [username, setUsername] = React.useState<string>('');
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (username === 'admin') {
      navigate('/admin');
    } else {
      login({ username: username }).then((response) => {
        if (response) {
          localStorage.setItem('username', username);
          navigate('/');
        } else alert('Такого пользователя не существует.');
      });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">Фамилия:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button type="submit" className={styles.LoginPage__submitButton}>
        Продолжить
      </button>
    </form>
  );
};

export default LoginPage;
