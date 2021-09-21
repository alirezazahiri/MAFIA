import React, { useContext, useState, useRef, useEffect } from "react";

// Styles
import styles from "../styles/Home.module.css";

// Services
import { getHome } from "../services/getData";
import fixNumbers from "../services/convertNumbersToEn";

// Contexts
import { LanguageContext } from "../contexts/LanguageContextProvider";

const Home = (props) => {
  const { language } = useContext(LanguageContext);
  const { title, description, placeholder_1, start } = getHome(language);
  const [playersCount, setPlayersCount] = useState(0);
  const [disable, setDisable] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  useEffect(() => {
    const value = fixNumbers(playersCount);
    if (playersCount) {
      if (/^\d+$/.test(value)) { // check if value is a numeric string
        if (Number(value) >= 4 && Number(value) <= 80) {
          setDisable(false);
        } else {
          setDisable(true);
        }
      }
    } else {
      setDisable(true);
    }
  }, [playersCount]);

  const changeHandler = (e) => {
    const { value } = e.target;
    const newValue = fixNumbers(value)
    if (/^\d*$/.test(newValue)) setPlayersCount(newValue); // set newValue if it is a empty string or a number
  };

  const clickHandler = () => {
    if (!disable) {
      localStorage.clear();
      localStorage.setItem("playersCount", playersCount);
      props.history.push("/game-setup");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div>
        <form onSubmit={clickHandler} className={styles.formContainer}>
          <input
            ref={inputRef}
            pattern="\d*"
            type="text"
            placeholder={placeholder_1}
            value={playersCount}
            onChange={changeHandler}
          />
          <button type="submit" onClick={clickHandler} disabled={disable}>
            {start}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
