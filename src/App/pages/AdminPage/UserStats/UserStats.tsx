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
      <ol>
        {userStats
          .sort((a, b) => b.frequency - a.frequency)
          .map((wordAndFreq) => (
            <li key={wordAndFreq.word.id}>
              {wordAndFreq.word.correctWord + ', ' + wordAndFreq.frequency}
            </li>
          ))}
      </ol>
      <ul>
        {userTrainingTimes.slice(0, 5).map((training) => (
          <li key={String(training.date)}>
            {training.date.toDateString() +
              ' ' +
              training.date.getHours() +
              ':' +
              training.date.getMinutes()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserStats;
