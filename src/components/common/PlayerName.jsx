import React, { useEffect, useState, useRef } from "react";

// Styles
import styles from "../../styles/PlayerName.module.css";
import tailwindStyles from "../../styles/tailwindClasses/Common";
import getLocalData from "../../services/getLocalData";
import { shorten } from "../../services/shorten";

const PlayerName = ({ name, index, setPlayers, players }) => {
  const [canEdit, setCanEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const [currentName, setCurrentName] = useState(name);

  const inputRef = useRef();

  useEffect(() => {
    if (canEdit) {
      inputRef.current.select();
    }
  }, [canEdit]);

  const changeHandler = (e) => {
    const { value } = e.target;
    setNewName(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (newName === currentName) {
      setCanEdit(false)
    }
    if (newName !== "") {
      let newPlayers = players;
      if (
        !players.find(
          (player) =>
            player.trim().toLowerCase() === newName.trim().toLowerCase()
        )
      ) {
        let playersRolesDict = getLocalData("player_role_dictionary");
        // Player Role is given to the new player replaced with it
        const currentRole = playersRolesDict[players[index]];
        delete playersRolesDict[players[index]];
        const newKey = newName;
        playersRolesDict[newKey] = currentRole;

        // Player Data is given to the new player replaced with it
        let playersData = getLocalData("players_data");
        if (playersData) {
          const currentData = playersData[players[index]];
          delete playersData[players[index]];
          playersData[newKey] = currentData;
          localStorage.setItem("players_data", JSON.stringify(playersData));
        }

        setCurrentName(newName);
        newPlayers[index] = newName;
        setPlayers(newPlayers);
        localStorage.setItem("players", JSON.stringify(newPlayers));
        localStorage.setItem(
          "player_role_dictionary",
          JSON.stringify(playersRolesDict)
        );
        setCanEdit(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.nameIndexContainer}>
        <span>
          <i className="fa fa-user"></i>
        </span>
        {canEdit ? (
          <form onSubmit={submitHandler} className={styles.formContainer}>
            <input
              ref={inputRef}
              type="text"
              value={newName}
              onChange={changeHandler}
            />
            <button type="submit" onClick={submitHandler}>
              submit
            </button>
          </form>
        ) : (
          <h1>{shorten(currentName)}</h1>
        )}
      </div>
      <i
        className={tailwindStyles["edit-icon"]}
        onClick={() => setCanEdit((prevStatus) => !prevStatus)}
      ></i>
    </div>
  );
};

export default PlayerName;
