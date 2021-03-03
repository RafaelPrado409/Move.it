import { useContext } from "react";
import { challengeContext } from "../contexts/ChallengeContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/CompletedChallenges.module.css";
import stylesLight from "../styles/components/CompletedChallengesLight.module.css";

export default function CompletedChallenges() {
  const { challengesCompleted } = useContext(challengeContext);
  const { darkTheme } = useContext(CountdownContext);

  return (
    <div
      className={
        darkTheme
          ? styles.completedChallengesContainer
          : stylesLight.completedChallengesContainer
      }
    >
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
