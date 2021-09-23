import React, { useState, useEffect, useRef, useContext } from "react";

// Services
import getLocalData from "../../services/getLocalData";

// Contexts 
import { LanguageContext } from "../../contexts/LanguageContextProvider";

// Styles
import styles from "../../styles/NameEnterModal.module.css";
import tailwindStyles from "../../styles/tailwindClasses/Common";

// Components
import PlayerName from "../common/PlayerName";
import { getNameEnter } from '../../services/getData';

const NameEnterModal = ({ remaining, setRemaining }) => {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const {language} = useContext(LanguageContext)
  const {buttons, unknown} = getNameEnter(language)
  const inputRef = useRef();

  useEffect(() => {
    const check = getLocalData("players");
    const localPlayers = !check ? undefined : JSON.parse(check);
    setPlayers(localPlayers ? localPlayers : []);
    const remaining = Number(getLocalData("playersCount")) - players.length;
    setRemaining(remaining);
  }, [players.length, setRemaining]);

  const clickHandler = (e) => {
    e.preventDefault();
    const checkedName =
      name.trim() === ""
        ? `${unknown} ${Number(getLocalData("playersCount")) - remaining + 1}`
        : name;
    console.log(checkedName);
    if (
      players.findIndex(
        (player) =>
          player.trim().toLowerCase() === checkedName.trim().toLowerCase()
      ) === -1 &&
      remaining !== 0
    ) {
      const newPlayers = [...players, checkedName.trim()];
      setPlayers(newPlayers);
      const remaining =
        Number(getLocalData("playersCount")) - newPlayers.length;
      setRemaining(remaining);
      localStorage.setItem("players", JSON.stringify(newPlayers));
    }
  };

  useEffect(() => {
    inputRef.current.select();
  }, [players]);

  const playersResetHandler = () => {
    setPlayers([]);
    localStorage.setItem("players", JSON.stringify([]));
  };

  return (
    <div className={styles.container}>
      <button
        className={
          "border border-yellow-600" + tailwindStyles["btn-warning"]
        }
        type="button"
        onClick={playersResetHandler}
      >
        {buttons.reset}
      </button>
      <div className={styles.namesContainer}>
        {players.map((player, index) => (
          <PlayerName
            key={`${player}${index}`}
            name={player}
            index={index}
            setPlayers={setPlayers}
            players={players}
          />
        ))}
      </div>
      <form onSubmit={clickHandler} className={styles.formContainer}>
        <input
          ref={inputRef}
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button
          className={styles.submitButton}
          type="submit"
          onClick={clickHandler}
          disabled={remaining === 0}
        >
          {buttons.add}
        </button>
      </form>
      <button
        className={
          "border border-yellow-600 mt-3" + tailwindStyles["btn-warning"]
        }
        type="button"
        onClick={playersResetHandler}
      >
        {buttons.reset}
      </button>
    </div>
  );
};

export default NameEnterModal;
