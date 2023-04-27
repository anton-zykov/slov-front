import React from 'react';

import { getOneUserResponse } from 'services/backendRequests';

type UserStatsProps = {
  userStats: getOneUserResponse;
};

const UserStats: React.FC<UserStatsProps> = ({ userStats }) => {
  return (
    <ul>
      {userStats.map((wordAndFreq) => (
        <li key={wordAndFreq.word.id}>
          {wordAndFreq.word.correctWord + ', частота ' + wordAndFreq.frequency}
        </li>
      ))}
    </ul>
  );
};

export default UserStats;
