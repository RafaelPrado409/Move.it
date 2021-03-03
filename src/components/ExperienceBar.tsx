import { useContext } from "react";
import { challengeContext } from "../contexts/ChallengeContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/ExperienceBar.module.css";
import stylesLight from "../styles/components/ExperienceBarLight.module.css";

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(
    challengeContext
  );
  const { darkTheme } = useContext(CountdownContext);

  const percentToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <header
      className={darkTheme ? styles.experienceBar : stylesLight.experienceBar}
    >
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span
          className={
            darkTheme ? styles.currentExperience : stylesLight.currentExperience
          }
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
