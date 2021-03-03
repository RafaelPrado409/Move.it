import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
