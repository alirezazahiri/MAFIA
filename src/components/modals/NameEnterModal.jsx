import React, { useState, useEffect } from "react";

// Services
import getLocalData from "../../services/getLocalData";

const NameEnterModal = ({ remaining, setRemaining }) => {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const check = getLocalData("players");
    const localPlayers = !check ? undefined : JSON.parse(check);
    setPlayers(localPlayers ? localPlayers : []);
    const remaining = Number(getLocalData("playersCount")) - players.length;
    setRemaining(remaining);
  }, [players.length, setRemaining]);

  const clickHandler = () => {
    if (
      !players.find(
        (player) => player.trim().toLowerCase() === name.trim().toLowerCase()
      )
    ) {
      const newPlayers = [...players, name.trim()];
      setPlayers(newPlayers);
      const remaining =
        Number(getLocalData("playersCount")) - newPlayers.length;
      setRemaining(remaining);
      localStorage.setItem("players", JSON.stringify(newPlayers));
    }
  };

  return (
    <div>
      <div>
        {players.map((player, index) => (
          <h1 key={player}>
            {index + 1}. {player}
          </h1>
        ))}
      </div>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button onClick={clickHandler} disabled={remaining === 0}>
        Add
      </button>
    </div>
  );
};

export default NameEnterModal;
