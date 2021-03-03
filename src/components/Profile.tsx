import { useContext } from "react";
import { challengeContext } from "../contexts/ChallengeContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Profile.module.css";
import stylesLight from "../styles/components/ProfileLight.module.css";

export function Profile() {
  const { level, name } = useContext(challengeContext);
  const { darkTheme } = useContext(CountdownContext);

  return (
    <div
      className={
        darkTheme ? styles.profileContainer : stylesLight.profileContainer
      }
    >
      <img src="/logo-full.svg" alt="Username" />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
