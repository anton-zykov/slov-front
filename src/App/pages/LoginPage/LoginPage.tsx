import React from 'react';

import { Button } from 'components/Button';
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
    <div className={styles.LoginPage}>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Фамилия:</label>
        <input
          type="text"
          className={styles.LoginPage__usernameInput}
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Button type="submit" className={styles.LoginPage__submitButton}>
          Продолжить
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
