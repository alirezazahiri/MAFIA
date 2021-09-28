import React, { useEffect, useState, useContext } from "react";

// Components
import PlayerButton from "./common/PlayerButton";

// Contexts
import { LanguageContext } from "../contexts/LanguageContextProvider";

// Services
import getLocalData from "../services/getLocalData";
import giveRoles from "../services/shuffleRoles";
import make from "../services/makePlayersDataDicttionary";
import { getPlayerButtons } from "../services/getData";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Styles
import styles from "../styles/PlayerButtons.module.css";
import tailwindStyles from "../styles/tailwindClasses/Common";

const PlayerButtons = (props) => {
  const players = getLocalData("players");
  const charactersInGame = getLocalData("charactersInGame");

  const [playersRole, setPlayersRole] = useState({});

  const { language } = useContext(LanguageContext);
  const { buttons, update_message } = getPlayerButtons(language);

  useEffect(() => {
    const playersCount = getLocalData("playersCount");
    const playersList = getLocalData("players");
    const charactersList = getLocalData("charactersInGame");

    if (!playersCount) {
      props.history.push("/");
    } else if (
      !(playersList && playersList.length === playersCount) ||
      !(charactersList && charactersList.length === playersCount)
    ) {
      props.history.push("/game-setup");
    } else {
      const player_role_dictionary = getLocalData("player_role_dictionary");
      if (player_role_dictionary) setPlayersRole(player_role_dictionary);
      else {
        localStorage.setItem(
          "player_role_dictionary",
          JSON.stringify(giveRoles(players, charactersInGame))
        );
      }
    }
  }, [props.history]);

  const updateHandler = () => {
    const player_role_dictionary = giveRoles(players, charactersInGame);

    localStorage.setItem(
      "player_role_dictionary",
      JSON.stringify(player_role_dictionary)
    );

    setPlayersRole(player_role_dictionary);

    toast.success(update_message);
    localStorage.removeItem("players_data");
    make(players);
  };

  return (
    <div className={styles.container}>
      {players &&
        players.map((player) => (
          <PlayerButton
            key={player}
            player={player}
            playersRole={playersRole}
          />
        ))}
      <button
        onClick={updateHandler}
        className={tailwindStyles["update-button"] + styles.updateButton}
      >
        {buttons.update}
      </button>
      <ToastContainer autoClose={1500} theme="dark" newestOnTop />
    </div>
  );
};

export default PlayerButtons;
