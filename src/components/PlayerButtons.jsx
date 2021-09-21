import React, { useEffect, useState } from "react";

// Components
import PlayerButton from "./common/PlayerButton";

// Services
import getLocalData from "../services/getLocalData";
import giveRoles from "../services/shuffleRoles";
import make from "../services/makePlayersDataDicttionary";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Styles
import styles from "../styles/PlayerButtons.module.css";
import tailwindStyles from "../styles/tailwindClasses/Common";

const PlayerButtons = () => {
  const players = JSON.parse(getLocalData("players"));
  const charactersInGame = JSON.parse(getLocalData("charactersInGame"));

  const [playersRole, setPlayersRole] = useState({});

  useEffect(() => {
    setPlayersRole(JSON.parse(getLocalData("player_role_dictionary")));
  }, []);

  const updateHandler = () => {
    const player_role_dictionary = giveRoles(players, charactersInGame);

    localStorage.setItem(
      "player_role_dictionary",
      JSON.stringify(player_role_dictionary)
    );

    setPlayersRole(player_role_dictionary);

    toast.success("Roles Updated Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    localStorage.removeItem("players_data")
    make(players);
  };

  return (
    <div className={styles.container}>
      {players.map((player) => (
        <PlayerButton key={player} player={player} playersRole={playersRole} />
      ))}
      <button
        onClick={updateHandler}
        className={tailwindStyles["update-button"] + styles.updateButton}
      >
        بروزرسانی
      </button>
      <ToastContainer autoClose={1000} theme="dark" limit={1} newestOnTop />
    </div>
  );
};

export default PlayerButtons;
