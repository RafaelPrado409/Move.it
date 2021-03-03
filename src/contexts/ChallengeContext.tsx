import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";
import { UserModal } from "../components/UserModal";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  name: string;
  firstTime: boolean;
  userName: (e) => void;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
  firstTimeInApp: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  name: string;
}

export const challengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [name, setName] = useState(rest.name ?? "");

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [passedLevel, setPassedLevel] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  let newName = "";

  function levelUp() {
    setLevel(level + 1);
    setPassedLevel(true);
  }

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
    Cookies.set("name", name);
  }, [level, currentExperience, challengesCompleted, name]);

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio", {
        body: `Valendo ${challenge.amount}XP!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  function closeLevelUpModal() {
    setPassedLevel(false);
  }

  function userName(e) {
    newName = e.target.value;
    setName(newName);
  }

  function firstTimeInApp() {
    setFirstTime(false);
    setLevel(1);
    setChallengesCompleted(0);
    setCurrentExperience(0);
  }

  return (
    <challengeContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        name,
        firstTime,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
        userName,
        firstTimeInApp,
      }}
    >
      {children}

      {firstTime &&
      rest.level === 1 &&
      rest.currentExperience === 0 &&
      rest.challengesCompleted === 0 ? (
        <UserModal />
      ) : null}

      {passedLevel ? <LevelUpModal /> : null}
    </challengeContext.Provider>
  );
}
