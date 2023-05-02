import React from 'react';

import { Button } from 'components/Button';
import {
  getOneUser,
  getOneUserResponse,
  getOneUserTrainingTimes,
  getOneUserTrainingTimesResponse,
} from 'services/backendRequests';

import styles from './UserStatsForm.module.scss';

type UserStatsFormProps = {
  setUserStats: React.Dispatch<React.SetStateAction<getOneUserResponse>>;
  setUserTrainingTimes: React.Dispatch<
    React.SetStateAction<getOneUserTrainingTimesResponse>
  >;
};

const UserStatsForm: React.FC<UserStatsFormProps> = ({
  setUserStats,
  setUserTrainingTimes,
}) => {
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
      const response2 = await getOneUserTrainingTimes({ username });
      setUserTrainingTimes(
        response2.map((stringDateObj) => ({
          date: new Date(stringDateObj.date),
        }))
      );
    } catch (e: unknown) {
      alert(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.UserStatsForm}>
      <div>
        <label>
          <input
            type="checkbox"
            className={styles.UserStatsForm__checkbox}
            checked={onlyHighFrequency}
            onChange={() => setOnlyHighFrequency(!onlyHighFrequency)}
          />
          Показывать слова с частотой больше{' '}
          <input
            type="number"
            className={styles.UserStatsForm__frequencyLevelInput}
            value={highFrequencyLevel}
            onChange={(event) =>
              setHighFrequencyLevel(Number(event.target.value))
            }
          />
        </label>
      </div>
      <div>
        <label>
          Фамилия
          <input
            type="text"
            className={styles.UserStatsForm__usernameInput}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <Button type="submit" className={styles.UserStatsForm__submitButton}>
        Поиск ученика
      </Button>
    </form>
  );
};

export default UserStatsForm;
