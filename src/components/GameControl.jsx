import React, { useEffect, useState } from "react";

// Components
import PlayerButton from "./common/PlayerButton";

// Services
import getLocalData from "../services/getLocalData";
import giveRoles from "../services/shuffleRoles";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GameControl = () => {
  const players = JSON.parse(getLocalData("players"));

  const [playersRole, setPlayersRole] = useState({});

  useEffect(() => {
    setPlayersRole(JSON.parse(getLocalData("player_role_dictionary")));
  }, []);

  const updateHandler = () => {
    const player_role_dictionary = giveRoles(
      JSON.parse(getLocalData("players")),
      JSON.parse(getLocalData("charactersInGame"))
    );

    localStorage.setItem(
      "player_role_dictionary",
      JSON.stringify(player_role_dictionary)
    );

    setPlayersRole(player_role_dictionary);

    toast.success("roles updated successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      {players.map((player) => (
        <PlayerButton key={player} player={player} playersRole={playersRole} />
      ))}
      <button onClick={updateHandler}>بروزرسانی</button>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default GameControl;
