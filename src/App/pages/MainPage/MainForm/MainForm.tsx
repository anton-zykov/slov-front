import React from 'react';

import {
  getOneUser,
  getOneUserResponse,
  sendUserAnswers,
  sendUserAnswersResponse,
} from 'services/backendRequests';

import styles from './MainForm.module.scss';

type MainFormProps = {
  username: string;
};

const MainForm: React.FC<MainFormProps> = ({ username }) => {
  const [d, setd] = React.useState<getOneUserResponse | null>(null);

  React.useEffect(() => {
    getOneUser({ username }).then(setd);
  }, []);

  const [userLetters, setUserLetters] = React.useState<string[]>(
    new Array(4).fill('')
  );
  const [answers, setAnswers] = React.useState<sendUserAnswersResponse | null>(
    null
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    setUserLetters([
      ...userLetters.map((l, i) => (i !== index ? l : event.target.value)),
    ]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (d) {
      sendUserAnswers({
        username,
        userAnswers: d?.map(
          (
            wordItem: { word: { incorrectWord: string; _id: string } },
            index
          ) => {
            const userAnswer = wordItem.word.incorrectWord.replace(
              /-/,
              userLetters[index]
            );

            return {
              userAnswer: userAnswer,
              id: wordItem.word._id,
            };
          }
        ),
      }).then(setAnswers);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ol className={styles.MainForm__wordsList}>
        {d?.map((w: { word: { incorrectWord: string } }, index) => {
          const wordParts = w.word.incorrectWord.split('-');
          return (
            <li key={w.word.incorrectWord}>
              {wordParts[0]}
              <input
                type="text"
                className={styles.MainForm__lettersInput}
                value={userLetters[index]}
                onChange={(event) => handleChange(event, index)}
              />
              {wordParts[1]}
              {answers && (
                <span>
                  {' \u2192 ' +
                    (answers[index].correct
                      ? 'OK'
                      : answers[index].correctWord)}
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <button type="submit" className={styles.MainForm__submitButton}>
        Готово
      </button>
    </form>
  );
};

export default MainForm;
