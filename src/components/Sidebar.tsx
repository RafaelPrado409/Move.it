import { FiHome as Home, FiAward as Award } from "react-icons/fi";

import styles from "../styles/components/Sidebar.module.css";

export function Sidebar() {
  return (
    <div className={styles.container}>
      <img src="/logo-moveit.svg" alt="Move.it" />
      <nav>
        <Home color="#5965e0" size={32} />
        <Award size={32} className={styles.award} />
      </nav>
    </div>
  );
}
