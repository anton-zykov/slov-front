import React from 'react';

import {
  getOneUserResponse,
  getOneUserTrainingTimesResponse,
} from 'services/backendRequests';

type UserStatsProps = {
  userStats: getOneUserResponse;
  userTrainingTimes: getOneUserTrainingTimesResponse;
};

const UserStats: React.FC<UserStatsProps> = ({
  userStats,
  userTrainingTimes,
}) => {
  return (
    <div>
      <ul>
        {userStats.map((wordAndFreq) => (
          <li key={wordAndFreq.word.id}>
            {wordAndFreq.word.correctWord +
              ', частота ' +
              wordAndFreq.frequency}
          </li>
        ))}
      </ul>
      <ul>
        {userTrainingTimes.map((training) => (
          <li key={String(training.date)}>
            {training.date.toDateString() + ' ' + training.date.toTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserStats;
