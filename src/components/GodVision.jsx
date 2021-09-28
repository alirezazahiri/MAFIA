import React, { useContext, useEffect, useState } from "react";

//Services
import getLocalData from "../services/getLocalData";
import make from "../services/makePlayersDataDicttionary";
import giveRoles from '../services/shuffleRoles';

// Components
import ManagePlayerCard from "./common/ManagePlayerCard";

// Contexts
import { RolesContext } from "../contexts/RolesContextProvider";
import { LanguageContext } from "../contexts/LanguageContextProvider";

// Styles
import styles from "../styles/GodVision.module.css";
import DayNightRadio from "./common/DayNightRadio";
import FilterCharacters from "./common/FilterCharacters";

const GodVision = (props) => {
  const { names, characters } = useContext(RolesContext);
  const { language } = useContext(LanguageContext);

  const [search, setSearch] = useState("");

  const players = getLocalData("players");
  const playersRoles = getLocalData("player_role_dictionary");

  const [type, setType] = useState("all");

  useEffect(() => {
    const playersCount = getLocalData("playersCount");
    const playersList = getLocalData("players");
    const charactersList = getLocalData("charactersInGame");
    const player_role_dictionary = getLocalData("player_role_dictionary");
    if (!player_role_dictionary) {
      localStorage.setItem(
        "player_role_dictionary",
        JSON.stringify(giveRoles(playersList, charactersList))
      );
    }
    if (!playersCount) {
      props.history.push("/");
    } else if (
      !(playersList && playersList.length === playersCount) ||
      !(charactersList && charactersList.length === playersCount)
    ) {
      props.history.push("/game-setup");
    } else {
      make(players);
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
          placeholder={language === "persian" ? "...جستجو کن" : "Search..."}
          type="text"
          value={search}
          onChange={changeHandler}
        />
      </div>
      <DayNightRadio />
      <div className={styles.filterContainer}>
        <FilterCharacters setType={setType} />
      </div>
      {players &&
        playersRoles &&
        Object.keys(playersRoles).length === getLocalData("playersCount") &&
        players
          .filter((player) => {
            const idx = names.indexOf(playersRoles[player]);
            return type === "all" ? true : characters[idx].type === type;
          })
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
