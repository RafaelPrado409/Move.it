import { useContext } from "react";
import { challengeContext } from "../contexts/ChallengeContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/ChallengeBox.module.css";
import stylesLight from "../styles/components/ChallengeBoxLight.module.css";

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(
    challengeContext
  );

  const { resetCountdown, darkTheme } = useContext(CountdownContext);

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div
      className={
        darkTheme
          ? styles.challengeBoxContainer
          : stylesLight.challengeBoxContainer
      }
    >
      {activeChallenge ? (
        <div
          className={
            darkTheme ? styles.challengeActive : stylesLight.challengeActive
          }
        >
          <header>Ganhe {activeChallenge.amount} XP</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={
                darkTheme
                  ? styles.challengeFailedButton
                  : stylesLight.challengeFailedButton
              }
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={
                darkTheme
                  ? styles.challengeSucceededButton
                  : stylesLight.challengeSucceededButton
              }
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div
          className={
            darkTheme
              ? styles.challengeNotActive
              : stylesLight.challengeNotActive
          }
        >
          <strong>Finalize um ciclo para receber um desafio.</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}
