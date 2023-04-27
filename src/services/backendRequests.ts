import axios from 'axios';

const baseURL = 'http://localhost:3003/api/main/';

export type addNewUserProps = {
  username: string;
};

export type addNewUserResponse = {
  username: string;
  id: string;
};

export type loginProps = {
  username: string;
};

export type getOneUserProps = {
  username: string;
  all?: boolean;
};

export type sendUserAnswersProps = {
  username: string;
  userAnswers: {
    userAnswer: string;
    id: string;
  }[];
};

export type getOneUserResponse = {
  frequency: number;
  word: {
    age: number;
    correctWord: string;
    incorrectWord: string;
    id: string;
  };
}[];

export type sendUserAnswersResponse = {
  id: string;
  correct: boolean;
  correctWord: string;
}[];

export const addNewUser = async ({ username }: addNewUserProps) => {
  const response = await axios.post<addNewUserResponse>(baseURL + 'users/', {
    username,
  });
  return response.data;
};

export const login = async ({ username }: loginProps) => {
  const response = await axios.get<boolean>(baseURL + 'users/', {
    params: {
      username: username,
    },
  });
  return response.data;
};

export const getOneUser = async ({
  username,
  all = false,
}: getOneUserProps) => {
  const response = await axios.get<getOneUserResponse>(baseURL, {
    params: {
      username: username,
      all: String(all),
    },
  });

  return response.data;
};

export const sendUserAnswers = async ({
  username,
  userAnswers,
}: sendUserAnswersProps) => {
  const response = await axios.put<sendUserAnswersResponse>(
    baseURL,
    { userWords: userAnswers },
    {
      params: {
        username: username,
      },
    }
  );

  return response.data;
};
