import React from 'react';

import { Button } from 'components/Button';
import {
  getOneUserResponse,
  sendUserAnswers,
  sendUserAnswersResponse,
} from 'services/backendRequests';

import styles from './MainForm.module.scss';

type MainFormProps = {
  username: string;
  task: getOneUserResponse;
  recieveNewTask: VoidFunction;
};

const MainForm: React.FC<MainFormProps> = ({
  username,
  task,
  recieveNewTask,
}) => {
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
      ...userLetters.map((l, i) =>
        i !== index ? l : event.target.value.toLowerCase()
      ),
    ]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (task) {
      sendUserAnswers({
        username,
        userAnswers: task?.map(
          (
            wordItem: { word: { incorrectWord: string; id: string } },
            index
          ) => {
            const userAnswer = wordItem.word.incorrectWord.replace(
              /-/,
              userLetters[index]
            );

            return {
              userAnswer: userAnswer,
              id: wordItem.word.id,
            };
          }
        ),
      }).then(setAnswers);
    }
  };

  const handleNewTask: React.MouseEventHandler<HTMLButtonElement> = () => {
    setUserLetters(userLetters.map(() => ''));
    setAnswers(null);
    recieveNewTask();
  };

  return (
    <form onSubmit={handleSubmit}>
      <ol className={styles.MainForm__wordsList}>
        {task?.map((w: { word: { incorrectWord: string } }, index) => {
          const wordParts = w.word.incorrectWord.split('-');
          return (
            <li key={w.word.incorrectWord}>
              {wordParts[0]}
              <input
                type="text"
                className={styles.MainForm__lettersInput}
                value={userLetters[index]}
                onChange={(event) => handleChange(event, index)}
                disabled={!!answers}
              />
              {wordParts[1]}
              {answers && (
                <span>
                  {' \u2192 '}
                  {answers[index].correct ? (
                    <span className={styles.MainForm__checkResult_correct}>
                      OK
                    </span>
                  ) : (
                    <span className={styles.MainForm__checkResult_incorrect}>
                      {answers[index].correctWord}
                    </span>
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <div className={styles.MainForm__buttonsBlock}>
        <Button
          type="submit"
          className={styles.MainForm__submitButton}
          disabled={!!answers}
        >
          Готово
        </Button>
        <Button
          onClick={handleNewTask}
          className={styles.MainForm__newWordsButton}
          disabled={!answers}
        >
          Новые слова
        </Button>
      </div>
    </form>
  );
};

export default MainForm;
