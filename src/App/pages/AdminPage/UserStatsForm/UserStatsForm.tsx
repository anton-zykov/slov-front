import React from 'react';

import { getOneUser, getOneUserResponse } from 'services/backendRequests';

import styles from './UserStatsForm.module.scss';

type UserStatsFormProps = {
  setUserStats: React.Dispatch<React.SetStateAction<getOneUserResponse>>;
};

const UserStatsForm: React.FC<UserStatsFormProps> = ({ setUserStats }) => {
  const [username, setUsername] = React.useState<string>('');
  const [onlyHighFrequency, setOnlyHighFrequency] =
    React.useState<boolean>(true);
  const [highFrequencyLevel, setHighFrequencyLevel] =
    React.useState<number>(15);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const response = await getOneUser({ username, all: true });
      setUserStats(
        onlyHighFrequency
          ? response.filter((w) => w.frequency > highFrequencyLevel)
          : response
      );
    } catch (e: unknown) {
      alert(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            type="checkbox"
            checked={onlyHighFrequency}
            onChange={() => setOnlyHighFrequency(!onlyHighFrequency)}
          />
          Показывать только слова с частотой больше{' '}
          <input
            type="text"
            value={highFrequencyLevel}
            onChange={(event) =>
              setHighFrequencyLevel(Number(event.target.value))
            }
          />
          .
        </label>
      </div>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button type="submit">Поиск ученика</button>
    </form>
  );
};

export default UserStatsForm;
