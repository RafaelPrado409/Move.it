import Head from "next/head";
import { GetServerSideProps } from "next";

import { ChallengeBox } from "../components/ChallengeBox";
import CompletedChallenges from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import {
  CountdownContext,
  CountdownProvider,
} from "../contexts/CountdownContext";

import styles from "../styles/pages/Home.module.css";
import stylesLight from "../styles/pages/HomeLight.module.css";
import { ChallengesProvider } from "../contexts/ChallengeContext";
import Theme from "../components/Theme";
import { useContext } from "react";
import { Sidebar } from "../components/Sidebar";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  name: string;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      name={props.name}
    >
      <CountdownProvider>
        <div className={styles.container}>
          <Head>
            <title>Inicio | move.it</title>
          </Head>

          <ExperienceBar />
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
          <Theme />
        </div>
        <Sidebar />
      </CountdownProvider>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    level,
    currentExperience,
    challengesCompleted,
    name,
  } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      name: name,
    },
  };
};
