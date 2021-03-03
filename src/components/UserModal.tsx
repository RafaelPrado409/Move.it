import { useContext, useState } from "react";
import { challengeContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/UserModal.module.css";

export function UserModal() {
  const { name, userName, firstTimeInApp } = useContext(challengeContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <img src="/logo-full.svg" alt="Logo" />
        <header>Bem vindo ao move.it.</header>

        <p>No move.it você vai se exercitar e subir de nivel.</p>
        <input
          type="text"
          value={name}
          onChange={userName}
          placeholder="Digite seu nome."
        />

        {/* <button
          type="button"
          className={styles.closeButton}
          disabled={name.length === 0}
        >
          <img src="/icons/close.svg" alt="Fechar modal" />
        </button> */}

        <footer>
          <button
            className={styles.userButton}
            type="button"
            disabled={name.length === 0}
            onClick={firstTimeInApp}
          >
            Iniciar
          </button>
        </footer>
      </div>
    </div>
  );
}
