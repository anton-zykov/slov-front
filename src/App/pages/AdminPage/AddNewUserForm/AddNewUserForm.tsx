import React from 'react';

import { Button } from 'components/Button';
import { addNewUser, assignWordsBasedOnAge } from 'services/backendRequests';

import styles from './AddNewUser.module.scss';

const AddNewUserForm: React.FC = () => {
  const [username, setUsername] = React.useState<string>('');
  const [age, setAge] = React.useState<number | null>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      if (!username || !age) throw new Error('Имя и класс должны быть указаны');

      const resp = await addNewUser({ username });
      for (let i = age; i > 0; i--) {
        await assignWordsBasedOnAge({
          username,
          age: i,
          frequency: 10 - age + i >= 3 ? 10 - age + i : 3,
        });
      }
      setUsername('');
      setAge(null);
      alert('Ученик ' + resp.username + ' успешно создан.');
    } catch (e: unknown) {
      alert(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Фамилия
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Класс
        <input
          type="number"
          value={age ? age : ''}
          onChange={(event) => setAge(Number(event.target.value))}
        />
      </label>
      <Button type="submit">Создать ученика</Button>
    </form>
  );
};

export default AddNewUserForm;
