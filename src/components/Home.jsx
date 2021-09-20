import React, { useContext, useState } from "react";

import styles from "../styles/Home.module.css";

// Services
import { getHome } from "../services/getData";

// Contexts
import { LanguageContext } from "../contexts/LanguageContextProvider";

const Home = (props) => {
  const { language } = useContext(LanguageContext);
  const { title, description, placeholder_1, start } = getHome(language);
  const [playersCount, setPlayersCount] = useState(0);

  const changeHandler = (e) => {
    const { value } = e.target;
    setPlayersCount(value);
  };

  const clickHandler = () => {
    localStorage.clear()
    localStorage.setItem("playersCount", playersCount);
    props.history.push("/game-setup");
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div>
        <input
          pattern="\d*"
          type="number"
          placeholder={placeholder_1}
          value={playersCount}
          onChange={changeHandler}
        />
        <button
          onClick={clickHandler}
          disabled={playersCount < 4 || playersCount > 80}
        >
          {start}
        </button>
      </div>
    </div>
  );
};

export default Home;
