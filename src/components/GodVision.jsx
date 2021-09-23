import React, { useContext, useEffect, useState } from "react";

//Services
import getLocalData from "../services/getLocalData";
import make from "../services/makePlayersDataDicttionary";

// Components
import ManagePlayerCard from "./common/ManagePlayerCard";

// Contexts
import { RolesContext } from "../contexts/RolesContextProvider";

// Styles
import styles from "../styles/GodVision.module.css";

const GodVision = (props) => {
  const { names, characters } = useContext(RolesContext);

  const [search, setSearch] = useState("");

  const players = getLocalData("players");
  const playersRoles = getLocalData("player_role_dictionary");

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
      const data = getLocalData("players_data");
      if (!data) {
        make(players);
      }
    }
  }, [players, props.history]);

  const changeHandler = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          placeholder="Search..."
          type="text"
          value={search}
          onChange={changeHandler}
        />
      </div>
      {players &&
        playersRoles &&
        Object.keys(playersRoles).length === getLocalData("playersCount") &&
        players
          .filter((player) => {
            const idx = names.indexOf(playersRoles[player]);
            return (
              player
                .trim()
                .toLowerCase()
                .includes(search.trim().toLowerCase()) ||
              characters[idx].title.includes(search.trim().toLowerCase())
            );
          })
          .map((player) => {
            const idx = names.indexOf(playersRoles[player]);
            return (
              <ManagePlayerCard
                key={player}
                player={player}
                role={characters[idx].title}
                icon={characters[idx].icon}
                type={characters[idx].type}
              />
            );
          })}
    </div>
  );
};

export default GodVision;
