import React from 'react';

import { addNewUser } from 'services/backendRequests';

import styles from './AddNewUser.module.scss';

const AddNewUserForm: React.FC = () => {
  const [username, setUsername] = React.useState<string>('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async () => {
    try {
      setUsername('');
      const resp = await addNewUser({ username });
      alert('Ученик ' + resp.username + ' успешно создан.');
    } catch (e: unknown) {
      alert(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button type="submit">Создать ученика</button>
    </form>
  );
};

export default AddNewUserForm;
